class CustomTabsController < ApplicationController
  before_action :set_tab, only: %i(update destroy)

  def create
    tab = CustomTab.new(params)

    begin
      tab.save!
      render(json: { id: tab.id }, status: :OK) && return
    rescue ActiveRecord::RecordInvalid => invalid
      render(json: invalid.record.errors.messages, status: :unprocessable_entity) && return
    end
  end

  def update; end

  def delete; end

  private

  def tab_params
    params.permit(:team_id, :filter_field, :filter_value, :comparator, :object_type)
  end

  def set_tab
    @tab = CustomTab.find(params[:id])
  end
end
