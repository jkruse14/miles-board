class UsersController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :set_user, only: %i(show update destroy)
  skip_before_action :verify_authenticity_token

  def index
    # check logged in user:
    # - if user_type = admin, show all
    # - if user_type = owner, show users on their team(s) and friends
    # - if user_type = user, show friends
    if !params['email'].nil?
      @user = User.find_by_email(params[:email])
      render json: @users, status: 200 && return
    else
      all_users = if !params[:team_id].nil?
                    Team.find(params[:team_id]).users
                  else
                    User.all
                  end

      users = []
      all_users.each do |user|
        @user = user
        users << user_return_obj
      end
      render json: users, status: 200 && return
    end
  end

  def show
    team_miles = Run.where(user_id: params['id']).group(:team_id).calculate(:sum, :distance)

    @user.teams.each do |team|
      puts team.inspect
      # team[:team_distance] = team_miles[team.id]
    end

    render(json: { user: user_return_obj},
           status: 200) && return
  end

  def create
    # .new() creates but does not save
    # .create() creates, saves, and returns the object
    @user = User.create(user_params.except(:id, :team_id))

    if @user.save!
      unless user_params[:team_id].nil?
        TeamMemberList.create(user_id: @user.id, team_id: user_params[:team_id])
      end

      @user = User.find(@user.id)
      # Tell the Mailer to send a welcome email after save
      puts @user.inspect
      # RegistrationMailer.registration_success(@user).deliver!
      Devise::Mailer.confirmation_instructions(@user, @user.confirmation_token).deliver!
      render(json: { id: @user.id }, status: :created) && return
    else
      render(json: @user.errors, status: :unprocessable_entity) && return
    end
  end

  def update
    if @user.update(user_params)
      render json: { id: @user['id'] }, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def delete
    @user = User.find(params[:id]).destroy
    if @user.destroyed?
      render json: { id: params[:id] }, status: :ok
    else
      render json: { error: 'failed to destroy', id: params[:id] }, status: :unprocessable_entity
    end
  end

  def resend_confirmation
    if !params[:email].nil?
      @user = User.find_by_email(params[:email])
      @user.send_confirmation_instructions
      render json: { status: 'success' }, status: :ok
    else
      render json: { error: 'no email address present', id: params[:id] }, status: :unprocessable_entity
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_return_obj
    @user.as_json(only: %i(id first_name last_name email type),
                          include: {
                            teams: {
                              only: %i(id name location contact_email team_owner_id)
                            },
                            runs: { include: { team: { only: :name } } },
                            imported_user_data: { only: %i(team_miles num_team_runs) }
                          })
  end

  def user_params
    params.permit(:first_name, :last_name, :email, :password, :password_confirmation, :team_id)
  end

  def users_params
    params.require('users').permit(:first_name, :last_name, :email, :password, :password_confirmation, :team_id)
  end
end
