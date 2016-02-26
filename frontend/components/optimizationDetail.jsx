var React = require('react');
var OptimizationStore = require('../stores/optimizations');
var OptimizationActions = require('../actions/optimizationActions');
var HighChart = require('./highchart');
var options = {
  chart: {
    type: 'scatter',
  },
  plotOptions:{
    scatter:{
      lineWidth:2,
    },
  },
  title: {
    text: 'Hardcoded Optimizaiton Data',
  },
  xAxis: {
    type: 'datetime',
  },
  yAxis: {
    title: {
      text: 'time saved',
    },
  },
  series: [{
    name: 'theoretical',
    step: true,
    data: [
      [Date.UTC(2012, 2, 6, 10), 5],
      [Date.UTC(2012, 2, 7, 10), 6],
      [Date.UTC(2012, 2, 8, 10), 7],
      [Date.UTC(2012, 2, 9, 10), 8],
    ],

  }, {
    name: 'actual',
    step: true,
    data: [
      [Date.UTC(2012, 2, 6, 10), 5],
      [Date.UTC(2012, 2, 7, 10), 5],
      [Date.UTC(2012, 2, 9, 10), 6],
    ],
  },
  ],
};

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
    chartElement = React.createElement(HighChart, { container: 'chart', options: options });

    if (this.state.optimization === undefined) { return <div></div>; }

    return (
      <div id='optimizationDetail'>
        {chartElement}
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
