// NB refactor by removing defaultValue from form and changing getStateFromStore function to return just params (don't nest)
var React = require('react');
var OptimizationActions = require('../actions/optimizationActions');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var History = require('react-router').History;

var OptimizationEditForm = React.createClass({
  mixins: [LinkedStateMixin, History],

  getStateFromStore: function () {
    return { optimization: OptimizationStore.find(this.props.params.optimizationId) };
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentWillReceiveProps: function (newProps) {
    this.setState(this.getStateFromStore());
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var patchParams = this.state;
    patchParams.id = this.state.optimization.id;
    delete patchParams.optimization;
    patchParams = { optimization: patchParams };

    OptimizationActions.retrieveUpdatedOptimization(patchParams);
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
    if (this.state.optimization === undefined) { return <div></div>; }

    return (
      <div id="optimizationEditForm">
        <h3>Edit an Optimization</h3>
        <form className='optimizationForm' onSubmit={this.handleSubmit}>
          <label>Title:
            <input type="text" defaultValue={this.state.optimization.title} valueLink={this.linkState('title')} />
          </label>
          <br />
          <label>Description:
            <input type="text" defaultValue={this.state.optimization.description} valueLink={this.linkState('description')} />
          </label>
          <br />
          <label>Investment Time:
            <input type="text" defaultValue={this.state.optimization.investment_time} valueLink={this.linkState('investment_time')} />
          </label>
          <br />
          <label>Time Save per Occurrence:
            <input type="text" defaultValue={this.state.optimization.time_saved_per_occurrence} valueLink={this.linkState('time_saved_per_occurrence')} />
          </label>
          <br />
          <label>Frequency:
            <input type="text" defaultValue={this.state.optimization.frequency} valueLink={this.linkState('frequency')} />
          </label>
          <br />
          <label>Public:
            <input type="text" defaultValue={this.state.optimization.public} valueLink={this.linkState('public')} />
          </label>
          <br />
          <input type="submit" value="update optimization"/>
        </form>
        <button onClick={this.handleCancel}>Cancel</button>
      </div>
    );
  },

});

module.exports = OptimizationEditForm;
