class TeamOwnersController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :set_owner, only: %i(show update destroy)

  def index; end

  def show
    team_miles = Run.where(user_id: params['id']).group(:team_id).calculate(:sum, :distance)

    allteams = []
    @user.teams.each do |team|
      # team[:team_distance] = team_miles[team.id]
      allteams << team
    end

    memberOf = TeamMemberList.where(user_id: @user.id)

    
    addedIds = []
    memberOf.each do |team|
      tmp = {}
      unless addedIds.include? team.team[:id]
        tmp[:contact_email] = team.team[:contact_email]
        tmp[:name] = team.team[:name]
        tmp[:id] = team.team[:id]
        tmp[:location] = team.team[:location]
        tmp[:team_owner_id] = team.team[:team_owner_id]
        tmp[:owner_ids] = []
        team.team.team_owners.each do |owner|
          tmp[:owner_ids] << owner[:id]
        end
        addedIds << tmp[:id]
        allteams << tmp
      end
    end

    render(json: { user: @user.as_json(only: %i(id first_name last_name email type),
                                       include: {
                                         runs: { include: { team: { only: :name } } }
                                       }),
                   teams: allteams,
                   team_distance: team_miles },
           status: 200) && return
  end

  def create
    @user = TeamOwner.create(owner_params.except(:id, :team_id))

    if @user.save!
      unless owner_params[:team_id].nil?
        TeamMemberList.create(user_id: @user.id, team_id: user_params[:team_id])
      end

      @user = TeamOwner.find(@user.id)
      # Tell the Mailer to send a welcome email after save
      # RegistrationMailer.registration_success(@user).deliver!
      Devise::Mailer.confirmation_instructions(@user, @user.confirmation_token).deliver!
      render(json: { id: @user.id }, status: :created) && return
    else
      render(json: @user.errors, status: :unprocessable_entity) && return
      end
    end

  def update; end

  def delete; end

  private

  def set_owner
    @user = TeamOwner.find(params[:id])
  end

  def owner_params
    params.permit(:first_name, :last_name, :email, :password, :password_confirmation, :team_id)
  end
end
