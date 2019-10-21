import React from 'react';
import Navbar from './containers/Navbar';
import HomeContainer from './containers/HomeContainer';
import BrowseContainer from './containers/BrowseContainer';
import ProfileContainer from './containers/ProfileContainer';
import SignUpContainer from './containers/SignUpContainer';
import ChatContainer from './containers/ChatContainer';
import { BrowserRouter as Router,
  Switch,
  Route,
  Link } from 'react-router-dom';

import './App.scss';

class App extends React.Component {
  state = {
    currentUser: {}
  }

  onLoginSubmit = (formData) => {

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "auth": {
          "email": formData.email,
          "password": formData.password
        }
      })
    }

    fetch('http://localhost:3000/login', configObj)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      localStorage.setItem("jwt", response.jwt);
      this.setState({
        currentUser: response.user
      })
    })

  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar onLoginSubmit={this.onLoginSubmit}/>
          <Switch>
            <Route exact path="/">
              <HomeContainer />
            </Route>
            <Route exact path="/profile">
              <ProfileContainer />
            </Route>
            <Route exact path="/chat/:user_id">
              <ChatContainer />
            </Route>
            <Route exact path="/signup">
              <SignUpContainer />
            </Route>
            <Route exact path="/browse">
              <BrowseContainer />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
