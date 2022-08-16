class GolfBuddiesController < ApplicationController
  skip_before_action :authorize , only: [:show, :update, :destroy]

  # GET /golf_buddies
  def index
    golf_buddies = GolfBuddy.all

    render json: golf_buddies
  end

  # GET /golf_buddies/1
  def show
    render json: @golf_buddy
  end

  # POST /golf_buddies
  def create
    golf_buddy = GolfBuddy.create!(golf_buddy_params)

      render json: golf_buddy, status: :created
   
  end


  # DELETE /golf_buddies/1
  def destroy
    @golf_buddy.destroy
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
