var React = require('react');
var AuthStore = require('../stores/authStore');
var AuthActions = require('../actions/authActions');
var OptimizationActions = require('../actions/optimizationActions');
var History = require('react-router').History;

// MUI and style
var Style = require('../util/styleObj');
var Popover = require('material-ui/lib/popover/popover');
var Toolbar = require('material-ui/lib/toolbar/toolbar');
var ToolbarGroup =  require('material-ui/lib/toolbar/toolbar-group');
var ToolbarTitle = require('material-ui/lib/toolbar/toolbar-title');
var FlatButton = require('material-ui/lib/flat-button');
var Dialog = require('material-ui/lib/dialog');
var Paper = require('material-ui/lib/paper');
var TextField = require('material-ui/lib/text-field');
var RaisedButton = require('material-ui/lib/raised-button');
var MenuItem = require('material-ui/lib/menus/menu-item');
var Menu = require('material-ui/lib/menus/menu');

// components
var SignInUpForm = require('../components/signInUpForm');

var Header = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return (
      { openAuthForm: false,
        authPath: '',
        searchParams: OptimizationStore.allSearchParams(),
        openUserMenu: false,
      }
    );
  },

  _onChange: function () {
    this.forceUpdate();
  },

  componentDidMount: function () {
    this.authToken = AuthStore.addListener(this._onChange);
    this.searchToken = OptimizationStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.authToken.remove();
    this.searchToken.remove();
  },

  signOut: function () {
    AuthActions.signOut();
    this.setState({ openUserMenu: false, });
    OptimizationActions.receiveSearchParam('isUserOnly', false);
  },

  navigateToRoot: function () {
    OptimizationActions.resetSearchParams();
    this.history.push('/');
  },

  handleOpenUserMenu: function (e) {
    this.setState({ openUserMenu: true, userMenuAnchor: e.currentTarget, });
  },

  handleCloseUserMenu: function () {
    this.setState({ openUserMenu: false, });
  },

  clickMyOptimizations: function () {
    OptimizationActions.receiveSearchParam('isUserOnly', true);
  },

  makeHeaderList: function () {
    if (AuthStore.isSignedIn()) {
      return (
        <ToolbarGroup float='right'>
          <FlatButton
            label={AuthStore.currentUser().username}
            onTouchTap={this.handleOpenUserMenu}
            style={Style.navBarButton}
            hoverColor='#A7FFEB'
            rippleColor='#1DE9B6'
          />

          <Popover
            open={this.state.openUserMenu}
            anchorEl={this.state.userMenuAnchor}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            onRequestClose={this.handleCloseUserMenu}
          >
            <Menu>
              <MenuItem className='userMenuItem' primaryText='Sign Out' onTouchTap={this.signOut} />
              <MenuItem className='userMenuItem'
                primaryText='My Optimizations'
                onTouchTap={this.clickMyOptimizations}
              />
            </Menu>
          </Popover>
        </ToolbarGroup>
    );
    } else {
      return (
          <ToolbarGroup float='right'>
            <FlatButton
              label='Sign In'
              onTouchTap={this.handleSignInUpOpen.bind(null, 'signIn')}
              style={Style.navBarButton}
              hoverColor='#A7FFEB'
              rippleColor='#1DE9B6'
            />
            <FlatButton
              label='Sign Up'
              onTouchTap={this.handleSignInUpOpen.bind(null, 'signUp')}
              style={Style.navBarButton}
              hoverColor='#A7FFEB'
              rippleColor='#1DE9B6'
            />
          </ToolbarGroup>
        );
    }
  },

  handleSignInUpOpen: function (path) {
    this.setState({ openAuthForm: true, authPath: path });
  },

  handleSignInUpClose: function () {
    this.setState({ openAuthForm: false, authPath: '' });
  },

  handleInput: function (e) {
    e.preventDefault();
    OptimizationActions.receiveSearchParam('title', e.currentTarget.value);
  },

  render: function () {

    return (
      <Paper style={Style.navBarContainer}>
        <Toolbar style={Style.navBar}>
          <ToolbarGroup firstChild={true}>
            <FlatButton
              label='Optimyze'
              style={Style.logo}
              hoverColor='white'
              rippleColor='white'
              onTouchTap={this.navigateToRoot}
            />
          </ToolbarGroup>

          <ToolbarGroup>
            <TextField
              hintText='search optimyze'
              onChange={this.handleInput}
              value={this.state.searchParams.title}
              style={Style.searchBar}
              underlineFocusStyle={{ borderColor: '#00BFA5' }}
            />
          </ToolbarGroup>

          {this.makeHeaderList()}

          <Dialog
            actions={<SignInUpForm
                        closeModal={this.handleSignInUpClose}
                        authPath={this.state.authPath}
                    />}
            modal={false}
            open={this.state.openAuthForm}
            onRequestClose={this.handleSignInUpClose}
          />
        </Toolbar>
      </Paper>
    );
  },

});

module.exports = Header;
