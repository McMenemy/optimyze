var Dispatcher = require('../dispatcher/dispatcher');
var OptimizationConstants = require('../constants/optimizationConstants.js');
var ApiUtil = require('../util/apiUtil.js');

var OptimizationActions = {
  receiveAllOptimizations: function (data) {
    Dispatcher.dispatch({
      actionType: OptimizationConstants.ALL_OPTIMIZATIONS_RECEIVED,
      allOptimizations: data,
    });
  },

  retrieveAllOptimizations: function () {
    ApiUtil.fetchAllOptimizations(this.receiveAllOptimizations);
  },

  receiveOneOptimization: function (data) {
    Dispatcher.dispatch({
      actionType: OptimizationConstants.OPTIMIZATION_RECEIVED,
      optimization: data,
    });
  },

  retrieveOneOptimization: function (optimizationId) {
    ApiUtil.fetchOneOptimization(optimizationId, this.receiveOneOptimization);
  },

  retrieveNewOptimization: function (updateParams) {
    ApiUtil.createOptimization(updateParams, this.receiveOneOptimization);
  },

  retrieveUpdatedOptimization: function (patchParams) {
    ApiUtil.updateOptimization(patchParams, this.receiveOneOptimization);
  },

  receiveDeletedOptimization: function (data) {
    Dispatcher.dispatch({
      actionType: OptimizationConstants.OPTIMIZATION_DELETED,
      optimization: data,
    });
  },

  retrieveDeletedOptimization: function (deleteParams) {
    ApiUtil.deleteOptimization(deleteParams, this.receiveDeletedOptimization);
  },

};

module.exports = OptimizationActions;
