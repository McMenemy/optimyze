var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var OptimizationConstants = require('../constants/optimizationConstants');
var AuthStore = require('../stores/authStore');

var OptimizationStore = new Store(Dispatcher);
var _allOptimizations = {};
var _searchParams = { title: '', category: 'all', sort: 'newest' };

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

OptimizationStore.allWithSearchParams = function () {
  var allFilteredOptimizations = [];
  var titleFilter = new RegExp('' + _searchParams.title.toLowerCase());

  if (_searchParams.isUserOnly) {
    allFilteredOptimizations = this.allForCurrentUser();
  } else {
    allFilteredOptimizations = this.all();
  }

  if (_searchParams.category !== 'all') {
    allFilteredOptimizations = allFilteredOptimizations.filter(function (currentOptimization) {
      var categoryArray = currentOptimization.categories;

      return categoryArray.includes(_searchParams.category);
    });
  }

  allFilteredOptimizations = allFilteredOptimizations.filter(function (currentOptimization) {
    var currentTitle = currentOptimization.title.toLowerCase();

    return currentTitle.match(titleFilter);
  });

  if (_searchParams.sort == 'oldest') {
    return allFilteredOptimizations.reverse();
  } else {
    return allFilteredOptimizations;
  }
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
    case OptimizationConstants.SEARCH_PARAM_RECEIVED:
      _searchParams[payload.key] = payload.value;
      this.__emitChange();
      break;
  }
};

module.exports = OptimizationStore;
