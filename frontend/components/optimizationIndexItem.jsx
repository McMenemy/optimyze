var React = require('react');
var History = require('react-router').History;
var OptimizationActions = require('../actions/optimizationActions');

var OptimizationIndexItem = React.createClass({
  mixins: [History],

  clickOptimization: function () {
    this.history.push('optimizations/' + this.props.optimization.id);
  },

  editOptimization: function () {
    this.history.push('optimizations/form/edit/' + this.props.optimization.id);
  },

  deleteOptimization: function () {
    OptimizationActions.retrieveDeletedOptimization(this.props);
  },

  populateItem: function () {
    if (this.props.isUserOnly) {
      return (
        <li className="optimization-index-item">
          <button className="optimization-item-title-button" onClick={this.clickOptimization}><p>{this.props.optimization.title}</p></button>
          <button className="optimization-item-edit-button" onClick={this.editOptimization}><p>Edit</p></button>
          <button className="optimization-item-delete-button" onClick={this.deleteOptimization}><p>Delete</p></button>
        </li>
      );
    } else {
      return (
        <li className="optimization-index-item">
          <button className="optimization-item-title-button" onClick={this.clickOptimization}><p>{this.props.optimization.title}</p></button>
        </li>
      );
    }
  },

  render: function () {
    return (
      <div>
        {this.populateItem()}
      </div>
    );
  },
});

module.exports = OptimizationIndexItem;
