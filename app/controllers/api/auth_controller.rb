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
      render json: ['Invalid username or password'], status: 422
    end
  end

  def signout
    user = current_user
    sign_out
    render :json => {id: user.id, username: user.username, token: user.session_token}
  end

  def sign_in_session
    @user = User.find_by(session_token: user_params['token'])

    if @user
      sign_in(@user)
      render :json => {id: @user.id, username: @user.username, token: @user.session_token}
    else
      render json: ['Invalid session token'], status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(:password, :username, :token)
  end

end
