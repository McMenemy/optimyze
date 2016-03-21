var React = require('react');
var AuthStore = require('../stores/authStore');
var AuthActions = require('../actions/authActions');
var History = require('react-router').History;

var Header = React.createClass({
  mixins: [History],

  _onChange: function () {
    this.forceUpdate();
  },

  componentDidMount: function () {
    this.authToken = AuthStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.authToken.remove();
  },

  signOut: function () {
    AuthActions.signOut();
  },

  signInUp: function () {
    this.history.push('auth');
  },

  navigateToRoot: function () {
    this.history.push('/');
  },

  makeHeaderList: function () {
    if (AuthStore.isSignedIn()) {
      return (
        <ul className="header-list group">
          <li>Hi, {AuthStore.currentUser().username}</li>
          <li><button onClick={this.signOut}>Sign Out</button></li>
        </ul>
    );
    } else {
      return (
          <ul className="header-list group">
            <li><button onClick={this.signInUp}>Sign In/Up</button></li>
          </ul>
        );
    }
  },

  render: function () {
    return (
      <header className="header">
        <nav className="header-nav">
          <h1 className="header-logo" onClick={this.navigateToRoot}>Optimyze</h1>
          {this.makeHeaderList()}
        </nav>
      </header>
    );
  },

});

module.exports = Header;
