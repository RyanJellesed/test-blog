var React = require('react');
var ReactDom = require('react-dom');
var TwitterCard = require('./twittercard')
var App = React.createClass({

  render: function() {
    return <TwitterCard />
  }

});

ReactDom.render(<App/>,
  document.getElementById('twitter-card'));

