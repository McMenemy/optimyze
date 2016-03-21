var React = require('react');
var OptimizationStore = require('../stores/optimizations');
var OptimizationActions = require('../actions/optimizationActions');
var ReactHighcharts = require('react-highcharts/bundle/ReactHighcharts');

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
          text: 'time saved (milliseconds)',
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
    var timeInvested = Math.round(this.state.optimization.investment_time);
    var frequency = Math.round(this.state.optimization.frequency);
    var timeSavedperOccurrence = Math.round(this.state.optimization.time_saved_per_occurrence);

    startDate = new Date(startDate.getTime());
    data.push([Date.now(), timeInvested * -1]);

    var msAdded = 0;
    var timeSaved = timeInvested * -1;
    while (msAdded < this.state.graph.unit) {
      msAdded += frequency;
      newDate = new Date(startDate.getTime() + msAdded);
      timeSaved += timeSavedperOccurrence;
      data.push([newDate.valueOf(), timeSaved]);
    }

    return data;
  },

  getStateFromStore: function () {
    return { optimization: OptimizationStore.find(this.props.params.optimizationId),
      graph: { unit: 7.884 * Math.pow(10, 9) }, };
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
        <div className='optimization-info'>
          <p>title: {this.state.optimization.title}</p>
          <p>description: {this.state.optimization.description}</p>
          <p>frequency: {this.state.optimization.frequency}</p>
          <p>investment time: {this.state.optimization.investment_time}</p>
          <p>time saved per occurence: {this.state.optimization.time_saved_per_occurrence}</p>
          <p>categories: {this.state.optimization.categories}</p>
        </div>
      </div>
    );
  },
});

module.exports = OptimizationDetail;
