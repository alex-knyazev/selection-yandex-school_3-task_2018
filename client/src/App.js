import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import Header from './components/Header'
import MainPage from './components/MainPage'
import { CreateEvent, EditEvent } from './components/Event'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={MainPage} />
          <Route exact path="/editEvent" component={EditEvent} />
          <Route exact path="/createEvent" component={CreateEvent} />
        </div>
      </Router>
    );
  }
}

export default App;
