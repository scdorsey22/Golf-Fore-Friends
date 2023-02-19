class Api::RoundsController < ApplicationController
  skip_before_action :authorize , only: [:index, :show, :update, :destroy]

  # GET /rounds
  def index
    @rounds = Round.all

    render json: @rounds
  end

  # GET /rounds/1
  def show
    render json: set_round
  end

  # POST /rounds
  def create
    @round = Round.new(round_params)

    if @round.save
      render json: @round, status: :created, location: @round
    else
      render json: @round.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /rounds/1
  def update
    if @round.update(round_params)
      render json: @round
    else
      render json: @round.errors, status: :unprocessable_entity
    end
  end

  # DELETE /rounds/1
  def destroy
    set_round.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_round
      @round = Round.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def round_params
      params.permit(:date, :course, :description, :user_id)
    end
end
