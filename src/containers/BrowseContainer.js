import React, { Component } from 'react';
import UserStats from '../components/UserStats'
import FilterMenu from '../components/FilterMenu'


class BrowseContainer extends Component {
    state = { 
        users: [],
        displayedUser: undefined,
        isMatchedWithDisplayed: false
     }

    componentDidMount() {
        fetch('http://localhost:3000/users')
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
                <div key={index} className='clearfix text-center'>
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
            console.log('data', data)
            this.setState({
                displayedUser: data
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
            this.setState({
                isMatchedWithDisplayed: true
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
            this.setState({
                isMatchedWithDisplayed: false
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
                <div id='browse-slider'>
                        <FilterMenu />
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