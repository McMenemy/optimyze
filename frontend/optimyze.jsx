var React = require('react');
var ReactDOM = require('react-dom');

// Components
var App = require('./components/app');

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <App />, document.getElementById('root'));
});
