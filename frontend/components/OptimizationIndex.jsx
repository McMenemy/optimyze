var React = require('react');
var OptimizationStore = require('../stores/optimizations');
var OptimizationActions = require('../actions/optimizationActions');
var OptimizationIndexItem = require('./optimizationIndexItem');

var OptimizationsIndex = React.createClass({

  getInitialState: function () {
    if (window.currentUser) {
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

  createOptimizationList: function () {
    var listOfOptimizations = this.state.optimizations.reverse().map(function (el, idx) {
      return (
        <OptimizationIndexItem key={idx} optimization={el} />
      );
    });

    return listOfOptimizations;
  },

  render: function () {
    return (
      <ul className="optimizations-index group">
        {this.createOptimizationList()}
      </ul>
    );
  },

});

module.exports = OptimizationsIndex;
