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
      localStorage.setItem("jwt", response.jwt);
      this.fetchCurrentUser(response.user.id)
    })
  }

  fetchCurrentUser = (userId) => {
    let configObj = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("jwt")
      }
    }

    fetch(`http://localhost:3000/profile/${userId}`, configObj)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      this.setState({
        currentUser: response
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
      this.createNewPreference(response.user.id)
      return response
    })
    .then(response => {
        localStorage.setItem("jwt", response.jwt);
        this.fetchCurrentUser(response.user.id)
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
    .then(response => console.log("New preference successfully created", response))
  }

  onAddPetSubmit = (newPetData) => {

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": 'Bearer ' + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        pet: {
          name: newPetData.name,
          age: newPetData.age,
          pet_type: newPetData.pet_type,
          category: newPetData.category,
          user_id: this.state.currentUser.id
        }
      })
    }

    fetch('http://localhost:3000/pets', configObj)
    .then(response => response.json())
    .then(response => {
      this.fetchCurrentUser(response.user.id)
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
      this.fetchCurrentUser(response.user.id)
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
            {this.state.currentUser ? <Route exact path="/profile"><ProfileContainer currentUser={this.state.currentUser}/></Route> : <Redirect from='/profile' to='/'/>}
            
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
