import React from 'react';
import { thisExpression } from '@babel/types';
import NavbarContainer from './containers/NavbarContainer';
import HomeContainer from './containers/HomeContainer';
import BrowseContainer from './containers/BrowseContainer';
import ProfileContainer from './containers/ProfileContainer';
import SignUpContainer from './containers/SignUpContainer';
import ChatContainer from './containers/ChatContainer';
import AddPetsContainer from './containers/AddPetsContainer';
import PreferencesContainer from './containers/PreferencesContainer';
import EditProfileContainer from './containers/EditProfileContainer';
import Alert from 'react-bootstrap/Alert'
import { BrowserRouter as Router,
  Switch,
  Route,
  Redirect} from 'react-router-dom';
import './App.scss';

class App extends React.Component {
  state = {
    currentUser: null,
    loggedInAlert: false,
    signedUpAlert: false
  }

  componentDidMount() {
    const localUserId = localStorage.getItem("userId");

    if (localUserId) {
      this.fetchCurrentUser(localUserId);
    }
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
      localStorage.setItem("userId", response.user.id);
      this.fetchCurrentUser(response.user.id);
      this.setState({
        loggedInAlert: true
      })
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
      this.setState({
        currentUser: response
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
        localStorage.setItem("jwt", response.jwt);
        localStorage.setItem("userId", response.user.id);
        this.fetchCurrentUser(response.user.id);
        this.setState({
          signedUpAlert: true
        })
    })
    .catch(err => {
      console.log('Error', err)
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
    newPetData.append('user_id', this.state.currentUser.id)
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

  onEditProfileSave = (formData) => {
    const currentId = localStorage.getItem("userId");

    let configObj = {
      method: "PATCH",
      headers: {
        "Authorization": 'Bearer ' + localStorage.getItem("jwt")
      },
      body: formData
    }
    fetch(`http://localhost:3000/users/${currentId}`, configObj)
    .then(response => response.json())
    .then(response => {
      this.fetchCurrentUser(currentId);
    })
  }

  handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
    this.setState({
      currentUser: null
    })
  }

  render() {
    return (
      
      <Router>
        <div className="App">
          <NavbarContainer onLoginSubmit={this.onLoginSubmit} currentUser={this.state.currentUser} handleLogout={this.handleLogout}/>
          <Alert variant="primary" show={this.state.loggedInAlert} onClose={() => this.setState({loggedInAlert: false})} dismissible>Successfully logged in!</Alert>
          <Alert variant="primary" show={this.state.signedUpAlert} onClose={() => this.setState({signedUpAlert: false})} dismissible>Successfully created a new account!</Alert>
          <Switch>
            <Route exact path="/">
              <HomeContainer currentUser={this.state.currentUser} />
            </Route>
            {this.state.currentUser ? <Route exact path="/profile"><ProfileContainer currentUser={this.state.currentUser}/></Route> : <Redirect from='/profile' to='/'/>}

            {this.state.currentUser ? <Route exact path="/editprofile" render={(routeProps) => <EditProfileContainer {...routeProps} currentUser={this.state.currentUser} onEditProfileSave={this.onEditProfileSave}/>}/> : <Redirect from='/editprofile' to='/'/>}
            
            <Route exact path="/signup" render={(routeProps) => <SignUpContainer {...routeProps} onSignUpSubmit={this.onSignUpSubmit}/>}/>

            <Route exact path="/addpets" render={(routeProps) => <AddPetsContainer {...routeProps} currentUser={this.state.currentUser} onAddPetSubmit={this.onAddPetSubmit}/>}/>

            {this.state.currentUser ? <Route exact path="/preferences" render={(routeProps) => <PreferencesContainer {...routeProps} currentUser={this.state.currentUser} onPreferencesSubmit={this.onPreferencesSubmit} />}/> : <Redirect from='/preferences' to='/' />}

            {this.state.currentUser ? <Route exact path="/chat"><ChatContainer currentUser={this.state.currentUser} /></Route> : <Redirect from='/chat' to='/'/>}

            {this.state.currentUser ? <Route exact path="/browse"><BrowseContainer fetchCurrentUser={this.fetchCurrentUser} currentUser={this.state.currentUser}/></Route> : <Redirect from='/browse/' exact to='/'/>}
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
