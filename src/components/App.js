import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom'
import Index from './Index'


class App extends Component {
  render(){
    return (
      <Router>
      <Index></Index>
      </Router>
      )
  }
}
export default App;
