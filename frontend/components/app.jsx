var React = require('react');
var SearchIndex = require('./searchIndex');
var HighChart = require('./highchart');
var options = {
  chart: {
    type: 'bar',
  },
  title: {
    text: 'Fruit Consumption',
  },
  xAxis: {
    categories: ['Apples', 'Bananas', 'Oranges'],
  },
  yAxis: {
    title: {
      text: 'Fruit eaten',
    },
  },
  series: [{
    name: 'Jane',
    data: [1, 0, 4],
  }, {
    name: 'John',
    data: [5, 7, 3],
  },
  ],
};

var App = React.createClass({
  render: function () {
    chartElement = React.createElement(HighChart, { container: 'chart', options: options });

    return (
      <div id="app">
        <div className="left-pane">
          <SearchIndex />
        </div>
        <div className="right-pane">
          {this.props.children}
          {chartElement}
        </div>
      </div>
    );
  },
});

module.exports = App;
