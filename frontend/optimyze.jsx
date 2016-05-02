var React = require('react');
var ReactDOM = require('react-dom');
var Dispatcher = require('./dispatcher/dispatcher');
var ApiUtil = require('./util/apiUtil');
var OptimizationActions = require('./actions/optimizationActions');
var OptimizationStore = require('./stores/optimizationStore');
var AuthStore = require('./stores/authStore');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var injectTapEventPlugin = require('react-tap-event-plugin');

// Components
var App = require('./components/app');
var OptimizationIndex = require('./components/optimizationIndex');
var OptimizationDetail = require('./components/optimizationDetail');
var OptimizationNewForm = require('./components/optimizationNewForm');
var OptimizationEditForm = require('./components/optimizationEditForm');
var Auth = require('./components/auth');
var Splash = require('./components/splash');
var Header = require('./components/header');
var About = require('./components/about');

// for testing
window.ApiUtil = ApiUtil;
window.OptimizationActions = OptimizationActions;
window.OptimizationStore = OptimizationStore;
window.AuthStore = AuthStore;

// used for expand boxes and touch tap
injectTapEventPlugin();

var routes = (
  <Route component={App} path='/'>
    <IndexRoute component={OptimizationIndex}></IndexRoute>
    <Route component={Auth} path='auth'></Route>
    <Route component={OptimizationDetail} path='optimizations/:optimizationId'></Route>
    <Route component={OptimizationNewForm} path='optimizations/form/new'></Route>
    <Route component={OptimizationEditForm} path='optimizations/form/edit/:optimizationId'></Route>
    <Route component={About} path='about'></Route>
  </Route>
);

document.addEventListener('DOMContentLoaded', function () {

  ReactDOM.render(
    <Router>{routes}</Router>, root);
});
