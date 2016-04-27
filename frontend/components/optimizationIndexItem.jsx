var React = require('react');
var History = require('react-router').History;
var OptimizationActions = require('../actions/optimizationActions');

// Style
var MenuItem = require('material-ui/lib/menus/menu-item');
var Style = require('../util/styleObj');
var Divider = require('material-ui/lib/divider');

var OptimizationIndexItem = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { shouldCutoff: true };
  },

  clickOptimization: function () {
    this.history.push('optimizations/' + this.props.optimization.id);
  },

  editOptimization: function () {
    this.history.push('optimizations/form/edit/' + this.props.optimization.id);
  },

  deleteOptimization: function () {
    OptimizationActions.retrieveDeletedOptimization(this.props);
  },

  expandDescription: function () {
    this.setState({ shouldCutoff: false });
  },

  makeDescription: function () {
    var description = this.props.optimization.description;
    var cuttoff = 330;
    if (this.state.shouldCutoff && description.length > cuttoff) {
      return (
        <p style={Style.mainMenuDescription}>
          {description.slice(0, cuttoff) + '... '}
          <a className='moreLink' onTouchTap={this.expandDescription}>(more)</a>
        </p>
      );
    } else {
      return (
        <p style={Style.mainMenuDescription}>{description}</p>
      );
    }
  },

  render: function () {
    return (
      <div onClick={this.clickOptimization}>
        <p style={Style.mainMenuTitle} className='mainMenuTitle'>{this.props.optimization.title}</p>
        {this.makeDescription()}
        <Divider />
      </div>
    );
  },
});

module.exports = OptimizationIndexItem;
