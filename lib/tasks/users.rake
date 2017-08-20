namespace :users do
    task :assign_team, %i(team_id) => :environment do |_t, args|
        users = User.where.not(id: TeamMemberList.select(:user_id)).select(:id)

        for user in users do
            TeamMemberList.create(team_id: args[:team_id], user_id: user.id)
        end
    end
end
