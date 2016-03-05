var Dispatcher = require('../dispatcher/dispatcher');
var AuthConstants = require('../constants/authConstants');
var ApiUtil = require('../util/apiUtil');

var AuthActions = {

  receiveSignInUp: function (userData) {
    Dispatcher.dispatch({
      actionType: AuthConstants.SIGN_INUP_RECEIVED,
      user: userData,
    });
  },

  receiveSignOut: function (userData) {
    Dispatcher.dispatch({
      actionType: AuthConstants.SIGN_OUT_RECEIVED,
      user: userData,
    });
  },

  signOut: function () {
    ApiUtil.signOut(this.receiveSignOut);
  },

  signIn: function (signInParams, successCallback, errorCallback) {
    ApiUtil.signIn(signInParams, this.receiveSignInUp, successCallback, errorCallback);
  },

  signUp: function (signUpParams, successCallback, errorCallback) {
    ApiUtil.signUp(signUpParams, this.receiveSignInUp, successCallback, errorCallback);
  },

  retrieveSignedInUser: function (sessionParams) {
    ApiUtil.signInSession(sessionParams, this.receiveSignInUp);
  },
};

module.exports = AuthActions;
