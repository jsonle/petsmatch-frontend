import React from 'react';
import NavbarContainer from './containers/NavbarContainer';
import HomeContainer from './containers/HomeContainer';
import BrowseContainer from './containers/BrowseContainer';
import ProfileContainer from './containers/ProfileContainer';
import SignUpContainer from './containers/SignUpContainer';
import ChatContainer from './containers/ChatContainer';
import AddPetsContainer from './containers/AddPetsContainer';
import PreferencesContainer from './containers/PreferencesContainer';
import { BrowserRouter as Router,
  Switch,
  Route,
  Redirect} from 'react-router-dom';
import './App.scss';
import { thisExpression } from '@babel/types';

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
        body: signUpData
    }

    fetch('http://localhost:3000/users', configObj)
    .then(response => response.json())
    .then(response => {
      this.createNewPreference(response.user.id)
      return response
    })
    .then(response => {
        console.log(response);
        localStorage.setItem("jwt", response.jwt);
        this.setState({
          currentUser: response.user
        })
    })
  }

  createNewPreference = (userId) => {
    
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user_id: userId
      })
    }

    fetch('http://localhost:3000/preferences', configObj)
    .then(response => response.json())
    .then(response => console.log(response))
  }

  onAddPetSubmit = (newPetData) => {
    newPetData.append('user_id', this.state.currentUser.id)
    console.log(newPetData)
    let configObj = {
      method: "POST",
      headers: {
        "Authorization": 'Bearer ' + localStorage.getItem("jwt")
      },
      body: newPetData
    }

    fetch('http://localhost:3000/pets', configObj)
    .then(response => response.json())
    .then(response => {
      this.setState({
        currentUser: response.user
      })
    })
  }

  onPreferencesSubmit = (prefData) => {
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": 'Bearer ' + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        preference: prefData
      })
    }

    fetch(`http://localhost:3000/preferences/${this.state.currentUser.preference.id}`, configObj)
    .then(response => response.json())
    .then(response => {
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
              <HomeContainer currentUser={this.state.currentUser} />
            </Route>
            <Route exact path="/profile">
              <ProfileContainer />
            </Route>
            <Route exact path="/signup" render={(routeProps) => <SignUpContainer {...routeProps} onSignUpSubmit={this.onSignUpSubmit}/>}/>

            <Route exact path="/addpets" render={(routeProps) => <AddPetsContainer {...routeProps} currentUser={this.state.currentUser} onAddPetSubmit={this.onAddPetSubmit}/>}/>

            {this.state.currentUser ? <Route exact path="/preferences" render={(routeProps) => <PreferencesContainer {...routeProps} currentUser={this.state.currentUser} onPreferencesSubmit={this.onPreferencesSubmit} />}/> : <Redirect from='/preferences' to='/' />}

            {this.state.currentUser ? <Route exact path="/chat"><ChatContainer currentUser={this.state.currentUser} /></Route> : <Redirect from='/chat' to='/'/>}

            {this.state.currentUser ? <Route exact path="/browse"><BrowseContainer currentUser={this.state.currentUser}/></Route> : <Redirect from='/browse/' exact to='/'/>}
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
