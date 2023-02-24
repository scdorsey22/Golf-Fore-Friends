class Api::CommentsController < ApplicationController
  skip_before_action :authorize , only: [:index, :show, :update, :destroy]

  # GET /comments
  def index
    comments = Comment.all

    render json: comments
  end

  # GET /comments/1
  def show
    render json: set_comment
  end

  # POST /comments
  def create
    @comment = Comment.new(comment_params)

    if @comment.save
      render json: @comment, status: :created
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /comments/1
  def update
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /comments/1
  def destroy
    set_comment.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = Comment.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def comment_params
      params.permit(:comment, :user_id, :round_id)
    end
end
