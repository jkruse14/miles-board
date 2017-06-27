require 'securerandom'

namespace :invite_code do
  desc 'generate a new invitation code'
  task :create, %i(email) => :environment do |_task, args|
    if args[:email].nil?
      puts 'email required to generate new code'
      return
    end

    # SecureRandom.hex outputs: 5b5cd0da3121fc53b4bc84d0c8af2e81 (i.e. 32 chars of 0..9, a..f)
    count = 0
    begin
      code = SecureRandom.hex
      invite = InvitationCode.create(email: args[:email], code: code, used: false)
      puts '========================'
      puts invite.valid?
      puts invite.inspect
      invite.save!
      # puts 'code generated for ' + args[:email]
      # end
    rescue ActiveRecord::RecordInvalid => invalid
      puts invalid.inspect
      count += 1
      retry unless count > 10
    end
  end
end
