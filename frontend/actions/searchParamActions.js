var Dispatcher = require('../dispatcher/dispatcher');
var SearchParamConstants = require('../constants/searchParamConstants.js');

var SearchParamActions = {
  receiveSearchParams: function (searchParams) {
    Dispatcher.dispatch({
      actionType: SearchParamConstants.SEARCH_PARAMS_RECEIVED,
      searchParams: searchParams,
    });
  },
};

module.exports = SearchParamActions;
