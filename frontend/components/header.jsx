var React = require('react');
var AuthStore = require('../stores/authStore');
var AuthActions = require('../actions/authActions');
var History = require('react-router').History;

// style
var Toolbar = require('material-ui/lib/toolbar/toolbar');
var ToolbarGroup =  require('material-ui/lib/toolbar/toolbar-group');
var ToolbarTitle = require('material-ui/lib/toolbar/toolbar-title');
var FlatButton = require('material-ui/lib/flat-button');

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

  makeHeaderList: function () {
    if (AuthStore.isSignedIn()) {
      return (
        <ToolbarGroup float='right'>
          <ToolbarTitle text={'Hi, ' + AuthStore.currentUser().username} />
          <FlatButton label='Sign Out' onClick={this.signOut} />
        </ToolbarGroup>
    );
    } else {
      return (
          <ul className="header-list group">
            <FlatButton label='Sign In/Up' onClick={this.signInUp} />
          </ul>
        );
    }
  },

  render: function () {
    return (
      <Toolbar>
        {this.makeHeaderList()}
      </Toolbar>
    );
  },

});

module.exports = Header;
