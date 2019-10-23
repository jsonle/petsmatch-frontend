import React, { Component } from 'react';
import UserProfileDetails from '../components/UserProfileDetails';
import MatchList from '../components/MatchList';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'


class ProfileContainer extends Component {
    state = {
        myMatches: [...this.props.currentUser.started_matches, ...this.props.currentUser.received_matches]
    }

    render() { 
        console.log("ProfileContainer Matches", this.state.myMatches.length);
        return (
            <Container className="profile-container">
                <UserProfileDetails currentUser={this.props.currentUser}/>
                <Row>
                    {this.state.myMatches.length === 0 ? 
                        <div>
                        <p><strong>You have no matches!</strong></p>
                        <LinkContainer to='/browse'>
                            <Button variant="primary">Start Browsing!</Button>
                        </LinkContainer>
                        </div>
                        :
                        <MatchList matches={this.state.myMatches} />}
                </Row>
            </Container>
        );
    }
}
 
export default ProfileContainer;
