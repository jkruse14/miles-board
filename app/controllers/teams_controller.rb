class TeamsController < ApplicationController
  before_action :set_team, only: %i(show update destroy)

  def index
    @teams = Team.all
    render(json: @teams, status: 200) && return
  end

  def show
    users = []
    @team.users.each do |user|
      next if user.type == 'TeamOwner'
      users.push(get_user_data(user))
    end

    @team.team_owners.each do |owner|
      users.push(get_user_data(owner))
    end

    render(json: { team: @team.as_json(only: %i(id name users team_owner_id location),
                                       include: {
                                         custom_tabs: { only: %i(id heading),
                                                        include: {
                                                          custom_filters: { only: %i(id filter_field filter_value comparator) }
                                                        } },
                                         team_owners: { only: %i(id first_name last_name type) }
                                       }), users: users },
           status: 200) && return
  end

  def create
    @owner = TeamOwner.find_by_id(team_params[:team_owner_id])
    if @owner.nil?
      render(json: { errors: 'no user with submitted owner id' }, status: :unprocessable_entity) && return
    end

    @team = Team.create(team_params.except(:id))
    if @team.valid?
      TeamOwnerList.create(team_owner_id: @owner[:id], team_id: @team[:id])
      render(json: { id: @team.id }, status: :created) && return
    else
      render(json: @team.errors, status: :unprocessable_entity) && return
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

  def get_user_data(user)
    tmp = {}
    tmp[:id] = user.id
    tmp[:first_name] = user.first_name
    tmp[:last_name] = user.last_name
    team_distance = 0
    team_run_count = 0
    cur_year = Time.now.strftime('%Y')
    user.runs.each do |run|
      if run.run_date.nil?
        run.run_date = DateTime.new(2017, 1, 1);
      end
      if run.team_id == @team.id && !run.run_date.nil? && run.run_date.year == cur_year
        team_distance += run.distance
        team_run_count += 1
      end
    end

    imported = ImportedUserDatum.where(user_id: user.id, team_id: @team.id).order(created_at: :asc).first
    if !imported.nil? && imported.created_at.year = cur_year
      base_miles = imported[:team_miles].to_i
      base_runs = imported[:num_team_runs].to_i
    else
      base_miles = 0
      base_runs = 0
    end

    tmp[:team_distance] = team_distance + base_miles
    tmp[:team_run_count] = team_run_count + base_runs
    tmp
  end

  # def teams_params
  #   params.require('teams').permit(:name, :team_owner_id, :location, :contact_email)
  # end
end
