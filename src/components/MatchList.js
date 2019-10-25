import React, { Component } from 'react';
import MatchedUserCard from './MatchedUserCard';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button'


class MatchList extends Component {

    renderMatchedUserCards = () => {
        if(this.props.matches.length === 0) {
            return (
            <div><h1>You Don't Have Any Matches Yet</h1>
            <LinkContainer to='/browse'>
                <Button variant="primary">Start Browsing!</Button>
            </LinkContainer>
            </div>
            )
        } else {
            return (
                <>
                <h1>Welcome Back to PetsMatch!</h1>
                <h3>Here are your Matches...</h3>
                {this.props.matches.map( (match, index) => { return <><MatchedUserCard match={match} key={index}/></>})}
                </>
            )
        }
    }

    render() {
        return ( 
            <div id='my-matches'>
                {this.renderMatchedUserCards()}
            </div>
         );
    }
}
 
export default MatchList;