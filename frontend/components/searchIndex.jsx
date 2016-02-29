var React = require('react');
var OptimizationIndex = require('./optimizationIndex');

var SearchIndex = React.createClass({
  getInitialState: function () {
    var searchParams = {};

    if (window.currentUser === undefined) {
      searchParams.userOnly = false;
    } else {
      searchParams.userOnly = true;
    }

    searchParams.title = '';

    return { optimizations: OptimizationStore.all(),
             searchParams: searchParams, };
  },

  handleInput: function (e) {
    e.preventDefault();
    this.state.searchParams.title = e.currentTarget.value;
    this.setState(this.state.searchParams);
  },

  clickBrowseAllOptimizations: function () {
    this.state.searchParams.userOnly = !this.state.searchParams.userOnly;
    this.setState(this.state.searchParams);
  },

  setHeadingTitle: function () {
    if (this.state.userOnly) {
      return 'your optimizations';
    } else {
      return 'all optimizations';
    }
  },

  setBrowseButtonTitle: function () {
    if (this.state.userOnly) {
      return 'Browse All Optimizations';
    } else {
      return 'Browse Your Optimizations';
    }
  },

  render: function () {
    return (
      <div id="searchIndex">
        <h2>{this.setHeadingTitle()}</h2>
        <input type="text" className='search-input' onChange={this.handleInput} value={this.state.searchParams.title} />
        <button className="whiteButton" onClick={this.clickBrowseAllOptimizations}>{this.setBrowseButtonTitle()}</button>
        <OptimizationIndex searchParams={this.state.searchParams}/>
      </div>
    );
  },
});

module.exports = SearchIndex;
