class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  # include ActionController::MimeResponds

  rescue_from ActiveRecord::RecordNotFound, with: :render_404

  protect_from_forgery with: :exception
  protect_from_forgery prepend: true

  respond_to :json

  def angular
    render 'layouts/application'
  end

  def render_404
    render json: { message: 'record not found' }, status: 404
  end
end
