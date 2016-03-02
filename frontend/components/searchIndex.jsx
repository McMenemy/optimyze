var React = require('react');
var OptimizationIndex = require('./optimizationIndex');

var SearchIndex = React.createClass({
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

  clickBrowseAllOptimizations: function () {
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
      return 'Browse All Optimizations';
    } else {
      return 'Browse Your Optimizations';
    }
  },

  render: function () {
    return (
      <div>
        <div className="search-index-fixed">
          <h2>{this.setHeadingTitle()}</h2>
          <input type="text" className='search-input' onChange={this.handleInput} value={this.state.searchParams.title} />
          <button className="whiteButton" onClick={this.clickBrowseAllOptimizations}>{this.setBrowseButtonTitle()}</button>
        </div>
        <div className="search-index">
            <OptimizationIndex searchParams={this.state.searchParams}/>
        </div>
    </div>
    );
  },
});

module.exports = SearchIndex;
