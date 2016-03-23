var React = require('react');
var History = require('react-router').History;
var OptimizationIndex = require('./optimizationIndex');
var AuthStore = require('../stores/authStore');

var SearchIndex = React.createClass({
  mixins: [History],

  getInitialState: function () {
    var searchParams = {};
    searchParams.title = '';
    searchParams.category = 'all';

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

  clickCategory: function (category) {
    this.state.searchParams.category = category;
    this.setState(this.state.searchParams);
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
    // <div className="search-options scoot">
    //   <label>sort by</label>
    //   <div>newest</div>
    //   <ul className="dropdown-options">
    //     <li className="dropdown-option">newest</li>
    //     <li className="dropdown-option">oldest</li>
    //   </ul>
    // </div>
    return (
      <div>
        <div className="search-index-fixed">
          <input type="text" className='search-input' placeholder='search by title' onChange={this.handleInput} value={this.state.searchParams.title} />
          <div className="search-options-container">
              <div className="search-options">
                <label>category</label>
                <div>{this.state.searchParams.category}</div>
                <ul className="dropdown-options col-2">
                  <li className="dropdown-option" onClick={this.clickCategory.bind(this, 'exercise')} >exercise</li>
                  <li className="dropdown-option" onClick={this.clickCategory.bind(this, 'food')}>food</li>
                  <li className="dropdown-option" onClick={this.clickCategory.bind(this, 'household')}>household</li>
                  <li className="dropdown-option" onClick={this.clickCategory.bind(this, 'sleep')}>sleep</li>
                  <li className="dropdown-option" onClick={this.clickCategory.bind(this, 'social')}>social</li>
                  <li className="dropdown-option" onClick={this.clickCategory.bind(this, 'tech')}>tech</li>
                  <li className="dropdown-option" onClick={this.clickCategory.bind(this, 'transport')}>transport</li>
                  <li className="dropdown-option" onClick={this.clickCategory.bind(this, 'other')}>other</li>
                  <li className="dropdown-option" onClick={this.clickCategory.bind(this, 'all')}>all</li>
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
