import React, { Component } from 'react';
import MatchedUserCard from './MatchedUserCard';


class MatchList extends Component {

    renderMatchedUserCards = () => {
        this.props.matches.map( () => {
            
        })
    }

    render() {
        console.log('matchlist props', this.props)
        return ( 
            <div id='my-matches'>
                <div>   
                    {this.props.matches.map( (match) => <MatchedUserCard match={match} /> )}
                </div>
                
            </div>
         );
    }
}
 
export default MatchList;