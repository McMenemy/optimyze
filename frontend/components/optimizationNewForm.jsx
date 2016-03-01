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
    var updateParams = { optimization: this.state };
    OptimizationActions.retrieveNewOptimization(updateParams);
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
        <h2>Create an Optimization</h2>
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
            <input type="number" className="has-time-selector" valueLink={this.linkState('time_saved_per_occurrence')} />
            <select name="time-unit">
              <option value="milliseconds">milliseconds</option>
              <option value="seconds">seconds</option>
              <option value="minutes">minutes</option>
              <option value="hours">hours</option>
            </select>
          </div>
          <div className="formGroup">
            <label>frequency</label>
            <input type="number" valueLink={this.linkState('frequency')} />
          </div>
          <div className="formGroup">
            <label>user id</label>
            <input type="number" valueLink={this.linkState('user_id')} />
          </div>
          <input className="whiteButton green-button-overlay" type="submit" value="create optimization"/>
        </form>
        <button className="whiteButton green-button-overlay" onClick={this.handleCancel}>cancel</button>
      </div>
    );
  },

});

module.exports = OptimizationNewForm;
