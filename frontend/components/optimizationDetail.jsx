var React = require('react');
var OptimizationStore = require('../stores/optimizations');
var OptimizationActions = require('../actions/optimizationActions');
var ReactHighcharts = require('react-highcharts/bundle/ReactHighcharts');
var TimeFormat = require('../util/timeFormat');

var OptimizationDetail = React.createClass({
  createChartOptions: function () {
    var config = {
      chart: {
        type: 'area',
        style: {
          fontFamily: 'sans-serif',
        },
      },

      tooltip: {
        backgroundColor: '#3DD0AC',
        borderRadius: 0,
        shadow: false,
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

      subtitle: {
        text: 'estimated time saved from this optimization',
      },

      legend: {
        enabled: false,
      },

      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          day: '%e',
        },

      },

      yAxis: {
        title: {
          text: 'time saved (minutes)',
        },
      },

      series: [{
        name: 'theoretical',
        step: true,
        color: '#3DD0AC',
        negativeColor: '#ff4d4d',
        data: this.createTheoreticalSeriesData(),

      },
      ],
    };

    return config;
  },

  createTheoreticalSeriesData: function () {
    var startDate = new Date;
    var data = [];
    var timeUnit = TimeFormat.calcTimeUnit(this.state.optimization.time_saved_per_occurrence);
    var timeInvested = TimeFormat.milliSecToMin(this.state.optimization.investment_time);
    var frequency = TimeFormat.milliSecToMin(this.state.optimization.frequency);
    var timeSavedperOccurrence = TimeFormat.milliSecToMin(this.state.optimization.time_saved_per_occurrence);
    var xMaxValue = TimeFormat.milliSecToMin(7.884 * Math.pow(10, 9));

    startDate = new Date(startDate.getTime());
    data.push([Date.now(), timeInvested * -1]);

    var timeAdded = 0;
    var timeSaved = timeInvested * -1;
    while (timeAdded < xMaxValue) {
      timeAdded += frequency;
      newDate = new Date(startDate.getTime() + TimeFormat.unitToMilliSec(timeAdded, 'minutes'));
      timeSaved += timeSavedperOccurrence;
      data.push([newDate.valueOf(), timeSaved]);
    }

    return data;
  },

  getStateFromStore: function () {
    return { optimization: this.props.optimization };
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
  },

  displayNumericalInfo: function () {
    var investmentTimeFormatted = TimeFormat.milliSecsToAppropriateUnit(
      this.state.optimization.investment_time
    );
    var timeSaverPerOccurenceFormmated = TimeFormat.milliSecsToAppropriateUnit(
      this.state.optimization.time_saved_per_occurrence
    );
    var frequencyFormatted = TimeFormat.everyMilliSecsToTimesPerUnit(
      this.state.optimization.frequency
    );
    return (
      <p><b>invest {investmentTimeFormatted[0]} {investmentTimeFormatted[1]}</b> to <b>
        save {timeSaverPerOccurenceFormmated[0]} {timeSaverPerOccurenceFormmated[1]} {' '}
        {frequencyFormatted[0]} time(s) {frequencyFormatted[1]}</b>
      </p>
    );
  },

  render: function () {
    if (this.state.optimization === undefined) { return <div></div>; }

    return (
      <div className="optimization-detail">
        <ReactHighcharts className="chart" config={this.createChartOptions()} />
        <div className="optimization-info">
          {this.displayNumericalInfo()}
          <p><b>categories</b> {this.state.optimization.categories.join(', ')}</p>
          <p><b>description</b> {this.state.optimization.description}</p>
        </div>
      </div>
    );
  },
});

module.exports = OptimizationDetail;
