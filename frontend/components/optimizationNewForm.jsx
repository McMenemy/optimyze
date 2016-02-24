var React = require('react');
var OptimizationActions = require('../actions/optimizationActions');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var History = require('react-router').History;

var OptimizationNewForm = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return { };
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var optimization = Object.assign({}, this.state);
    OptimizationActions.retrieveNewOptimization(optimization);
    this.navigateToDashboard();
  },

  navigateToDashboard: function () {
    this.history.push('/');
  },

  handleCancel: function (event) {
    event.preventDefault();
    this.navigateToDashboard();
  },

  render: function () {
    return (
      <div id="optimizationNewForm">
        <h3>Create an Optimization</h3>
        <form onSubmit={this.handleSubmit}>
          <label>Title:
            <input type="text" valueLink={this.linkState('title')} />
          </label>
          <br />
          <label>Description:
            <input type="text" valueLink={this.linkState('description')} />
          </label>
          <br />
          <label>Investment Time:
            <input type="text" valueLink={this.linkState('investment_time')} />
          </label>
          <br />
          <label>Time Save per Occurrence:
            <input type="text" valueLink={this.linkState('time_saved_per_occurrence')} />
          </label>
          <br />
          <label>Frequency:
            <input type="text" valueLink={this.linkState('frequency')} />
          </label>
          <br />
          <label>Public:
            <input type="text" valueLink={this.linkState('public')} />
          </label>
          <br />
          <input type="submit" value="creat optimization"/>
        </form>
        <button onClick={this.handleCancel}>Cancel</button>
      </div>
    );
  },

});

module.exports = OptimizationNewForm;
