var React = require('react');
var ReactDOM = require('react-dom');
var Dispatcher = require('./dispatcher/dispatcher');
var ApiUtil = require('./util/apiUtil');
var OptimizationActions = require('./actions/optimizationActions');
var OptimizationStore = require('./stores/optimizations.js');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

// Components
var App = require('./components/app');
var SearchIndex =  require('./components/searchIndex');
var OptimizationIndex = require('./components/optimizationIndex');
var OptimizationDetail = require('./components/optimizationDetail');
var OptimizationNewForm = require('./components/optimizationNewForm');
var OptimizationEditForm = require('./components/optimizationEditForm');

// for testing
window.ApiUtil = ApiUtil;
window.OptimizationActions = OptimizationActions;
window.OptimizationStore = OptimizationStore;

var routes = (
  <Route component={App} path='/'>
    <Route component={OptimizationDetail} path='optimizations/:optimizationId'></Route>
    <Route component={OptimizationNewForm} path='optimizations/form/new'></Route>
    <Route component={OptimizationEditForm} path='optimizations/form/edit/:optimizationId'></Route>
  </Route>
);

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <Router>{routes}</Router>, root);
});