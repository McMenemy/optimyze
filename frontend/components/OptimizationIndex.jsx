var React = require('react');
var OptimizationStore = require('../stores/optimizations');
var OptimizationActions = require('../actions/optimizationActions');

var OptimizationsIndex = React.createClass({
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
        <li key={idx}>{el.title}</li>
      );
    });

    return listOfOptimizations;
  },

  render: function () {
    return (
      <ul id="optimizationsIndex"><p>I'm in OptimizationsIndex</p>
        {this.createOptimizationList()}
      </ul>
    );
  },

});

module.exports = OptimizationsIndex;
