var React = require('react');
var OptimizationIndex = require('./optimizationIndex');

var SearchIndex = React.createClass({
  render: function () {
    return (
      <div id="searchIndex">
        <p>I'm in the search component</p>
        <OptimizationIndex />
      </div>
    );
  },
});

module.exports = SearchIndex;
