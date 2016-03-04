var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var AuthConstants = require('../constants/authConstants');

var AuthStore = new Store(Dispatcher);
var _currentUser = {};

AuthStore.resetAuthStore = function (user) {
  localStorage.token = user.token;
  _currentUser = user;
},

AuthStore.signOut = function () {
  localStorage.clear();
  _currentUser = {};
},

AuthStore.isSignedIn = function () {
  if (typeof _currentUser.id === 'undefined') {
    return false;
  } else {
    return true;
  }
},

AuthStore.currentUser = function (user) {
  return _currentUser;
},

AuthStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case AuthConstants.SIGN_INUP_RECEIVED:
      this.resetAuthStore(payload.user);
      this.__emitChange();
      break;
    case AuthConstants.SIGN_OUT_RECEIVED:
      this.signOut();
      this.__emitChange();
      break;
  }
};

module.exports = AuthStore;
