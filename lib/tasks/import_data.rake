require 'csv'
require 'securerandom'

namespace :import_data do
  desc 'Import users from a csv file'
  task :users, [:filename, :team_id] => :environment do |_t, args|
    puts '----- args -----'
    puts args.inspect

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
          @user = User.new(new_user)
          @user.skip_confirmation!
          @user.save!

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
end
