var React = require('react');

var Splash = React.createClass({
  //
  // <p>Save time by finding quicker ways to do repitive tasks</p>
  //
  // <p>Keep track of optimizations you want to use</p>
  // <h2>FAQ</h2>
  // <p>What is an Optimization?</p>
  // <p>Why Optimize?</p>
  // <p>Future Features?</p>

  getInitialState: function () {
    return { more: '' };
  },

  clickFindOutMore: function () {
    this.state.more = 'Sorry this has not been completed yet =(';
    this.setState(this.state);
  },

  render: function () {
    return (
      <div className='splash-container'>
        <div className='splash-picture-div'>
          <div className='splash-text-container'>
            <h1>Optimyze</h1>
            <p>save time by finding quicker ways to do repitive tasks</p>
            <p>{this.state.more}</p>
            <h2 onClick={this.clickFindOutMore}>Find out more</h2>
          </div>
        </div>
      </div>
    );
  },

});

module.exports = Splash;
