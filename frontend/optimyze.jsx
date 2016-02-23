var React = require('react');
var ReactDOM = require('react-dom');
var Dispatcher = require('./dispatcher/dispatcher');
var ApiUtil = require('./util/apiUtil');
var OptimizationActions = require('./actions/optimizationActions');

// Components
var App = require('./components/app');

// for testing
window.ApiUtil = ApiUtil;
window.OptimizationActions = OptimizationActions;

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <App />, document.getElementById('root'));
});
