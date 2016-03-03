var React = require('react');
var OptimizationActions = require('../actions/optimizationActions');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var History = require('react-router').History;

var OptimizationNewForm = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return { errors: []};
  },

  // converts time to milliseconds
  timeConvert: function (time, unit) {
    if (unit === 'milliseconds') {
      return time;
    } else if (unit === 'seconds') {
      return time * 1000;
    } else if (unit === 'minutes') {
      return time * 60 * 1000;
    } else if (unit === 'hours') {
      return time * 60 * 60 * 1000;
    }
  },

  // converts to every blank millisconds
  frequencyConvert: function (frequency, unit) {
    if (unit === 'per hour') {
      return Math.round(60 * 60 * 1000 / frequency);
    } else if (unit === 'per day') {
      return Math.round(24 * 60 * 60 * 1000 / frequency);
    } else if (unit === 'per week') {
      return Math.round(7 * 24 * 60 * 60 * 1000 / frequency);
    } else if (unit === 'per month') {
      return Math.round(30.4167 * 24 * 60 * 60 * 1000 / frequency);
    } else if (unit === 'per year') {
      return Math.round(12 * 30.4167 * 24 * 60 * 60 * 1000 / frequency);
    }
  },

  proccessParams: function (params) {
    if (typeof params.optimization.frequency === 'undefined' || typeof params.optimization.time_saved_per_occurrence === 'undefined' || typeof params.optimization.investment_time === 'undefined') {
      params.optimization.makeSureNotEmpty = '';
      return params;
    }

    var postParams = { optimization: {status: 'not good'} };


    var frequencyUnit = params.optimization.frequency_unit;
    if (typeof frequencyUnit === 'undefined') {
      frequencyUnit = 'per week';
    }

    var investmentTimeUnit = params.optimization.investment_time_unit;
    if (typeof investmentTimeUnit === 'undefined') {
      investmentTimeUnit = 'minutes';
    }

    var timeSavedPerOccurrenceUnit = params.optimization.time_saved_per_occurrence_unit;
    if (typeof timeSavedPerOccurrenceUnit === 'undefined') {
      timeSavedPerOccurrenceUnit = 'minutes';
    }

    postParams.optimization.title = params.optimization.title;
    postParams.optimization.description = params.optimization.description;

    var frequency = params.optimization.frequency;
    postParams.optimization.frequency = this.frequencyConvert(frequency, frequencyUnit);

    var investmentTime = params.optimization.investment_time;
    postParams.optimization.investment_time = this.timeConvert(investmentTime, investmentTimeUnit);

    var timeSavedPerOccurrence = params.optimization.time_saved_per_occurrence;
    postParams.optimization.time_saved_per_occurrence = this.timeConvert(timeSavedPerOccurrence, timeSavedPerOccurrenceUnit);

    postParams.optimization.user_id = window.currentUser.userId;
    return postParams;
  },

  successCallback: function (newOptimization) {
    this.history.push('/optimizations/' + newOptimization.id);
  },

  errorCallback: function (errorArray) {
    this.state.errors = JSON.parse(errorArray);
    this.setState(this.state);
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var postParams = { optimization: this.state };
    OptimizationActions.retrieveNewOptimization(this.proccessParams(postParams), this.errorCallback, this.successCallback);
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
        <h2>Create an Optimization</h2>
        <h1>{this.state.errors.toString()}</h1>
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
          <input className="whiteButton green-button-overlay" type="submit" value="create optimization"/>
        </form>
        <button className="whiteButton green-button-overlay" onClick={this.handleCancel}>cancel</button>
      </div>
    );
  },

});

module.exports = OptimizationNewForm;
