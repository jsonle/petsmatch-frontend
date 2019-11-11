import React, { Component } from 'react';
import UserStats from '../components/UserStats'
import FilterMenu from '../components/FilterMenu'
import Alert from 'react-bootstrap/Alert'


class BrowseContainer extends Component {
    state = { 
        users: [],
        displayedUser: undefined,
        isMatchedWithDisplayed: false,
        matchAlert: false,
        unmatchAlert: false
     }

    componentDidMount() {
        fetch(`http://localhost:3000/users/${this.props.currentUser.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("jwt")
            }
        })
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                users: data
            })
        })
    }

    renderUserCards = () => {
        return this.state.users.map( (user, index) => {
            return (
                <div key={index} className='browse-card clearfix text-center'>
                    <img className="w-75 slider-image" src={user.image.url} alt="First slide" onClick={ (event) => this.handleClick(event, user.id)} />
                    <br></br>
                    <p className='browse-user-name float-left'>{user.name}</p>
                </div>
            )
        })
    }

    handleClick = (event, id) => {
        fetch(`http://localhost:3000/profile/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("jwt")
            },
        })
        .then(resp => resp.json())
        .then(data => {
            var matched  = false
            data.received_matches.map( (match) => {
                if(match.user_one.id === this.props.currentUser.id) {
                    matched =  true
                }
            })
            data.started_matches.map( (match) => {
                if(match.user_two.id === this.props.currentUser.id) {
                    matched =  true
                }
            })
            this.setState({
                displayedUser: data,
                isMatchedWithDisplayed: matched
            })
        })
    }

    createMatch = (id) => {
        fetch(`http://localhost:3000/matches/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                user_one_id: this.props.currentUser.id,
                user_two_id: id
            })
        })
        .then(resp => resp.json())
        .then(data => {
            this.props.fetchCurrentUser(this.props.currentUser.id);
            this.setState({
                isMatchedWithDisplayed: true,
                matchAlert: true
            })
        })
    }

    deleteMatch = (id) => {
        fetch('http://localhost:3000/matches/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                user_one_id: this.props.currentUser.id,
                user_two_id: id
            })
        })
        .then(resp => resp.json())
        .then(data => {
            this.props.fetchCurrentUser(this.props.currentUser.id);
            this.setState({
                isMatchedWithDisplayed: false,
                unmatchAlert: true
            })
        })
    }

    handleMatchClick = (id) => {
        if(this.state.isMatchedWithDisplayed) {
            this.deleteMatch(id)
        } else {
            this.createMatch(id)
        }
    }

    renderMatchImage = () => {
        if(this.state.isMatchedWithDisplayed === true) {
            return <img id='match-button' onClick={ () => this.handleMatchClick(this.state.displayedUser.id)} src={process.env.PUBLIC_URL + '/match-fire-pngrepo-com.png'}></img>
        } else {
            return <img id='match-button' onClick={ () => this.handleMatchClick(this.state.displayedUser.id)} src={process.env.PUBLIC_URL + '/match-unlit.png'}></img>
        }
    }

    render() { 
        return (
            <div>
                {this.state.displayedUser && <Alert variant="primary" show={this.state.matchAlert} onClose={() => this.setState({matchAlert: false})} dismissible>You matched with {this.state.displayedUser.name}!</Alert>}
                {this.state.displayedUser && <Alert variant="danger" show={this.state.unmatchAlert} onClose={() => this.setState({unmatchAlert: false})} dismissible>You are no longer matched with {this.state.displayedUser.name}.</Alert>}
                <div id='browse-slider'>
                    <div id='slider-inner'>
                        {this.renderUserCards()}
                    </div>
                </div>
                <div id='stats-container'>
                    {this.state.displayedUser && <UserStats renderMatchImage={this.renderMatchImage} isMatchedWithDisplayed={this.state.isMatchedWithDisplayed} handleMatchClick={this.handleMatchClick} displayedUser={this.state.displayedUser} />}
                </div>
            </div>
         );
    }
}
 
export default BrowseContainer;