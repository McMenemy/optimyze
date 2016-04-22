var React = require('react');
var SearchIndex = require('./searchIndex');
var Header = require('./header');
var AuthStore = require('../stores/authStore');
var AuthActions = require('../actions/authActions');

var App = React.createClass({

  render: function () {
    if (localStorage.token) {
      AuthActions.retrieveSignedInUser({ user: { token: localStorage.token } });
    }

    return (
      <div>
        <Header />
        <div className='app'>
          <div className='left-pane'>
            <SearchIndex />
          </div>
          <div className='right-pane'>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  },
});

module.exports = App;
