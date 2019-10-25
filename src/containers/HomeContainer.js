import React, { Component } from 'react';
import MatchList from '../components/MatchList'
import UserStats from '../components/UserStats'

class HomeContainer extends Component {
    state = {  }

    componentDidMount() {
        if(!!this.props.currentUser && !this.state.currentUser) {
            this.fetchCurrentUser()
        }
    }

    componentDidUpdate() {
        if(!!this.props.currentUser && !this.state.currentUser) {
            this.fetchCurrentUser()
        }
    }

    fetchCurrentUser = () => {
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

    renderBigLogoAndName = () => {
        console.log(this.props.currentUser)
        if(!this.props.currentUser) {
            return (
                <div>
                    <img className='w-50 mt-5' id='logo' src={process.env.PUBLIC_URL + '/combined-logo.png'}></img>
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