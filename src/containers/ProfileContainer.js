import React, { Component } from 'react';
import UserProfileDetails from '../components/UserProfileDetails';
import Container from 'react-bootstrap/Container';

class ProfileContainer extends Component {
    state = {  }
    render() { 
        return (
            <Container className="profile-container">
                <UserProfileDetails currentUser={this.props.currentUser}/>
            </Container>
        );
    }
}
 
export default ProfileContainer;