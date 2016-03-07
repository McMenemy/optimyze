var React = require('react');
var OptimizationStore = require('../stores/optimizations');
var OptimizationActions = require('../actions/optimizationActions');
var OptimizationIndexItem = require('./optimizationIndexItem');
var AuthStore = require('../stores/authStore');
var History = require('react-router').History;

var OptimizationsIndex = React.createClass({
  mixins: [History],

  getInitialState: function () {
    if (AuthStore.isSignedIn()) {
      return { optimizations: OptimizationStore.allForCurrentUser() };
    } else {
      return { optimizations: OptimizationStore.all() };
    }
  },

  _onChange: function () {
    this.setState({ optimizations: OptimizationStore.allWithSearchParams(this.props.searchParams) });
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({ optimizations: OptimizationStore.allWithSearchParams(newProps.searchParams) });
  },

  componentDidMount: function () {
    this.optimizationToken = OptimizationStore.addListener(this._onChange);
    OptimizationActions.retrieveAllOptimizations();
  },

  componentWillUnmount: function () {
    this.optimizationToken.remove();
  },

  clickNewOptimization: function () {
    if (AuthStore.isSignedIn()) {
      this.history.push('optimizations/form/new');
    } else {
      this.history.push('auth');
    }
  },

  createOptimizationList: function () {
    var _this = this;
    var listOfOptimizations = this.state.optimizations.reverse().map(function (el, idx) {
      return (
        <OptimizationIndexItem isUserOnly={_this.props.searchParams.isUserOnly} key={idx} optimization={el} />
      );
    });

    return listOfOptimizations;
  },

  createNewButton: function () {
    if (this.props.searchParams.isUserOnly) {
      return (
        <li className="optimization-index-item">
          <button className="optimization-item-title-button full" onClick={this.clickNewOptimization}><p>+ create new optimization</p></button>
        </li>
      );
    }
  },

  render: function () {
    return (
      <ul className="optimizations-index group">
        {this.createNewButton()}
        {this.createOptimizationList()}
      </ul>
    );
  },

});

module.exports = OptimizationsIndex;
