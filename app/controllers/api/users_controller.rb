class Api::UsersController < ApplicationController
  skip_before_action :authorize, only: [:create, :update, :index, :show]

  # GET /users
  def index
    users = User.all

    render json: users
  end

  # GET /users/1

  def show
    user = set_user
    render json: user, status: :ok
  end



  # POST /users
  def create
    user = User.create!(user_params)
    if user.save
    session[:user_id] = user.id
    render json: user, status: :created
  else
    render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
  end
end

  # PATCH/PUT /users/1
  def update
   
    user = User.find_by(id: session[:user_id])
    user.update!(user_params)
    render json: user, status: :accepted
  end

  def update_without_password
  
    user = User.find_by(id: session[:user_id])
    user.update_columns(user_params.except(:password).to_unsafe_hash)
    render json: user, status: :accepted
  end

  # DELETE /users/1
  def destroy
    user = User.find_by(id: session[:user_id])
    user.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:id, :first_name, :last_name, :email, :city, :state, :handicap, :profile_pic, :username, :password)
    end
    
    
end
