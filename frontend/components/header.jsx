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

  navigateToRoot: function () {
    this.history.push('/');
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
          <ToolbarGroup float='right'>
            <FlatButton label='Sign In/Up' onClick={this.signInUp} />
          </ToolbarGroup>
        );
    }
  },

  render: function () {
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <FlatButton label='Optimyze' onClick={this.navigateToRoot}/>
        </ToolbarGroup>
        {this.makeHeaderList()}
      </Toolbar>
    );
  },

});

module.exports = Header;
