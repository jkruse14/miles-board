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
      @user.teams << team.team unless @user.teams.include?(team.team)
    end

    render(json: { user: @user.as_json(only: %i(id first_name last_name email type),
                                       include: {
                                         teams: { only: %i(id name location team_owner_id),
                                                  include: { team_owner_lists: { only: %i(team_owner_id) } } },
                                         runs: { include: { team: { only: :name } } }
                                       }),
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
