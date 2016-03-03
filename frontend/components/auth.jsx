var React = require('react');
var SignInUpForm = require('./signInUpForm.jsx');

var Auth = React.createClass({

  renderAuthOptions: function () {
    return <SignInUpForm />;
  },

  render: function () {
    return (
      <div className="auth-container">
        {this.renderAuthOptions()}
      </div>
    );
  },

});

module.exports = Auth;
