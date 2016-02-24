var React = require('react');
var History = require('react-router').History;

var OptimizationIndexItem = React.createClass({
  mixins: [History],

  clickOptimization: function () {
    this.history.push('optimizations/' + this.props.optimization.id);
  },

  render: function () {
    return (
      <li className="optimizationIndexItem" onClick={this.clickOptimization}>
        {this.props.optimization.title}
      </li>
    );
  },
});

module.exports = OptimizationIndexItem;
