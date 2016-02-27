class Api::OptimizationsController < ApplicationController
  def create
    @optimization = Optimization.new(optimization_params)

    if @optimization.save
      render :show
    else
      render json: @optimization.errors.full_messages, status: 422
    end
  end

  def update
    @optimization = Optimization.find(params[:id])

    if @optimization.update(optimization_params)
      render :show
    else
      render json: @optimization.errors.full_messages, status: 422
    end
  end

  def destroy
    @optimization = Optimization.find(params[:id])
    @optimization.destroy
    render :show
  end

  def index
    @optimizations = Optimization.all
  end

  def show
    @optimization = Optimization.find(params[:id])
  end

  private

  def optimization_params
    params.require(:optimization).permit(:title, :description, :investment_time, :time_saved_per_occurrence, :frequency, :user_id)
  end
end
