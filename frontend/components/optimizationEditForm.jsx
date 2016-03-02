var React = require('react');
var OptimizationActions = require('../actions/optimizationActions');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var History = require('react-router').History;

var OptimizationEditForm = React.createClass({
  mixins: [LinkedStateMixin, History],

  formatTime: function (milliseconds) {
    var time;
    if (milliseconds < 1000) {
      time = milliseconds;
      return [time, 'milliseconds'];
    } else if (milliseconds < 1000 * 60) {
      time = milliseconds * 1000;
      return [time, 'seconds'];
    } else if (milliseconds < 1000 * 60 * 60) {
      time = milliseconds * 1000 * 60;
      return [time, 'minutes'];
    } else {
      time = milliseconds * 1000 * 60 * 60;
      return [time, 'hours'];
    }
  },

  formatFrequency: function (milliseconds) {
    var frequency;
    if (milliseconds <= 1000 * 60 * 60) {
      frequency = 1000 * 60 * 60 / milliseconds;
      return [frequency, 'per hour'];
    } else if (milliseconds <= 1000 * 60 * 60 * 24) {
      frequency = 1000 * 60 * 60 * 24 / milliseconds;
      return [frequency, 'per day'];
    } else if (milliseconds <= 10000 * 60 * 60 * 24 * 7) {
      frequency = 1000 * 60 * 60 * 24 * 7 / milliseconds;
      return [frequency, 'per week'];
    } else if (milliseconds <= 10000 * 60 * 60 * 24 * 7 * 30.4167) {
      frequency = 10000 * 60 * 60 * 24 * 7 * 30.4167 / milliseconds;
      return [frequency, 'per month'];
    } else {
      frequency = 10000 * 60 * 60 * 24 * 7 * 30.4167 * 365;
      return [frequency, 'per year'];
    }
  },

  formatOptimization: function (optimization) {
    frequencyFormatted = this.formatFrequency(optimization.frequency);
    investmentTimeFormatted = this.formatTime(optimization.investment_time);
    timeSavedPerOccurrenceFormatted = this.formatTime(optimization.time_saved_per_occurrence);

    optimization.frequency = frequencyFormatted[0];
    optimization.frequency_unit = frequencyFormatted[1];
    optimization.investment_time = investmentTimeFormatted[0];
    optimization.investmet_time_unit = investmentTimeFormatted[1];
    optimization.time_saved_per_occurrence = timeSavedPerOccurrenceFormatted[0];
    optimization.time_saved_per_occurrence_unit = timeSavedPerOccurrenceFormatted[1];

    debugger;
    return optimization;
  },

  getStateFromStore: function () {
    return OptimizationStore.find(this.formatOptimization(this.props.params.optimizationId));
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
      <div id="optimization-form-container">
        <h2>Edit an Optimization</h2>
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
            <input type="number" className="has-time-selector" valueLink={this.linkState('investment_time')} />
            <select defaultValue="minutes" valueLink={this.linkState('investment_time_unit')} name="time-unit">
              <option value="milliseconds">milliseconds</option>
              <option value="seconds">seconds</option>
              <option value="minutes">minutes</option>
              <option value="hours">hours</option>
            </select>
          </div>
          <div className="formGroup">
            <label>time saved per occurrence</label>
            <input type="number" className="has-time-selector" valueLink={this.linkState('time_saved_per_occurrence')} />
            <select defaultValue="minutes" valueLink={this.linkState('time_saved_per_occurrence_unit')} name="time-unit">
              <option value="milliseconds">milliseconds</option>
              <option value="seconds">seconds</option>
              <option value="minutes">minutes</option>
              <option value="hours">hours</option>
            </select>
          </div>
          <div className="formGroup">
            <label>frequency</label>
            <input type="number" className="has-time-selector" valueLink={this.linkState('frequency')} />
            <select defaultValue="per week" valueLink={this.linkState('frequency_unit')} name="time-unit">
              <option value="per hour">times per hour</option>
              <option value="per day">times per day</option>
              <option value="per week">times per week</option>
              <option value="per month">times per month</option>
              <option value="per year">times per year</option>
            </select>
          </div>
          <input type="submit" className="whiteButton green-button-overlay" value="update optimization"/>
        </form>
        <button className="whiteButton green-button-overlay" onClick={this.handleCancel}>cancel</button>
      </div>
    );
  },

});

module.exports = OptimizationEditForm;
