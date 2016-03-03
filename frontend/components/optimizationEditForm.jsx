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
      time = Math.round(milliseconds / 1000);
      return [time, 'seconds'];
    } else if (milliseconds < 1000 * 60 * 60) {
      time = Math.round(milliseconds / 1000 / 60);
      return [time, 'minutes'];
    } else {
      time = Math.round(milliseconds / 1000 / 60 / 60);
      return [time, 'hours'];
    }
  },

  formatFrequency: function (milliseconds) {
    var frequency;
    if (milliseconds <= 60 * 60 * 1000) {
      frequency = Math.round(60 * 60 * 1000 / milliseconds);
      return [frequency, 'per hour'];
    } else if (milliseconds <= 24 * 60 * 60 * 1000) {
      frequency = Math.round(24 * 60 * 60 * 1000 / milliseconds);
      return [frequency, 'per day'];
    } else if (milliseconds <= 7 * 24 * 60 * 60 * 1000) {
      frequency = Math.round(7 * 24 * 60 * 60 * 1000 / milliseconds);
      return [frequency, 'per week'];
    } else if (milliseconds <= 30.4167 * 24 * 60 * 60 * 1000) {
      frequency = Math.round(30.4167 * 24 * 60 * 60 * 1000 / milliseconds);
      return [frequency, 'per month'];
    } else {
      frequency = Math.round(12 * 30.4167 * 24 * 60 * 60 * 1000 / milliseconds);
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
    optimization.investment_time_unit = investmentTimeFormatted[1];
    optimization.time_saved_per_occurrence = timeSavedPerOccurrenceFormatted[0];
    optimization.time_saved_per_occurrence_unit = timeSavedPerOccurrenceFormatted[1];
    return optimization;
  },

  getStateFromStore: function (id) {
    // make a clone so that original object is not modified
    var optimization = JSON.parse(JSON.stringify(OptimizationStore.find(id)));
    return this.formatOptimization(optimization);
  },

  getInitialState: function () {
    return this.getStateFromStore(this.props.params.optimizationId);
  },

  componentWillReceiveProps: function (newProps) {
    this.setState(this.getStateFromStore(newProps.params.optimizationId));
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
            <select defaultValue={this.state.investment_time_unit} valueLink={this.linkState('investment_time_unit')} name="time-unit">
              <option value="milliseconds">milliseconds</option>
              <option value="seconds">seconds</option>
              <option value="minutes">minutes</option>
              <option value="hours">hours</option>
            </select>
          </div>
          <div className="formGroup">
            <label>time saved per occurrence</label>
            <input type="number" className="has-time-selector" valueLink={this.linkState('time_saved_per_occurrence')} />
            <select defaultValue={this.state.time_saved_per_occurrence_unit} valueLink={this.linkState('time_saved_per_occurrence_unit')} name="time-unit">
              <option value="milliseconds">milliseconds</option>
              <option value="seconds">seconds</option>
              <option value="minutes">minutes</option>
              <option value="hours">hours</option>
            </select>
          </div>
          <div className="formGroup">
            <label>frequency</label>
            <input type="number" className="has-time-selector" valueLink={this.linkState('frequency')} />
            <select defaultValue={this.state.frequency_unit} valueLink={this.linkState('frequency_unit')}>
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
