var React = require('react');
var Highcharts = require('highcharts');

module.exports = React.createClass({
  componentDidMount: function () {
    // Extend Highcharts with modules
    if (this.props.modules) {
      this.props.modules.forEach(function (module) {
        module(Highcharts);
      });
    }

    // Set container which the chart should render to.
    Highcharts[this.props.type || 'chart'](
            this.props.container,
            this.props.options
        );
  },

  //Destroy chart before unmount.
  componentWillUnmount: function () {
    this.chart.destroy();
  },

  //Create the div which the chart will be rendered to.
  render: function () {
    return React.createElement('div', { id: this.props.container });
  },
});
