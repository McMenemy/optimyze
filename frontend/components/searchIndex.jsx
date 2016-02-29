var React = require('react');
var OptimizationIndex = require('./optimizationIndex');

var SearchIndex = React.createClass({
  getInitialState: function () {
    if (window.currentUser === undefined) {
      return { optimizations: OptimizationStore.all(),
               searchParams: { title: '' }, };
    } else {
      return { optimizations: OptimizationStore.all(),
               searchParams: { title: '' }, };
    }
  },

  handleInput: function (e) {
    e.preventDefault();
    this.setState({ searchParams: { title: e.currentTarget.value } });
  },

  render: function () {
    return (
      <div id="searchIndex">
        <h2>your optimizations</h2>
        <input type="text" className='search-input' onChange={this.handleInput} value={this.state.searchParams.title} />
        <OptimizationIndex searchParams={this.state.searchParams}/>
      </div>
    );
  },
});

module.exports = SearchIndex;
