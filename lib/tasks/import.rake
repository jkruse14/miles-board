require 'securerandom'


namespace :import do
  desc 'Import users from a csv file'
  task :users, %i(filename team_id) => :environment do |_t, args|
    puts '----- args -----'
    puts args.inpect

    count = 0
    CSV.foreach(args[:filename], headers: true, header_converters: :symbol) do |row|
      puts row[:first_name]
      if !row[:first_name].nil? && !row[:last_name].nil?
        count += 1
        row = row.to_hash
        new_user = {}
        new_user[:first_name] = row[:first_name]
        new_user[:last_name] =  row[:last_name]
        new_user[:password] = 'imported123'
        new_user[:password_confirmation] = 'imported123'
        if row.key?(:email)
          new_user[:email] = row[:email]
        else
          # SecureRandom.hex outputs: 5b5cd0da3121fc53b4bc84d0c8af2e81 (i.e. 32 chars of 0..9, a..f)
          new_user[:email] = SecureRandom.hex + '@milesboardimport.com'
        end

        begin
          @user.skip_confirmation!
          @user = User.create(new_user)

          @tml = TeamMemberList.create([user_id: @user.id, team_id: args[:team_id]])

          base_data = {}
          if row.key?(:num_team_runs)
            base_data[:num_team_runs] = row[:num_team_runs]
          else
            base_data[:num_team_runs] = 0
          end

          base_data[:team_miles] = if row.key?(:team_miles)
                                     row[:team_miles]
                                   else
                                     0
                                   end
          base_data[:user_id] = @user.id
          base_data[:team_id] = args[:team_id]

          @iud = ImportedUserDatum.create!(base_data)
        rescue ActiveRecord::RecordInvalid => invalid
          puts invalid.record.errors
          if !@user.nil? && @user.valid?
            puts '==== destroying user object ====='
            User.find(@user.id).destroy
          end

          if !@tml.nil? && @tml.valid?
            puts '===== destroying team member list entry ====='
            TeamMemberList.find(@tml.id).destroy
          end

          if @iud && !@iud.nil? && @iud.valid?
            puts '===== destroying imported user data entry ====='
            ImportedUserDatum.find(@iud.id).destroy
          end
        end
      end
    end
  end

  desc 'add users miles by date'
  task :add_runs, %i(filename team_id) => :environment do |_t, args|
    puts '----- args -----'
    puts args.inpect

    count = 0
    headers = CSV.open(args[:filename], &:readline)

    dates = {}
    headers.each do |h|
      y, m, d = h.split '-'
      dates[y+m+d] = h if Date.valid_date? y.to_i, m.to_i, d.to_i
    end

    CSV.foreach(args[:filename], headers: true, header_converters: :symbol) do |row|
      team = Team.find(args[:team_id])

      if !team.nil? && !row[:first_name].nil? && !row[:last_name].nil?
        # updates = [row.except(:first_name, :last_name)]

        user = User.joins(team_member_lists: :team).where(first_name: row[:first_name], last_name: row[:last_name], 'teams.id'=> args[:team_id])
        if user.length == 1 && user[0].teams.include?(team)
          dates.each do |date|
            unless row[date[0].to_sym].nil?
              exists = Run.where(user_id: user[0][:id], run_date: date[1])
              if exists.empty?
                run = Run.new(user_id: user[0][:id], team_id: team[:id], distance: row[date[0].to_sym].to_i, run_date: date[1])
                if run.valid?
                  puts row[:first_name] + ' ' + row[:last_name]
                  run.save!
                else
                  puts 'invalid run: '
                  puts row.inspect
                  puts run.inspect
                end
              else
                puts row[:first_name] + ' ' + row[:last_name] + ' already has a run on ' + date[1]
              end
            end
          end
        elsif user.length > 1
          puts 'multiple users with name ' + row[:first_name] + ' ' + row[:last_name]
          puts user.inspect
        else
          puts 'No user found: '
          puts row.inspect
        end
      end
    end
  end
end
