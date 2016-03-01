var React = require('react');
var OptimizationStore = require('../stores/optimizations');
var OptimizationActions = require('../actions/optimizationActions');
var ReactHighcharts = require('react-highcharts/bundle/ReactHighcharts');

var OptimizationDetail = React.createClass({
  createChartOptions: function () {
    var config = {
      chart: {
        type: 'scatter',
        style: {
          fontFamily: 'sans-serif',
        },
      },

      tooltip: {
        backgroundColor: '#3DD0AC',
        style: {
          color: '#fff',
        },
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
        dateTimeLabelFormats: {
          day: '%e',
        },

      },

      yAxis: {
        title: {
          text: 'time saved (milliseconds)',
        },
      },

      series: [{
        name: 'theoretical',
        step: true,
        color: '#3DD0AC',
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

    var msAdded = 0;
    var timeSaved = 0;
    while (msAdded < 7.884 * Math.pow(10, 9)) {
      msAdded += frequency;
      newDate = new Date(startDate.getTime() + msAdded);
      timeSaved += timeSavedperOccurrence;
      data.push([newDate.valueOf(), timeSaved]);
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
