var React = require('react');
var OptimizationStore = require('../stores/optimizations');
var OptimizationActions = require('../actions/optimizationActions');

var OptimizationDetail = React.createClass({
  getStateFromStore: function () {
    return { optimization: OptimizationStore.find(this.props.params.optimizationId) };
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentWillReceiveProps: function (newProps) {
    this.setState(this.getStateFromStore());
  },

  componentDidMount: function () {
    this.optimizationListener = OptimizationStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.optimizationListener.remove();
  },

  render: function () {
    if (this.state.optimization === undefined) { return <div></div>; }

    return (
      <div id='optimizationDetail'>
        <div>
          title: {this.state.optimization.title}
          <br />
          description: {this.state.optimization.description}
          <br />
          frequency: {this.state.optimization.frequency}
          <br />
          investment time: {this.state.optimization.investment_time}
          <br />
          time saved per occurence: {this.state.optimization.time_saved_per_occurrence}
        </div>
      </div>
    );
  },
});

module.exports = OptimizationDetail;
