import React, { Component } from 'react';
import UserProfileDetails from '../components/UserProfileDetails';
import MatchList from '../components/MatchList';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PetsList from '../components/PetsList';


class ProfileContainer extends Component {
    state = {
        myMatches: [...this.props.currentUser.started_matches, ...this.props.currentUser.received_matches]
    }

    render() { 
        return (
            <Container className="profile-container">
                <Row>
                    <UserProfileDetails currentUser={this.props.currentUser}/>
                    <PetsList pets={this.props.currentUser.pets}/>
                    <Col sm={4} className="matches-list-column">
                    {this.state.myMatches.length === 0 ? 
                        <>
                        <p><strong>You have no matches!</strong></p>
                        <LinkContainer to='/browse'>
                            <Button variant="primary">Start Browsing!</Button>
                        </LinkContainer>
                        </>
                        :
                        <>
                        <h3>Your Matches</h3>
                        <MatchList matches={this.state.myMatches} />
                        </>}
                    </Col>
                </Row>
            </Container>
        );
    }
}
 
export default ProfileContainer;
