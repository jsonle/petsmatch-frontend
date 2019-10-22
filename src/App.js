import React from 'react';
import NavbarContainer from './containers/NavbarContainer';
import HomeContainer from './containers/HomeContainer';
import BrowseContainer from './containers/BrowseContainer';
import ProfileContainer from './containers/ProfileContainer';
import SignUpContainer from './containers/SignUpContainer';
import ChatContainer from './containers/ChatContainer';
import AddPetsContainer from './containers/AddPetsContainer';
import { BrowserRouter as Router,
  Switch,
  Route } from 'react-router-dom';

import './App.scss';

class App extends React.Component {
  state = {
    currentUser: null
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

  onSignUpSubmit = (signUpData) => {

    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            user: signUpData
        })
    }

    fetch('http://localhost:3000/users', configObj)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        localStorage.setItem("jwt", response.jwt);
        this.setState({
          currentUser: response.user
        })
    })
  }

  handleLogout = () => {
    localStorage.removeItem("jwt");
    this.setState({
      currentUser: null
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <NavbarContainer onLoginSubmit={this.onLoginSubmit} currentUser={this.state.currentUser} handleLogout={this.handleLogout}/>
          <Switch>
            <Route exact path="/">
              <HomeContainer />
            </Route>
            <Route exact path="/profile">
              <ProfileContainer />
            </Route>
            <Route exact path="/chat">
                <ChatContainer currentUser={this.state.currentUser} />
            </Route>
            <Route exact path="/signup" render={(routeProps) => <SignUpContainer {...routeProps} onSignUpSubmit={this.onSignUpSubmit}/>}/>
            <Route exact path="/addpets">
              <AddPetsContainer currentUser={this.state.currentUser}/>
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
