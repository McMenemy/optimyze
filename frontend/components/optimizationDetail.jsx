var React = require('react');
var OptimizationStore = require('../stores/optimizations');
var OptimizationActions = require('../actions/optimizationActions');
var ReactHighcharts = require('react-highcharts/bundle/ReactHighcharts');

var OptimizationDetail = React.createClass({
  createChartOptions: function () {
    var config = {
      chart: {
        type: 'scatter',
      },
      credits: {
        enabled: false,
      },
      plotOptions:{
        scatter:{
          lineWidth:2,
        },
      },
      title: {
        text: this.state.optimization.title,
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
        data: this.createTheoreticalSeriesData(),

      },
      ],
    };

    return config;
  },

  createTheoreticalSeriesData: function () {
    var startDate = new Date;
    var data = [];
    var timeInvested = this.state.optimization.investment_time;
    var frequency = this.state.optimization.frequency;
    var timeSavedperOccurrence = this.state.optimization.time_saved_per_occurrence;

    data.push[startDate, timeInvested * -1];

    var daysAdded = 0;
    var timeSaved = 0;
    while (daysAdded < 365) {
      daysAdded += frequency;
      newDate = startDate.setDate(startDate.getDate() + daysAdded);
      timeSaved += timeSavedperOccurrence;
      data.push([startDate, timeSaved]);
    }

    return data;
  },

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
    this.setState({optimization: OptimizationStore.find(newProps.params.optimizationId)});
  },

  componentDidMount: function () {
    this.optimizationListener = OptimizationStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.optimizationListener.remove();
    console.log('unmounted');
  },

  render: function () {
    if (this.state.optimization === undefined) { return <div></div>; }

    return (
      <div id='optimizationDetail'>
        <ReactHighcharts className="chart" config={this.createChartOptions()} />
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
