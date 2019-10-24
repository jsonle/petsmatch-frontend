import React, { Component } from 'react';
import MatchedUserCard from './MatchedUserCard';


class MatchList extends Component {

    renderMatchedUserCards = () => {
        this.props.matches.map( () => {
            
        })
    }

    render() {
        return ( 
            <div id='my-matches'>
                    {this.props.matches.map( (match, index) => <MatchedUserCard match={match} key={index}/> )}
            </div>
         );
    }
}
 
export default MatchList;