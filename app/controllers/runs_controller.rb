class RunsController < ApplicationController
  before_action :set_run, only: [:show, :update, :delete]
  skip_before_action  :verify_authenticity_token

  def index
    # find by user
    if !params[:user_id].nil? && params[:team_id].nil?
      @runs = Run.find_by user_id: params[:user_id]
    end

    # find by team
    if params[:user_id].nil? && !params[:team_id].nil?
      @runs = Run.find_by team_id: params[:team_id]
    end

    # find by user and team
    if !params[:user_id].nil? && !params[:team_id].nil?
      @runs = Run.find_by user_id: params[:user_id], team_id: params[:team_id]
    end

    render json: @runs.as_jason(:include => { :teams => {
                                    :only => [:id, :name, :location, :contact_email, :team_owner_id]
                                  }}), status: :OK and return
  end

  def show
    render json: @runs.as_jason(:include => { :teams => {
                                    :only => [:id, :name, :location, :contact_email, :team_owner_id]
                                  }}), status: :OK and return
  end

  def create
    # .new() creates but does not save
    # .create() creates, saves, and returns the object
    @run = Run.create(run_params.except(:id))
    if run.run_date.nil?
      run.run_date = DateTime.now()
    end
    if @run.valid?
      render json: { id: @run.id }, status: :created and return
    else
      render json: @run.errors, status: :unprocessable_entity and return
    end
  end

  def update
    if !run_params[:run_date].nil?
      @run[:run_date] = run_params[:run_date]
    end

    if !run_params[:distance].nil?
      @run[:distance] = run_params[:distance]
    end

    if !run_params[:event].nil?
      @run[:event] = run_params[:event]
    end

    if @run.save!
      render json: {id: @run.id}, status: :created and return
    else
      render json: @run.errors, status: :unprocessable_entity and return
    end

  end

  def delete
    @run.destroy
    if @run.destroyed?
      render json: { id: @run[:id] }, status: 200 && return
    else
      render json: { error: 'delete failed' }, status: :unprocessable_entity && return
    end
  end

  private
  def set_run
    @run = Run.find(params[:id])
  end

  def run_params
    params.require('run').permit(:distance, :event, :user_id, :team_id, :run_date)
  end

  def runs_params
    params.require('runs').permit(:distance, :event, :user_id, :team_id, :run_date)
  end

end
