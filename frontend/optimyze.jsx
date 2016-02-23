var React = require('react');
var ReactDOM = require('react-dom');
var Dispatcher = require('./dispatcher/dispatcher');
var ApiUtil = require('./util/apiUtil');
var OptimizationActions = require('./actions/optimizationActions');
var OptimizationStore = require('./stores/optimizations.js');
var Router = require('react-router').Router;
var Route = require('react-router').Route;

// Components
var App = require('./components/app');
var SearchIndex =  require('./components/searchIndex');

// for testing
window.ApiUtil = ApiUtil;
window.OptimizationActions = OptimizationActions;
window.OptimizationStore = OptimizationStore;

// <Route component={SearchIndex} path='search'>
//   <Route component={OptimizationNewButton} path='optimization/new'></Route>
//   <Route component={OptimizationIndex} path='optimizations/index'>
//     <Route component={OptimizationIndexItem} path='optimizations/index_item'></Route>
//   </Route>
// </Route>

var routes = (
  <Route component={App} path='/'>
    <Route component={SearchIndex} path='search'></Route>
  </Route>
);

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <Router>{routes}</Router>, root);
});
