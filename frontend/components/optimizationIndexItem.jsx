var React = require('react');
var History = require('react-router').History;
var OptimizationActions = require('../actions/optimizationActions');

// Style
var MenuItem = require('material-ui/lib/menus/menu-item');
var Style = require('../util/styleObj');

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

  render: function () {
    return (
      <MenuItem
        primaryText={this.props.optimization.title}
        onClick={this.clickOptimization}
      />
    );
  },
});

module.exports = OptimizationIndexItem;
