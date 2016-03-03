var React = require('react');
var AuthStore = require('../stores/authStore');
var History = require('react-router').History;

var Header = React.createClass({
  mixins: [History],

  render: function () {
    return (
      <header class="header">
        <nav class="header-nav">

          <h1 class="header-logo" onClick={this.navigateToRoot}>Optimyze</h1>

          <ul class="header-list group">
            <% if signed_in? %>
              <li><%= current_user.username %><li>
              <li><%= button_to "Sign Out", session_url, :method => :delete %>
                <script type="text/javascript">
                  var currentUser = {};
                  currentUser.userId = <%= current_user[:id] %>;
                  currentUser.username = "<%= current_user[:username] %>";
                  window.currentUser = currentUser;
                </script>
            <% else %>
              <li><%= link_to "Sign In", new_session_url %></li>
              <li><%= link_to "Sign Up", new_user_url %></li>
            <% end %>
          </ul>

        </nav>
      </header>
    );
  },

});

module.exports = Header;
