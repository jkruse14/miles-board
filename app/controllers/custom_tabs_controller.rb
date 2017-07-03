class CustomTabsController < ApplicationController
  before_action :set_tab, only: %i(show update delete)

  def show
    render json: @tab.as_json(only: %i(heading team_id),
                              include: {
                                custom_filters: {
                                  only: %i(filter_field filter_value comparator object_type)
                                }
                              })
  end

  def create
    tab = CustomTab.new(tab_params)

    begin
      tab.save!
      render(json: { id: tab.id }, status: :created) && return
    rescue ActiveRecord::RecordInvalid => invalid
      render(json: invalid.record.errors.messages, status: :unprocessable_entity) && return
    end
  end

  def update; end

  def delete; end

  private

  def tab_params
    params.permit(:team_id, :custom_filter_id, :heading)
  end

  def set_tab
    @tab = CustomTab.find(params[:id])
  end
end
