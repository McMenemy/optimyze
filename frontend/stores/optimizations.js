var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var OptimizationConstants = require('../constants/optimizationConstants');

var _allOptimizations = {};
var OptimizationStore = new Store(Dispatcher);

OptimizationStore.resetOptimizations = function (optimizations) {
  _optimizations = {};
  optimizations.forEach(function (optimization) {
    _allOptimizations[optimization.id] = optimization;
  });
};

OptimizationStore.find = function (id) {
  return _allOptimizations[id];
};

OptimizationStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case OptimizationConstants.ALL_OPTIMIZATIONS_RECEIVED:
      this.resetOptimizations(payload.allOptimizations);
      this.__emitChange();
      break;
    case OptimizationConstants.OPTIMIZATION_RECEIVED:
      _allOptimizations[payload.optimization.id] = payload.optimization;
      this.__emitChange();
      break;
    case OptimizationConstants.OPTIMIZATION_DELETED:
      delete _allOptimizations[payload.optimization.id];
      this.__emitChange();
      break;
  }
};

OptimizationStore.all = function () {
  var allOptimizations = [];
  Object.keys(_allOptimizations).forEach(function (key) {
    allOptimizations.push(_allOptimizations[key]);
  });

  return allOptimizations;
};

module.exports = OptimizationStore;
