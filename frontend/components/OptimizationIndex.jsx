var React = require('react');
var OptimizationStore = require('../stores/optimizations');
var OptimizationActions = require('../actions/optimizationActions');
var OptimizationIndexItem = require('./optimizationIndexItem');
var History = require('react-router').History;

var OptimizationsIndex = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { optimizations: OptimizationStore.all() };
  },

  _onChange: function () {
    console.log(this.props.searchParams.title);
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

  createOptimizationList: function () {
    var listOfOptimizations = this.state.optimizations.map(function (el, idx) {
      return (
        <OptimizationIndexItem key={idx} optimization={el} />
      );
    });

    return listOfOptimizations;
  },

  clickNewOptimization: function () {
    this.history.push('optimizations/form/new');
  },

  render: function () {
    return (
      <ul id="optimizationsIndex">
        <button className="whiteButton" onClick={this.clickNewOptimization}>Create New Optimization</button>
        {this.createOptimizationList()}
      </ul>
    );
  },

});

module.exports = OptimizationsIndex;
