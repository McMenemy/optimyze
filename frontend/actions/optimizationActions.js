var Dispatcher = require('../dispatcher/dispatcher');
var OptimizationConstants = require('../constants/optimizationConstants.js');
var ApiUtil = require('../util/apiUtil.js');

var OptimizationActions = {
  receiveAllPublicOptimizations: function (data) {
    Dispatcher.dispatch({
      actionType: OptimizationConstants.PUBLIC_OPTIMIZATIONS_RECEIVED,
      publicOptimizations: data,
    });
  },

  retrieveAllPublicOptimizations: function () {
    ApiUtil.fetchAllPublicOptimizations(this.receiveAllPublicOptimizations);
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
    debugger;
    ApiUtil.updateOptimization(patchParams, this.receiveOneOptimization);
  },

};

module.exports = OptimizationActions;
