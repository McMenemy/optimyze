var React = require('react');
var History = require('react-router').History;
var OptimizationIndex = require('./optimizationIndex');
var AuthStore = require('../stores/authStore');

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
          <div className="search-options-container">
              <div className="search-options scoot">
                <label>sort by</label>
                <div>upvotes</div>
                <ul className="dropdown-options">
                  <li className="dropdown-option">newest</li>
                  <li className="dropdown-option">oldest</li>
                </ul>
              </div>
              <div className="search-options">
                <label>category</label>
                <div>all</div>
                <ul className="dropdown-options col-2">
                  <li className="dropdown-option">sleep</li>
                  <li className="dropdown-option">tech</li>
                  <li className="dropdown-option">exercise</li>
                </ul>
              </div>
            </div>
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
