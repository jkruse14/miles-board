class TeamOwnerListsController < ApplicationController
  def create
    tol = TeamOwnerList.new(team_owner_id: params[:team_owner_id], team_id: params[:team_id])

    begin
      tol.save!
      render json: tol, status: 200 && return
    rescue => exception
      render(json: exception, status: :unprocessable_entity) && return
    end
  end

  def update_owners
    TeamOwnerList.where(team_id: params[:team_id]).destroy_all
    added = []
    params[:owners_list].each do |id|
      # owners << TeamOwnerList.new(team_owner_id: id, team_id: params[:team_id])
      owner = TeamOwner.find_by_id(id)
      if owner.nil?
        owner = User.find_by_id(id)
        if owner.nil?
          render json: { error: 'no user with id' + id }, status: :unprocessable_entity && return
        else
          owner.type = 'TeamOwner'
          owner.save!
        end
      end

      owner_list = TeamOwnerList.new(team_owner_id: id, team_id: params[:team_id])
      added << owner.id

      begin
        owner_list.save!
      rescue => exception
        render(json: { error: exception }, status: :unprocessable_entity) && return
      end
    end
    # TeamOwnerList.import owners
    render json: { ids: added }, status: 200 && return
  end

  private

  def list_params
    params.permit(team_owner_id, team_id, owners_list)
  end
end
