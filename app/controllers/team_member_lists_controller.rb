class TeamMemberListsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_list, only: [:show, :update, :destroy]

  def index
  end

  def show
  end

  def create
    @tml = TeamMemberList.new(list_params)
    begin
      @tml.save!
      render json: @tml.as_json, status: :created && return
    rescue ActiveRecord::RecordInvalid => invalid
      render(json: invalid.record.errors.messages, status: :unprocessable_entity) && return
    end
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
