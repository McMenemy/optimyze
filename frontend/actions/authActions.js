var Dispatcher = require('../dispatcher/dispatcher');
var AuthConstants = require('../constants/authConstants');
var ApiUtil = require('../util/apiUtil');

var AuthActions = {

  receiveSignInUp: function (userData) {
    debugger;
    Dispatcher.dispatch({
      actionType: AuthConstants.SIGN_INUP_RECEIVED,
      user: userData,
    });
  },

  signIn: function (signInParams, successCallback, errorCallback) {
    ApiUtil.signIn(signInParams, this.receiveSignInUp, successCallback, errorCallback);
  },

  signUp: function (signUpParams, successCallback, errorCallback) {
    ApiUtil.signUp(signUpParams, this.receiveSignInUp, successCallback, errorCallback);
  },
};

module.exports = AuthActions;
