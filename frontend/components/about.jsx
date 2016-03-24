var React = require('react');
var About = React.createClass({

  render: function () {
    return (
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
    );
  },
});

module.exports = About;
