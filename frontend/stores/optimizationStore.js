var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var OptimizationConstants = require('../constants/optimizationConstants');
var AuthStore = require('../stores/authStore');

var OptimizationStore = new Store(Dispatcher);
var _allOptimizations = {};
var _searchParams = { title: '', category: 'all', sort: 'newest', isUserOnly: 'false', };

OptimizationStore.allSearchParams = function () {
  return _searchParams;
};

OptimizationStore.resetOptimizations = function (optimizations) {
  _optimizations = {};
  optimizations.forEach(function (optimization) {
    _allOptimizations[optimization.id] = optimization;
  });
};

OptimizationStore.find = function (id) {
  return _allOptimizations[id];
};

OptimizationStore.all = function () {
  var allOptimizations = [];
  Object.keys(_allOptimizations).forEach(function (key) {
    allOptimizations.push(_allOptimizations[key]);
  });

  return allOptimizations;
};

OptimizationStore.allForCurrentUser = function () {
  var allUserOptimizations = [];
  Object.keys(_allOptimizations).forEach(function (key) {
    if (AuthStore.currentUser().id === _allOptimizations[key].user_id) {
      allUserOptimizations.push(_allOptimizations[key]);
    }
  });

  return allUserOptimizations;
};

OptimizationStore.resetSearchParams = function () {
  _searchParams = { title: '', category: 'all', sort: 'newest', isUserOnly: 'false', };
},

OptimizationStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case OptimizationConstants.OPTIMIZATIONS_RECEIVED:
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
    case OptimizationConstants.SEARCH_PARAM_RECEIVED:
      _searchParams[payload.key] = payload.value;
      this.__emitChange();
      break;
    case OptimizationConstants.RESET_SEARCH_PARAMS:
      this.resetSearchParams();
      this.__emitChange();
      break;
  }
};

module.exports = OptimizationStore;
