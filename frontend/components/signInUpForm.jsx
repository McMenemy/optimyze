var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var AuthActions = require('../actions/authActions');
var History = require('react-router').History;

var SignInUpForm = React.createClass({
  mixins: [History, LinkedStateMixin],

  getInitialState: function () {
    return { username: '', password: '', buttonClicked: '', errors: '' };
  },

  signIn: function () {
    this.state.buttonClicked = 'signin';
  },

  signUp: function () {
    this.state.buttonClicked = 'signup';
  },

  successCallback: function (user) {
    this.history.push('/');
  },

  errorCallback: function (errorArray) {
    this.state.errors = JSON.parse(errorArray);
    this.setState(this.state);
  },

  handleSubmit: function (event) {
    event.preventDefault();
    if (this.state.buttonClicked === 'signin') {
      delete this.state.buttonClicked;
      delete this.state.errors;
      var signInParams = { user: this.state };
      AuthActions.signIn(signInParams, this.successCallback, this.errorCallback);
    } else if (this.state.buttonClicked === 'signup') {
      delete this.state.buttonClicked;
      delete this.state.errors;
      var signUpParams = { user: this.state };
      AuthActions.signUp(signUpParams, this.successCallback, this.errorCallback);
    }
  },

  render: function () {
    return (
      <div className="user-form-container">
        <h1>{this.state.errors.toString()}</h1>
        <form className="user-form" onSubmit={this.handleSubmit}>
          <div className="user-form-group">
            <label>username</label>
            <input type="text" valueLink={this.linkState('username')} />
          </div>
          <div className="user-form-group">
            <label>password</label>
            <input type="password" valueLink={this.linkState('password')} />
          </div>
          <input onClick={this.signIn} className="whiteButton green-button-overlay user-form-button" name="signin" type="submit" value="sign in" />
          <input onClick={this.signUp} className="whiteButton green-button-overlay user-form-button" name="signup" type="submit" value="sign up" />
        </form>
      </div>
    );
  },

});

module.exports = SignInUpForm;
