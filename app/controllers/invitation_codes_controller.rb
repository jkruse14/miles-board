class InvitationCodesController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_code, only: %i(show update destroy)

  def index
    render json: InvitationCode.all, status: :OK && return
  end

  def show
    render(json: @code.as_json(only: %i(id email used)), status: 200) && return
  end

  def create
    @invite = InvitationCode.create(code_params.except(:id))
    if @invite.save!
      render json: { id: @invite.id }, status: :created && return
    else
      render json: @invite.errors, status: :unprocessable_entity && return
    end
  end

  def update
    @code[:used] = code_params[:used]
    if @code.save!
      render json: { id: @code.id }, status: :created && return
    else
      render json: @code.errors.messages, status: :unprocessable_entity && return
    end
  end

  def delete; end

  private

  def code_params
    params.permit(:email, :code, :used)
  end

  def set_code
    @code = InvitationCode.find_by_code(params[:code])
  end
end
