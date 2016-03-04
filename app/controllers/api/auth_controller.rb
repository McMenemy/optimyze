class Api::AuthController < ApplicationController
  def signup
    @user = User.new(user_params)
    p user_params
    if @user.save
      sign_in(@user)
      render :json => {id: @user.id, username: @user.username, token: @user.session_token}
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def signin
    @user = User.find_by_credentials(
      user_params['username'],
      user_params['password']
    )

    if @user
      sign_in(@user)
      render :json => {id: @user.id, username: @user.username, token: @user.session_token}
    else
      render :json => {error: ['Invalid username or password']}
    end
  end

  def signout
    user = current_user
    sign_out
    render :json => {id: user.id, username: user.username, token: user.session_token}
  end

  private
  def user_params
    params.require(:user).permit(:password, :username)
  end

end
