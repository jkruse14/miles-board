class CustomTabsController < ApplicationController
  before_action :set_tab, only: %i(show update delete)

  def show
    render json: @tab.as_json(only: %i(heading team_id),
                              include: {
                                custom_filters: {
                                  only: %i(id filter_field filter_value comparator object_type)
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

  def update
    update_custom_filters(tab_params) if tab_params[:custom_filters]

    CustomTab.update!(tab_params.except(:custom_filters))
    render json: { id: @tab.id }, status: 200 && return
  end

  def bulk_update
    updated = []
    bulk_tabs_params[:tabs].each do |tab|
      update_custom_filters(tab) unless tab[:custom_filters].empty?

      begin
        to_update = CustomTab.find_by_id(tab[:id])
        to_update.update!(tab.except(:custom_filters, :id))
        updated.push(tab[:id])
      rescue ActiveRecord::RecordInvalid => invalid
        render json: invalid.record.errors.messages, status: :unprocessable_entity && return
      end
    end

    if !updated.empty?
      render json: { ids: updated }, status: 200 && return
    else
      render json: { message: 'no updated items' }, status: 204 && return
    end
  end

  def delete
    @tab.destroy
    if @tab.destroyed?
      render json: { id: @tab[:id] }, status: 200 && return
    else
      render json: { error: 'delete failed' }, status: :unprocessable_entity && return
    end
  end

  protected

  def update_custom_filters
    tab[:custom_filters].each do |filter|
      begin
        update_filter = CustomFilter.find_by_id(filter[:id])
        update_filter.update(filter.except(:id))
      rescue ActiveRecord::RecordInvalid => invalid
        render(json: invalid.record.errors.messages, status: :unprocessable_entity) && return
      end
    end
  end

  private

  def tab_params
    params.permit(:team_id, :heading, :custom_filters)
  end

  def bulk_tabs_params
    params.permit(tabs: [:id, :team_id, :heading, custom_filters: %i(id filter_field filter_value comparator)])
  end

  def set_tab
    @tab = CustomTab.find(params[:id])
  end
end
