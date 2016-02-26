var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;

var _publicOptimizations = {};
var OptimizationStore = new Store(Dispatcher);

OptimizationStore.resetOptimizations = function (optimizations) {
  _optimizations = {};
  optimizations.forEach(function (optimization) {
    _publicOptimizations[optimization.id] = optimization;
  });
};

OptimizationStore.find = function (id) {
  return _publicOptimizations[id];
};

OptimizationStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case 'PUBLIC_OPTIMIZATIONS_RECEIVED':
      this.resetOptimizations(payload.publicOptimizations);
      this.__emitChange();
      break;
    case 'OPTIMIZATION_RECEIVED':
      _publicOptimizations[payload.optimization.id] = payload.optimization;
      this.__emitChange();
      break;
    case 'DELETED_OPTIMIZATION':
      delete _publicOptimizations.payload.optimization.id;
      this.__emitChange();
      break;
  }
};

OptimizationStore.all = function () {
  var allPublicOptimizations = [];
  Object.keys(_publicOptimizations).forEach(function (key) {
    allPublicOptimizations.push(_publicOptimizations[key]);
  });

  return allPublicOptimizations;
};

module.exports = OptimizationStore;
