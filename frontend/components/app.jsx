var React = require('react');
var SearchIndex = require('./searchIndex');

var App = React.createClass({
  render: function () {

    return (
      <div className="app group">
        <div className="left-pane">
          <SearchIndex />
        </div>
        <div className="right-pane">
          {this.props.children}
        </div>
        <input className="whiteButton green-button-overlay" type="submit" value="sign in" />
      </div>
    );
  },
});

module.exports = App;
