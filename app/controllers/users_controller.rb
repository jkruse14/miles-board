class UsersController < ApplicationController
  #
  # skip_before_action :verify_authenticity_token
  # before_action :authenticate_user!, only: %i(index show update imported_user_id delete)
  before_action :check_team_owner, only: %i(update_imported_user delete)
  before_action :set_user, only: %i(show update update_imported_user destroy)

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
      render json: { users: users }, status: 200 && return
    end
  end

  def show
    team_miles = Run.where(user_id: params['id']).group(:team_id).calculate(:sum, :distance)

    @user.teams.each do |team|
      puts team.inspect
      # team[:team_distance] = team_miles[team.id]
    end

    render(json: { user: user_return_obj },
           status: 200) && return
  end

  def create
    # .new() creates but does not save
    # .create() creates, saves if valid, and returns the object (regardless if valid)

    @user = User.new(user_params.except(:id, :team_id))
    begin
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
      end
    rescue ActiveRecord::RecordInvalid => invalid
      render(json: invalid.record.errors.messages, status: :unprocessable_entity) && return
    end
  end

  def update
    if @user.update(user_params)
      render json: { id: @user['id'] }, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def update_imported_user
    user = User.find_by_id(user_params[:imported_user_id])
    # user_params[:current_password] = 'imported123'

    user.update_with_password(user_params.except(:imported_user_id))
    user.skip_confirmation!
    if user.reset_password(user_params[:password], user_params[:password_confirmation])
      puts '************ TRUE ************'
    else
        puts '------------- FALSE ----------'
    end
    if user.save!
      render json: { id: user.id }, status: 200 && return
    else
      render json: { error: 'an error occurred while updating the account', id: user.id, email: user.email }, status: :unprocessable_entity && return
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
    params.permit(:first_name, :last_name, :email, :password, :password_confirmation, :team_id, :imported_user_id)
  end

  def users_params
    params.require('users').permit(:first_name, :last_name, :email, :password, :password_confirmation, :team_id, :imported_user_id, :current_password)
  end

  def check_team_owner
    unless current_user.instance_of? TeamOwner
      render json: { error: 'unauthorized' }, status: 401 && return
    end
  end
end
