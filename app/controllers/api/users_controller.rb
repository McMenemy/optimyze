class Api::UsersController < ApplicationController
  def show
    @user_optimizations = current_user.optimizations
  end
end
