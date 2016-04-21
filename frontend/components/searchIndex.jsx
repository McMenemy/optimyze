var React = require('react');
var History = require('react-router').History;
var OptimizationIndex = require('./optimizationIndex');
var AuthStore = require('../stores/authStore');

// style
var Style = require('../util/styleObj');
var LeftNav = require('material-ui/lib/left-nav');
var FlatButton = require('material-ui/lib/flat-button');
var TextField = require('material-ui/lib/text-field');
var SelectField = require('material-ui/lib/select-field');
var MenuItem = require('material-ui/lib/menus/menu-item');

var SearchIndex = React.createClass({
  mixins: [History],

  getInitialState: function () {
    var searchParams = {};
    searchParams.title = '';
    searchParams.category = 'all';
    searchParams.sort = 'newest';

    if (AuthStore.isSignedIn()) {
      searchParams.isUserOnly = true;
      return { optimizations: OptimizationStore.allForCurrentUser(),
               searchParams: searchParams, };
    } else {
      searchParams.isUserOnly = false;
      return { optimizations: OptimizationStore.all(),
               searchParams: searchParams, };
    }

  },

  _onChange: function () {
    this.state.searchParams.isUserOnly = AuthStore.isSignedIn();
    this.setState(this.state);
  },

  componentDidMount: function () {
    this.authToken = AuthStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.authToken.remove();
  },

  handleInput: function (e) {
    e.preventDefault();
    this.state.searchParams.title = e.currentTarget.value;
    this.setState(this.state.searchParams);
  },

  clickToggleOptimizations: function () {
    if (AuthStore.isSignedIn()) {
      this.state.searchParams.isUserOnly = !this.state.searchParams.isUserOnly;
      this.setState(this.state.searchParams);
    } else {
      this.history.push('auth');
    }
  },

  clickCategory: function (event, index, value) {
    this.state.searchParams.category = value;
    this.setState(this.state.searchParams);
  },

  navigateToRoot: function () {
    this.history.push('/');
  },

  dateSort: function (event, index, value) {
    this.state.searchParams.sort = value;
    this.setState(this.state.searchParams);
  },

  render: function () {
    return (
      <LeftNav style={Style.leftNav}>
        <FlatButton label='Optimyze' onClick={this.navigateToRoot}/>
        <TextField
          hintText='search by title'
          onChange={this.handleInput}
          value={this.state.searchParams.title}
        />

        <SelectField
          value={this.state.searchParams.sort}
          onChange={this.dateSort}
          floatingLabelText='Sort By'
        >
          {[
            <MenuItem key={1} value={'newest'} primaryText='Newest' />,
            <MenuItem key={2} value={'oldest'} primaryText='Oldest' />,
          ]}
        </SelectField>

        <SelectField
          value={this.state.searchParams.category}
          onChange={this.clickCategory}
          floatingLabelText='Category'
        >
          {[
            <MenuItem key={1} value={'exercise'} primaryText='Exercise' />,
            <MenuItem key={2} value={'food'} primaryText='Food' />,
            <MenuItem key={3} value={'household'} primaryText='Household' />,
            <MenuItem key={4} value={'sleep'} primaryText='Sleep' />,
            <MenuItem key={5} value={'social'} primaryText='Social' />,
            <MenuItem key={6} value={'tech'} primaryText='Tech' />,
            <MenuItem key={7} value={'transport'} primaryText='Transport' />,
            <MenuItem key={8} value={'other'} primaryText='Other' />,
            <MenuItem key={9} value={'all'} primaryText='All' />,
          ]}
        </SelectField>
      </LeftNav>
    );
  },
});

module.exports = SearchIndex;
