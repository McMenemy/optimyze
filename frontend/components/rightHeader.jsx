var React = require('react');

// Style
var Style = require('../util/styleObj');
var SelectField = require('material-ui/lib/select-field');
var MenuItem = require('material-ui/lib/menus/menu-item');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var MyRawTheme = require('../util/theme');

var RightHeader = React.createClass({

  getInitialState: function () {
    return { searchParams: OptimizationStore.allSearchParams() };
  },

  _onChange: function () {
    this.setState({ searchParams: OptimizationStore.allSearchParams() });
  },

  componentDidMount: function () {
    this.searchToken = OptimizationStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.searchToken.remove();
  },

  dateSort: function (e, index, value) {
    OptimizationActions.receiveSearchParam('sort', value);
  },

  // for MUI to change color of selected dropdown menu item
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
      <div style={{ width: '100%' }}>
        <SelectField
          value={this.state.searchParams.sort}
          onChange={this.dateSort}
          floatingLabelText='Sort By'
          style={Style.sortBy}
          primaryText='Newest'
          >
          {[
            <MenuItem
              className='leftMenuDropdown'
              key={1}
              value={'newest'}
              primaryText='Newest'
              style={Style.dropdownItem}
              />,
            <MenuItem
              className='leftMenuDropdown'
              key={2}
              value={'oldest'}
              primaryText='Oldest'
              style={Style.dropdownItem}
              />,
          ]}
        </SelectField>
      </div>
    );
  },

});

module.exports = RightHeader;
