var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var OptimizationConstants = require('../constants/optimizationConstants');

var OptimizationStore = new Store(Dispatcher);
var _allOptimizations = {};

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
    if (window.currentUser.userId === _allOptimizations[key].user_id) {
      allUserOptimizations.push(_allOptimizations[key]);
    }
  });

  return allUserOptimizations;
};

OptimizationStore.allWithSearchParams = function (searchParams) {
  var allFilteredOptimizations = [];
  var titleFilter = new RegExp('^' + searchParams.title.toLowerCase());

  if (searchParams.userOnly) {
    allFilteredOptimizations = this.allForCurrentUser();
  } else {
    allFilteredOptimizations = this.all();
  }

  allFilteredOptimizations.forEach(function (currentOptimization, i) {
    var currentTitle = currentOptimization.title.toLowerCase();
    var currentUser = currentOptimization.user_id;

    if (!currentTitle.match(titleFilter)) {
      allFilteredOptimizations.splice(i, 1);
    }
  });

  return allFilteredOptimizations;
},

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

module.exports = OptimizationStore;
