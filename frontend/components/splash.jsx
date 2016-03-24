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
    // this.state.more = 'Sorry this has not been completed yet =(';
    window.scrollTo(0, 100);
    this.setState(this.state);
  },

  render: function () {
    return (
      <div className='splash-container'>
        <div className='splash-picture-div'>
          <div className='splash-text-container'>
            <h1>Optimyze</h1>
            <p>save time by finding quicker ways to do repitive tasks</p>
            <h2 onClick={this.clickFindOutMore}>Find out more</h2>
          </div>
        </div>
        <div className='about-info-container'>
          <p>Optimyze allows you to find quicker ways to do repitive tasks</p>
          <h1>Current Features</h1>
          <ul>
            <li>filter optimizations by category</li>
            <li>search optimizations by title</li>
            <li>graphically visualize time saved by an optimization</li>
            <li>create an account to post, edit, and save optimizations</li>
          </ul>
          <h1>Future Features</h1>
          <ul>
            <li>up-vote optimizations</li>
            <li>easily copy an optimization to your optimizations</li>
            <li>meta data panel of time saved using multiple optimizations</li>
            <li>record and graph actual time saved by using an optimization</li>
            <li>take into consideration other factors of an optimization such as health and financial effects</li>
          </ul>
        </div>
      </div>
    );
  },

});

module.exports = Splash;
