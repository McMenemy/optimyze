var React = require('react');
var ReactDOM = require('react-dom');
var Dispatcher = require('./dispatcher/dispatcher');
var ApiUtil = require('./util/apiUtil');
var OptimizationActions = require('./actions/optimizationActions');
var Router = require('react-router').Router;
var Route = require('react-router').Route;

// Components
var App = require('./components/app');

// for testing
window.ApiUtil = ApiUtil;
window.OptimizationActions = OptimizationActions;

var routes = (
  <Route component={App} path='/'>

  </Route>
);

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <Router>{routes}</Router>, root);
});
