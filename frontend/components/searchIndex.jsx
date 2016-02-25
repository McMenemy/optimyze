var React = require('react');
var OptimizationIndex = require('./optimizationIndex');

var SearchIndex = React.createClass({
  render: function () {
    return (
      <div id="searchIndex">
        <OptimizationIndex />
      </div>
    );
  },
});

module.exports = SearchIndex;
