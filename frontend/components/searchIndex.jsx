var React = require('react');
var History = require('react-router').History;
var OptimizationIndex = require('./optimizationIndex');
var AuthStore = require('../stores/authStore');
var OptimizationStore = require('../stores/optimizations');
var OptimizationActions = require('../actions/optimizationActions');

// style
var Style = require('../util/styleObj');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyRawTheme = require('../util/theme');
var FlatButton = require('material-ui/lib/flat-button');
var TextField = require('material-ui/lib/text-field');
var MenuItem = require('material-ui/lib/menus/menu-item');
var Menu = require('material-ui/lib/menus/menu');
var Divider = require('material-ui/lib/divider');

var SearchIndex = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { searchParams: OptimizationStore.allSearchParams() };
  },

  _onChange: function () {
    this.setState({ searchParams: OptimizationStore.allSearchParams() });
  },

  componentDidMount: function () {
    this.authToken = AuthStore.addListener(this._onChange);
    this.searchToken = OptimizationStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.authToken.remove();
    this.searchToken.remove();
  },

  clickCategory: function (value) {
    OptimizationActions.receiveSearchParam('category', value);
  },

  // for MUI to change color of menu sele
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext:function () {
    return {
      muiTheme: ThemeManager.getMuiTheme(MyRawTheme),
    };
  },

  render: function () {
    return (
      <div style={{ margin: '0 auto' }}>
        <Menu zDepth={0}
          value={this.state.searchParams.category}
          style={Style.categoryMenu}
          desktop={true}
        >
          <p>Feeds</p>
          <Divider />
          <MenuItem value={'all'} onTouchTap={this.clickCategory.bind(null, 'all')}
            primaryText='All' className='leftMenuDropdown' />
          <MenuItem value={'exercise'} onTouchTap={this.clickCategory.bind(null, 'exercise')}
            primaryText='Exercise' className='leftMenuDropdown' />
          <MenuItem value={'food'} onTouchTap={this.clickCategory.bind(null, 'food')}
            primaryText='Food' className='leftMenuDropdown' />
          <MenuItem value={'household'} onTouchTap={this.clickCategory.bind(null, 'household')}
            primaryText='Household' className='leftMenuDropdown' />
          <MenuItem value={'sleep'} onTouchTap={this.clickCategory.bind(null, 'sleep')}
            primaryText='Sleep' className='leftMenuDropdown' />
          <MenuItem value={'social'} onTouchTap={this.clickCategory.bind(null, 'social')}
            primaryText='Social' className='leftMenuDropdown' />
          <MenuItem value={'tech'} onTouchTap={this.clickCategory.bind(null, 'tech')}
            primaryText='Tech' className='leftMenuDropdown' />
          <MenuItem value={'transport'} onTouchTap={this.clickCategory.bind(null, 'transport')}
            primaryText='Transport' className='leftMenuDropdown' />
          <MenuItem value={'other'} onTouchTap={this.clickCategory.bind(null, 'other')}
            primaryText='Other' className='leftMenuDropdown' />
        </Menu>
      </div>
    );
  },
});

module.exports = SearchIndex;
