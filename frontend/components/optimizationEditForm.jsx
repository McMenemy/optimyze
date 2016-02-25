var React = require('react');
var OptimizationActions = require('../actions/optimizationActions');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var History = require('react-router').History;

var OptimizationEditForm = React.createClass({
  mixins: [LinkedStateMixin, History],

  getStateFromStore: function () {
    return OptimizationStore.find(this.props.params.optimizationId);
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentWillReceiveProps: function (newProps) {
    this.setState(this.getStateFromStore());
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var patchParams = { optimization: this.state };
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
    if (this.state.id === undefined) { return <div></div>; }

    return (
      <div id="optimizationEditForm">
        <h3>Edit an Optimization</h3>
        <form className='optimizationForm' onSubmit={this.handleSubmit}>
          <div className="formGroup">
            <label>title</label>
            <input type="text" valueLink={this.linkState('title')} />
          </div>
          <div className="formGroup">
            <label>description</label>
            <input type="text" valueLink={this.linkState('description')} />
          </div>
          <div className="formGroup">
            <label>setup time</label>
            <input type="number" valueLink={this.linkState('investment_time')} />
          </div>
          <div className="formGroup">
            <label>time saved per occurrence</label>
            <input type="number" valueLink={this.linkState('time_saved_per_occurrence')} />
          </div>
          <div className="formGroup">
            <label>frequency</label>
            <input type="number" valueLink={this.linkState('frequency')} />
          </div>
          <div className="formGroup">
            <label>public</label>
            <input type="text" valueLink={this.linkState('public')} />
          </div>
          <input type="submit" className="whiteButton green-button-overlay" value="update optimization"/>
        </form>
        <button className="whiteButton green-button-overlay" onClick={this.handleCancel}>Cancel</button>
      </div>
    );
  },

});

module.exports = OptimizationEditForm;
