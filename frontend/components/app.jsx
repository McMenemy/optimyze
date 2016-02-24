var React = require('react');
var SearchIndex = require('./searchIndex');

var App = React.createClass({
  render: function () {
    return (
      <div id="app"><p>I'm in app component, using React Routes!</p>
        <div className="left-pane"><p>I'm in left-pane</p>
          <SearchIndex />
        </div>
        <div className="right-pane"><p>I'm in right-pane</p>
          {this.props.children}
        </div>
      </div>
    );
  },
});

module.exports = App;
