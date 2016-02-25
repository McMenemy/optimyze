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
    this.setState({ optimizations: OptimizationStore.all() });
  },

  componentDidMount: function () {
    this.optimizationToken = OptimizationStore.addListener(this._onChange);
    OptimizationActions.retrieveAllPublicOptimizations();
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
        <h2>your optimizations</h2>
        <button id="newOptimizationButton" onClick={this.clickNewOptimization}>Create New Optimization</button>
        {this.createOptimizationList()}
      </ul>
    );
  },

});

module.exports = OptimizationsIndex;
