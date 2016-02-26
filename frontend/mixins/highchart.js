var ChartMixin = {
  options: function () {
    var options = {
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

    return options;
  },
};
