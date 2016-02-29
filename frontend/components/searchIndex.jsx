var React = require('react');
var OptimizationIndex = require('./optimizationIndex');
var SearchParamActions = require('../actions/searchParamActions');

var SearchIndex = React.createClass({
  getInitialState: function () {
    return { searchParams: { title: '' } };
  },

  handleInput: function (e) {
    e.preventDefault();
    this.setState({ searchParams: { title: e.currentTarget.value } });
    SearchParamActions.receiveSearchParams(this.state.searchParams);
  },

  render: function () {
    return (
      <div id="searchIndex">
        <input type="text" onChange={this.handleInput} value={this.state.searchParams.title} />
        <OptimizationIndex />
      </div>
    );
  },
});

module.exports = SearchIndex;
