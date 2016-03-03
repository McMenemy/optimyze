var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var AuthConstants = require('../constants/authConstants');

var AuthStore = new Store(Dispatcher);
var currentUser = {};

AuthStore.resetAuthStore = function (payload) {
  debugger;
},

AuthStore.__onDispatch = function (payload) {
  debugger;
  switch (payload.actionType) {
    case AuthConstants.SIGN_INUP_RECEIVED:
      this.resetAuthStore(payload);
      this.__emitChange();
      break;
  }
};

module.exports = AuthStore;
