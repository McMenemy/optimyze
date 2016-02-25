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
        <button className="optimization-item-title-button" onClick={this.clickOptimization}><p>{this.props.optimization.title}</p></button>
        <button className="optimization-item-edit-button" onClick={this.editOptimization}><p>Edit</p></button>
      </li>
    );
  },
});

module.exports = OptimizationIndexItem;
