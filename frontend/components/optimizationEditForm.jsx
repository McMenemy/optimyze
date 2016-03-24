var React = require('react');
var OptimizationActions = require('../actions/optimizationActions');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var History = require('react-router').History;
var TimeFormat = require('../util/timeFormat');

var OptimizationEditForm = React.createClass({
  mixins: [LinkedStateMixin, History],

  formatOptimization: function (optimization) {
    var frequencyFormatted = TimeFormat.everyMilliSecsToTimesPerUnit(optimization.frequency);
    var investmentTimeFormatted = TimeFormat.milliSecsToAppropriateUnit(optimization.investment_time);
    var timeSavedPerOccurrenceFormatted = TimeFormat.milliSecsToAppropriateUnit(
      optimization.time_saved_per_occurrence
    );

    optimization.frequency = frequencyFormatted[0];
    optimization.frequency_unit = frequencyFormatted[1];
    optimization.investment_time = investmentTimeFormatted[0];
    optimization.investment_time_unit = investmentTimeFormatted[1];
    optimization.time_saved_per_occurrence = timeSavedPerOccurrenceFormatted[0];
    optimization.time_saved_per_occurrence_unit = timeSavedPerOccurrenceFormatted[1];
    return optimization;
  },

  getStateFromStore: function (id) {
    // make a clone so that original object is not modified
    var optimization = JSON.parse(JSON.stringify(OptimizationStore.find(id)));
    var initialState = this.formatOptimization(optimization);
    initialState.errors = [];
    return initialState;
  },

  getInitialState: function () {
    return this.getStateFromStore(this.props.params.optimizationId);
  },

  componentWillReceiveProps: function (newProps) {
    this.setState(this.getStateFromStore(newProps.params.optimizationId));
  },

  proccessParams: function (patchParams) {
    var proccessedParams = { optimization: {} };
    proccessedParams.optimization.description = patchParams.optimization.description;
    proccessedParams.optimization.title = patchParams.optimization.title;
    proccessedParams.optimization.frequency = TimeFormat.timesPerUnitToEveryMilliSec(
      patchParams.optimization.frequency, patchParams.optimization.frequency_unit
    );
    proccessedParams.optimization.time_saved_per_occurrence = TimeFormat.unitToMilliSec(
      patchParams.optimization.time_saved_per_occurrence, patchParams.optimization.time_saved_per_occurrence_unit
    );
    proccessedParams.optimization.investment_time = TimeFormat.unitToMilliSec(
      patchParams.optimization.investment_time, patchParams.optimization.investment_time_unit
    );
    proccessedParams.optimization.user_id = patchParams.optimization.user_id;
    proccessedParams.optimization.id = patchParams.optimization.id;

    return proccessedParams;
  },

  navigateToDashboard: function () {
    this.history.push('/');
  },

  successCallback: function (updatedOptimization) {
    this.history.push('/optimizations/' + updatedOptimization.id);
  },

  errorCallback: function (errorArray) {
    this.state.errors = JSON.parse(errorArray);
    this.setState(this.state);
  },

  handleFormSubmit: function (event) {
    event.preventDefault();
    var patchParams = { optimization: this.state };
    OptimizationActions.retrieveUpdatedOptimization(
      this.proccessParams(patchParams), this.errorCallback, this.successCallback
    );
  },

  handleCancel: function (event) {
    event.preventDefault();
    this.navigateToDashboard();
  },

  render: function () {
    return (
      <div className="optimization-form-container">
        <h2>Edit an Optimization</h2>
        <h1>{this.state.errors.toString()}</h1>
        <form className='optimizationForm' onSubmit={this.handleFormSubmit}>
          <div className="formGroup">
            <label>title</label>
            <input type="text" valueLink={this.linkState('title')} />
          </div>
          <div className="formGroup">
            <label>description</label>
            <input type="text" valueLink={this.linkState('description')} />
          </div>
          <div className="formGroup">
            <label>investment time</label>
            <input
              type="number"
              className="has-time-selector"
              valueLink={this.linkState('investment_time')}
            />
            <select
              defaultValue={this.state.investment_time_unit}
              valueLink={this.linkState('investment_time_unit')}
              name="time-unit"
            >
              <option value="milliseconds">milliseconds</option>
              <option value="seconds">seconds</option>
              <option value="minutes">minutes</option>
              <option value="hours">hours</option>
            </select>
          </div>
          <div className="formGroup">
            <label>time saved per occurrence</label>
            <input
              type="number"
              className="has-time-selector"
              valueLink={this.linkState('time_saved_per_occurrence')}
            />
            <select
              defaultValue={this.state.time_saved_per_occurrence_unit}
              valueLink={this.linkState('time_saved_per_occurrence_unit')}
              name="time-unit"
            >
              <option value="milliseconds">milliseconds</option>
              <option value="seconds">seconds</option>
              <option value="minutes">minutes</option>
              <option value="hours">hours</option>
            </select>
          </div>
          <div className="formGroup">
            <label>frequency</label>
            <input
              type="number"
              className="has-time-selector"
              valueLink={this.linkState('frequency')}
            />
            <select
              defaultValue={this.state.frequency_unit}
              valueLink={this.linkState('frequency_unit')}
            >
              <option value="per hour">times per hour</option>
              <option value="per day">times per day</option>
              <option value="per week">times per week</option>
              <option value="per month">times per month</option>
              <option value="per year">times per year</option>
            </select>
          </div>
          <input
            type="submit"
            className="whiteButton green-button-overlay"
            value="update optimization"
          />
        </form>
        <button
          className="whiteButton green-button-overlay"
          onClick={this.handleCancel}>cancel</button
        >
      </div>
    );
  },

});

module.exports = OptimizationEditForm;
