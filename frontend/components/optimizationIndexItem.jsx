var React = require('react');
var History = require('react-router').History;

var OptimizationIndexItem = React.createClass({
  mixins: [History],

  clickOptimization: function () {
    this.history.push('optimizations/' + this.props.optimization.id);
  },

  editOptimization: function () {
    this.history.push('optimizations/form/edit/' + this.props.optimization.id);
  },

  render: function () {
    return (
      <li className="whiteButton optimizationIndexItem">
        <p onClick={this.clickOptimization}>
          {this.props.optimization.title}
        </p>
        <br />
        <button onClick={this.editOptimization}>Edit Optimization</button>
      </li>
    );
  },
});

module.exports = OptimizationIndexItem;
