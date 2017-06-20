class TeamMemberListsController < ApplicationController
  before_action :set_list, only: [:show, :update, :destroy]

  def index
  end

  def show
  end

  def create
  end

  def update
    if @list.update(list_params)
      render json: { id: @list['id'] }, status: :ok
    else
      render json: @list.errors, status: :unprocessable_entity
    end
  end

  private

  def set_list
    @list = TeamMemberLists.find(params[:id])
  end

  def list_params
    params.permit(:user_id, :team_id)
  end
end
