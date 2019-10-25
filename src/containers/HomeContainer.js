import React, { Component } from 'react';
import MatchList from '../components/MatchList'
import UserStats from '../components/UserStats'

class HomeContainer extends Component {
    state = {  }

    renderBigLogoAndName = () => {
        if(!this.props.currentUser) {
            return (
                <div>
                    <img className='w-50 mt-5' id='logo' src={process.env.PUBLIC_URL + '/combined-logo.png'}></img>
                </div>
            )
        }
    }

    renderMatchCards = () => {
        if(this.props.currentUser) {
            const myMatches = [...this.props.currentUser.started_matches, ...this.props.currentUser.received_matches]
            return <MatchList matches={myMatches} />
        }
    }

    render() { 
        return ( 
            <div className='container'>
                {this.renderBigLogoAndName()}
                <div  id='home-matches' className='row'>
                    {this.renderMatchCards()}
                </div>
            </div>
         );
    }
}
 
export default HomeContainer;