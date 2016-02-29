var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var SearchParamConstants = require('../constants/searchParamConstants');

var SearchParamStore = new Store(Dispatcher);
var _searchParams = {};

SearchParamStore.resetSearchParams = function (searchParams) {
  _searchParams = searchParams;
};

SearchParamStore.title = function () {
  return _searchParams.title;
};

SearchParamStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case SearchParamConstants.SEARCH_PARAMS_RECEIVED:
      this.resetSearchParams(payload.searchParams);
      this.__emitChange();
      break;
  }
};

module.exports = SearchParamStore;
