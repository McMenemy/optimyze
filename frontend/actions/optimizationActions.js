var Dispatcher = require('../dispatcher/dispatcher');
var OptimizationConstants = require('../constants/optimizationConstants');
var ApiUtil = require('../util/apiUtil');

var OptimizationActions = {
  receiveAllOptimizations: function (data) {
    Dispatcher.dispatch({
      actionType: OptimizationConstants.OPTIMIZATIONS_RECEIVED,
      allOptimizations: data,
    });
  },

  retrieveAllOptimizations: function () {
    ApiUtil.fetchAllOptimizations(this.receiveAllOptimizations);
  },

  retrieveFilteredOptimizations: function (searchParams) {
    ApiUtil.fetchFilteredOptimizations(searchParams, this.receiveAllOptimizations);
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

  retrieveNewOptimization: function (postParams, errorCallback, successCallback) {
    ApiUtil.createOptimization(postParams, this.receiveOneOptimization, errorCallback, successCallback);
  },

  retrieveUpdatedOptimization: function (patchParams, errorCallback, successCallback) {
    ApiUtil.updateOptimization(patchParams, this.receiveOneOptimization, errorCallback, successCallback);
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

  receiveSearchParam: function (key, value) {
    Dispatcher.dispatch({
      actionType: OptimizationConstants.SEARCH_PARAM_RECEIVED,
      key: key,
      value: value,
    });
  },

  resetSearchParams: function () {
    Dispatcher.dispatch({
      actionType: OptimizationConstants.RESET_SEARCH_PARAMS,
    });
  },

};

module.exports = OptimizationActions;
