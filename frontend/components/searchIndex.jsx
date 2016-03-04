var React = require('react');
var OptimizationIndex = require('./optimizationIndex');
var History = require('react-router').History;

var SearchIndex = React.createClass({
  mixins: [History],

  getInitialState: function () {
    var searchParams = {};
    searchParams.title = '';

    if (window.currentUser) {
      searchParams.userOnly = true;
      return { optimizations: OptimizationStore.allForCurrentUser(),
               searchParams: searchParams, };
    } else {
      searchParams.userOnly = false;
      return { optimizations: OptimizationStore.all(),
               searchParams: searchParams, };
    }

  },

  handleInput: function (e) {
    e.preventDefault();
    this.state.searchParams.title = e.currentTarget.value;
    this.setState(this.state.searchParams);
  },

  clickToggleOptimizations: function () {
    console.log(this.state.searchParams.userOnly);
    this.state.searchParams.userOnly = !this.state.searchParams.userOnly;
    this.setState(this.state.searchParams);
  },

  setHeadingTitle: function () {
    if (this.state.searchParams.userOnly) {
      return 'your optimizations';
    } else {
      return 'all optimizations';
    }
  },

  setBrowseButtonTitle: function () {
    if (this.state.searchParams.userOnly) {
      return 'All Optimizations';
    } else {
      return 'Your Optimizations';
    }
  },

  clickNewOptimization: function () {
    this.history.push('optimizations/form/new');
  },

  render: function () {
    return (
      <div>
        <div className="search-index-fixed">
          <h2>{this.setHeadingTitle()}</h2>
          <input type="text" className='search-input' placeholder='search by title' onChange={this.handleInput} value={this.state.searchParams.title} />
          <button className="whiteButton" onClick={this.clickToggleOptimizations}>{this.setBrowseButtonTitle()}</button>
          <button className="whiteButton" onClick={this.clickNewOptimization}>New Optimization</button>
          <button className="whiteButton" onClick={this.clickNewOptimization}>Category</button>
        </div>
        <div className="search-index">
            <OptimizationIndex searchParams={this.state.searchParams}/>
        </div>
    </div>
    );
  },
});

module.exports = SearchIndex;
