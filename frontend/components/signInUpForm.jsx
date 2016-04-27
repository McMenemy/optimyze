var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var AuthActions = require('../actions/authActions');
var History = require('react-router').History;

// style
var Style = require('../util/styleObj');
var TextField = require('material-ui/lib/text-field');
var RaisedButton = require('material-ui/lib/raised-button');

var SignInUpForm = React.createClass({
  mixins: [History, LinkedStateMixin],

  getInitialState: function () {
    return { username: '', password: '', buttonClicked: '', errors: '', passwordConfirm: '' };
  },

  demoSignIn: function () {
    this.state.buttonClicked = 'demoSignin';
  },

  signIn: function () {
    this.state.buttonClicked = 'signin';
  },

  signUp: function () {
    this.state.buttonClicked = 'signup';
  },

  successCallback: function (user) {
    this.props.closeModal();
  },

  errorCallback: function (errorArray) {
    this.state.errors = JSON.parse(errorArray);
    this.setState(this.state);
  },

  handleSubmit: function (event) {
    event.preventDefault();
    this.setState({ buttonClicked: '', errors: '' });

    if (this.state.buttonClicked === 'signin') {
      var signInParams = { user: this.state };
      AuthActions.signIn(signInParams, this.successCallback, this.errorCallback);
    } else if (this.state.buttonClicked === 'signup') {
      if (this.state.passwordConfirm != this.state.password) {
        this.setState({ errors: 'passwords do not match' });
      } else {
        var signUpParams = { user: this.state };
        AuthActions.signUp(signUpParams, this.successCallback, this.errorCallback);
      }
    } else if (this.state.buttonClicked == 'demoSignin') {
      var signInParams = { user: { username: 'User42', password: 'password' } };
      AuthActions.signIn(signInParams, this.successCallback, this.errorCallback);
    }
  },

  renderConfirmPassword: function () {
    if (this.props.authPath == 'signUp') {
      return (
        <TextField
          style={Style.authField}
          hintText='confirm password'
          type='password'
          errorText=''
          floatingLabelText='Confirm Password'
          valueLink={ this.linkState('passwordConfirm') }
          underlineFocusStyle={{ borderColor: '#00BFA5' }}
        />
      );
    }
  },

  renderCorrectButton: function () {
    if (this.props.authPath == 'signUp') {
      return (
        <RaisedButton
          style={Style.authButton}
          label='sign up'
          type='submit'
          onClick={this.signUp}
          style={Style.authButton}
          backgroundColor='#00BFA5'
          labelStyle={Style.authButtonText}
          />
      );
    } else if (this.props.authPath == 'signIn') {
      return (
        <RaisedButton
          style={Style.authButton}
          label='sign in'
          type='submit'
          onClick={this.signIn}
          style={Style.authButton}
          backgroundColor='#00BFA5'
          labelStyle={Style.authButtonText}
          />
      );
    }
  },

  render: function () {
    return (
      <div style={Style.authContainer}>
        <h1>{this.state.errors.toString()}</h1>
        <form onSubmit={this.handleSubmit}>
          <TextField
            style={Style.authField}
            hintText='username'
            errorText=''
            floatingLabelText='Username'
            valueLink={ this.linkState('username') }
            underlineFocusStyle={{ borderColor: '#00BFA5' }}
          />

          <TextField
            style={Style.authField}
            hintText='password'
            type='password'
            errorText=''
            floatingLabelText='Password'
            valueLink={ this.linkState('password') }
            underlineFocusStyle={{ borderColor: '#00BFA5' }}
          />

        {this.renderConfirmPassword()}

        {this.renderCorrectButton()}

          <RaisedButton
            style={Style.authButton}
            label='demo account'
            type='submit'
            onClick={this.demoSignIn}
            style={Style.authButton}
            backgroundColor='#00BFA5'
            labelStyle={Style.authButtonText}
          />
        </form>
      </div>
    );
  },

});

module.exports = SignInUpForm;
