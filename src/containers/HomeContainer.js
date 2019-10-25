import React, { Component } from 'react';
import MatchList from '../components/MatchList'
import UserStats from '../components/UserStats'

class HomeContainer extends Component {
    state = {  }

    componentDidUpdate() {
        if(!!this.props.currentUser && !this.state.currentUser) {
            fetch(`http://localhost:3000/profile/${this.props.currentUser.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("jwt")
                },
            })
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    currentUser: data,
                    myMatches: [...data.started_matches, ...data.received_matches]
                })
            })
        }
    }

    renderBigLogoAndName = () => {
        if(!this.state.currentUser) {
            return (
                <div>
                    <img className='home-image' src={process.env.PUBLIC_URL + '/Pug-infographic.png'}></img>
                    <img className='home-image' src={process.env.PUBLIC_URL + '/match-fire-pngrepo-com.png'}></img>
                    <img className='w-50' id='logo' src={process.env.PUBLIC_URL + '/petsmatch-logo.png'}></img>
                </div>
            )
        }
    }

    renderMatchCards = () => {
        if(this.state.currentUser) {
            return <MatchList matches={this.state.myMatches} />
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