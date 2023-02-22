class Api::GolfBuddiesController < ApplicationController
  skip_before_action :authorize , only: [:index, :show, :update, :destroy]

  # GET /golf_buddies
  def index
    golf_buddies = GolfBuddy.all

    render json: golf_buddies
  end

  # GET /golf_buddies/1
  def show
    render json: set_golf_buddy
  end

  # POST /golf_buddies
  def create
    golf_buddy = GolfBuddy.new(golf_buddy_params)
    if golf_buddy.save
      render json: golf_buddy, status: :created
    else
      render json: golf_buddy.errors, status: :unprocessable_entity
    end
  end


  # DELETE /golf_buddies/1
  def destroy
    set_golf_buddy.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_golf_buddy
      @golf_buddy = GolfBuddy.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def golf_buddy_params
      params.permit(:user_id, :friend_id)
    end
end
