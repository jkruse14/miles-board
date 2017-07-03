class CustomFiltersController < ApplicationController
  before_action :set_filter, only: %i(show update delete)
  def show
    render json: @filter.as_json(only: %i(team_id filter_field filter_value comparator object_type))
  end

  def create
    filter = CustomFilter.new(filter_params.except(:id))

    begin
      filter.save!
      render json: { id: filter.id }, status: :created && return
    rescue ActiveRecord::RecordInvalid => invalid
      render(json: invalid.record.errors.messages, status: :unprocessable_entity) && return
    end
  end

  def update; end

  def delete; end

  private

  def filter_params
    params.permit(:team_id, :filter_field, :filter_value, :comparator, :object_type, :custom_tab_id)
  end

  def set_filter
    @filter = CustomFilter.find([params[:id]])
  end
end
