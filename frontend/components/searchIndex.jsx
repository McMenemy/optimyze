var React = require('react');
var OptimizationIndex = require('./optimizationIndex');
var AuthStore = require('../stores/authStore');
var History = require('react-router').History;

var SearchIndex = React.createClass({
  mixins: [History],

  getInitialState: function () {
    var searchParams = {};
    searchParams.title = '';

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

  clickNewOptimization: function () {
    if (AuthStore.isSignedIn()) {
      this.history.push('optimizations/form/new');
    } else {
      this.history.push('auth');
    }
  },

  renderTabs: function () {
    if (this.state.searchParams.isUserOnly) {
      return (
        <div className="tab-container">
        <button className="tab-selected" onClick={this.clickToggleOptimizations}>My Optimizations</button>
        <button className="tab" onClick={this.clickToggleOptimizations}>All Optimizations</button>
      </div>
    );
    } else {
      return (
      <div className="tab-container">
        <button className="tab" onClick={this.clickToggleOptimizations}>My Optimizations</button>
        <button className="tab-selected" onClick={this.clickToggleOptimizations}>All Optimizations</button>
      </div>
    );
    }
  },

  render: function () {
    return (
      <div>
        <div className="search-index-fixed">
          <input type="text" className='search-input' placeholder='search by title' onChange={this.handleInput} value={this.state.searchParams.title} />
          <button className="whiteButton" onClick={this.clickNewOptimization}>New Optimization</button>
          <button className="whiteButton" onClick={this.clickNewOptimization}>Category (not implemented)</button>
          {this.renderTabs()}
        </div>
        <div className="search-index">
            <OptimizationIndex searchParams={this.state.searchParams}/>
        </div>
    </div>
    );
  },
});

module.exports = SearchIndex;
