var React = require('react');
var OptimizationStore = require('../stores/optimizationStore');
var OptimizationActions = require('../actions/optimizationActions');
var OptimizationIndexItem = require('./optimizationIndexItem');
var RightHeader = require('./rightHeader');
var AuthStore = require('../stores/authStore');
var History = require('react-router').History;

// Style
var Style = require('../util/styleObj');
var Menu = require('material-ui/lib/menus/menu');
var Paper = require('material-ui/lib/menus/menu');

var OptimizationsIndex = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { optimizations: OptimizationStore.all() };
  },

  _onChange: function () {
    this.setState(
      { optimizations: OptimizationStore.all() }
    );
  },

  componentDidMount: function () {
    this.optimizationToken = OptimizationStore.addListener(this._onChange);
    OptimizationActions.retrieveFilteredOptimizations(OptimizationStore.allSearchParams());
  },

  componentWillUnmount: function () {
    this.optimizationToken.remove();
  },

  createOptimizationList: function () {
    var listOfOptimizations = this.state.optimizations.reverse().map(function (el, idx) {
      return (
        <OptimizationIndexItem
          key={idx}
          optimization={el}
          isUserOnly={OptimizationStore.allSearchParams().isUserOnly}
        />
      );
    });

    return listOfOptimizations;
  },

  render: function () {
    return (
      <div style={{ width:'100%' }}>
        <RightHeader />
        <div style={Style.mainMenu}>
          {this.createOptimizationList()}
        </div>
      </div>
    );
  },

});

module.exports = OptimizationsIndex;
