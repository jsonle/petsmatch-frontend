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

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
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
  );
}

export default App;
