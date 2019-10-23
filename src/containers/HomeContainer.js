import React, { Component } from 'react';
import MatchList from '../components/MatchList'
import UserStats from '../components/UserStats'

class HomeContainer extends Component {
    state = {  }

    componentDidUpdate() {
        if(!!this.props.currentUser && !this.state.currentUser) {
            console.log('props', !!this.props.currentUser)
            console.log('state', !this.state.currentUser)
            fetch(`http://localhost:3000/profile/${this.props.currentUser.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("jwt")
                },
            })
            .then(resp => resp.json())
            .then(data => {
                console.log('data', data)
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
        console.log('my matches', this.state.myMatches)
        if(this.state.myMatches) {
            return <MatchList matches={this.state.myMatches} />
        }
    }


    render() { 
        return ( 
            <div>
                {this.renderBigLogoAndName()}
                {this.renderMatchCards()}
            </div>
         );
    }
}
 
export default HomeContainer;