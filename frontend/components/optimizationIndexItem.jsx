var React = require('react');
var History = require('react-router').History;
var OptimizationActions = require('../actions/optimizationActions');

// Style
var Style = require('../util/styleObj');
var Dialog = require('material-ui/lib/dialog');
var MenuItem = require('material-ui/lib/menus/menu-item');
var Divider = require('material-ui/lib/divider');
var Dialog = require('material-ui/lib/dialog');

// components
var OptimizationDetail = require('./optimizationDetail');

var OptimizationIndexItem = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { open: false, shouldCutoff: true };
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

  handleDetailOpen: function () {
    this.setState({ open: true });
  },

  handleDetailClose: function () {
    this.setState({ open: false });
  },

  render: function () {
    return (
      <div onClick={this.handleDetailOpen}>
        <p style={Style.mainMenuTitle} className='mainMenuTitle'>{this.props.optimization.title}</p>
        {this.makeDescription()}
        <Divider />

        <Dialog
          actions={<OptimizationDetail
            closeModal={this.handleDetailClose}
            optimization={this.props.optimization}
          />}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleDetailClose}
        />
      </div>
    );
  },
});

module.exports = OptimizationIndexItem;
