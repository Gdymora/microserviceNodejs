const React = require('react');
const ReactDOM = require('react-dom');
const MyComponent = require('./MyComponent').default;

ReactDOM.render(
  React.createElement(MyComponent),
  document.getElementById('root')
);