var React = require('react');
var History = require('react-router').History;
var OptimizationIndex = require('./optimizationIndex');
var AuthStore = require('../stores/authStore');
var OptimizationStore = require('../stores/optimizations');
var OptimizationActions = require('../actions/optimizationActions');

// style
var Style = require('../util/styleObj');
var FlatButton = require('material-ui/lib/flat-button');
var TextField = require('material-ui/lib/text-field');
var SelectField = require('material-ui/lib/select-field');
var MenuItem = require('material-ui/lib/menus/menu-item');

var SearchIndex = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { searchParams: OptimizationStore.allSearchParams() };
  },

  _onChange: function () {
    this.setState({ searchParams: OptimizationStore.allSearchParams() });
    console.log(this.state);
  },

  componentDidMount: function () {
    this.authToken = AuthStore.addListener(this._onChange);
    this.searchToken = OptimizationStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.authToken.remove();
    this.searchToken.remove();
  },

  handleInput: function (e) {
    e.preventDefault();
    OptimizationActions.receiveSearchParam('title', e.currentTarget.value);
  },

  clickCategory: function (e, index, value) {
    OptimizationActions.receiveSearchParam('category', value);
  },

  dateSort: function (e, index, value) {
    OptimizationActions.receiveSearchParam('sort', value);
  },

  render: function () {
    return (
      <div>
        <TextField
          style={Style.searchBar}
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
      </div>
    );
  },
});

module.exports = SearchIndex;
