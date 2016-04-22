var React = require('react');
var AuthStore = require('../stores/authStore');
var AuthActions = require('../actions/authActions');
var History = require('react-router').History;

// style
var Toolbar = require('material-ui/lib/toolbar/toolbar');
var ToolbarGroup =  require('material-ui/lib/toolbar/toolbar-group');
var ToolbarTitle = require('material-ui/lib/toolbar/toolbar-title');
var FlatButton = require('material-ui/lib/flat-button');
var Dialog = require('material-ui/lib/dialog');
var Style = require('../util/styleObj');

// components
var SignInUpForm = require('../components/signInUpForm');

var Header = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { open: false };
  },

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

  navigateToRoot: function () {
    this.history.push('/');
  },

  makeHeaderList: function () {
    if (AuthStore.isSignedIn()) {
      return (
        <ToolbarGroup float='right'>
          <ToolbarTitle text={'Hi, ' + AuthStore.currentUser().username} />
          <FlatButton label='Sign Out' onTouchTap={this.signOut} />
        </ToolbarGroup>
    );
    } else {
      return (
          <ToolbarGroup float='right'>
            <FlatButton label='Sign In/Up' onTouchTap={this.handleSignInUpOpen} />
          </ToolbarGroup>
        );
    }
  },

  handleSignInUpOpen: function () {
    this.setState({ open: true });
  },

  handleSignInUpClose: function () {
    console.log('close modal');
    this.setState({ open: false });
  },

  render: function () {

    return (
      <Toolbar style={Style.navBar}>
        <ToolbarGroup firstChild={true}>
          <FlatButton label='Optimyze' />
        </ToolbarGroup>
        {this.makeHeaderList()}

        <Dialog
          actions={<SignInUpForm closeModal={this.handleSignInUpClose} />}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleSignInUpClose}
        >
        </Dialog>
      </Toolbar>
    );
  },

});

module.exports = Header;
