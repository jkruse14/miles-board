class TeamOwnersController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :set_owner, only: [:show, :update, :destroy]

  def index
  end

  def show
    team_miles = Run.where(:user_id => params['id']).group(:team_id).calculate(:sum,:distance)
    
    @user.teams.each do |team|
      # team[:team_distance] = team_miles[team.id]
    end
    
    render json: {:user => @user.as_json(:only => [:id, :first_name, :last_name, :email, :type],
                                :include => {
                                  :teams => {
                                    :only => [:id, :name, :location, :contact_email, :team_owner_id]
                                  },
                                  :runs =>{ :include => { :team => { :only => :name }}},
                                }), 
                            :team_distance => team_miles
                  },
                  status: 200 and return
  end

  def create
    @user = TeamOwner.create(owner_params.except(:id, :team_id))

    if @user.save!
      unless owner_params[:team_id].nil?
          TeamMemberList.create(:user_id => @user.id, :team_id => user_params[:team_id])
      end

        @user = TeamOwner.find(@user.id)
        # Tell the Mailer to send a welcome email after save
        # RegistrationMailer.registration_success(@user).deliver!
        Devise::Mailer.confirmation_instructions(@user, @user.confirmation_token).deliver!
        render json: { id: @user.id }, status: :created and return
      else
        render json: @user.errors, status: :unprocessable_entity and return
      end
    end

  def update
  end

  def delete
  end

  private

  def set_owner
    @user = TeamOwner.find(params[:id])
  end

  def owner_params
    params.permit(:first_name, :last_name, :email, :password, :password_confirmation, :team_id)
  end

end
