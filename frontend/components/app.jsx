var React = require('react');
var SearchIndex = require('./searchIndex');
var Header = require('./header');

var App = React.createClass({
  render: function () {

    return (
      <div>
        <Header />
        <div className="app group">
          <div className="left-pane">
            <SearchIndex />
          </div>
          <div className="right-pane">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  },
});

module.exports = App;
