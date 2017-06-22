class TeamsController < ApplicationController
  before_action :set_team, only: [:show, :update, :destroy]
  skip_before_action  :verify_authenticity_token

  def index
    @teams = Team.all
    render json: @teams, status: 200 and return
  end

  def show
    users = []
    @team.users.each do |user|
      tmp = {}
      tmp[:id] = user.id
      tmp[:first_name] = user.first_name
      tmp[:last_name] = user.last_name
      team_distance = 0
      team_run_count = 0
      user.runs.each do |run|
        if run.team_id == @team.id
          team_distance += run.distance
          team_run_count += 1
        end
      end
      tmp[:team_distance] = team_distance
      tmp[:team_run_count] = team_run_count
      users.push(tmp)
    end
    render json: {:name => @team.name, :users => users, :team_owner_id => @team.team_owner_id, :location => @team.location},
                  status: 200 and return
  end

  def create
    @owner = User.find_by_id(team_params[:team_owner_id])
    if @owner.nil?
      render json: { errors: 'no user with submitted owner id'}, status: :unprocessable_entity and return
    end

    @team = Team.create(team_params.except(:id))
    if @team.valid?
      render json: { id: @team.id }, status: :created and return
    else
      render json: @team.errors, status: :unprocessable_entity and return
    end
  end

  def update
    if @team.update(team_params)
      render json: { id: @team['id'] }, status: :ok
    else
      render json: @team.errors, status: :unprocessable_entity
    end
  end

  def delete
    @team = Team.find(params[:id]).destroy
    if @team.destroyed?
      render json: { id: params[:id] }, status: :ok
    else
      render json: { error: 'failed to destroy', id: params[:id] }, status: :unprocessable_entity 
    end
  end

  private

  def set_team
    @team = Team.find(params[:id])
  end

  def team_params
    params.permit(:name, :team_owner_id, :location, :contact_email)
  end

  # def teams_params
  #   params.require('teams').permit(:name, :team_owner_id, :location, :contact_email)
  # end
end
