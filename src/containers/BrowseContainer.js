import React, { Component } from 'react';
import UserStats from '../components/UserStats'
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from "mdbreact";


class BrowseContainer extends Component {
    state = { 
        users: [],
        displayedUser: undefined,
        displayedPets: []
     }

    componentDidMount() {
        fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            this.setState({
                users: data
            })
        })
    }

    renderUserCards = () => {
        return this.state.users.map( (user, index) => {
            return (
                <a><img className="h-100 slider-image" src={user.image.url} alt="First slide" onClick={ (event) => this.handleClick(event, user.id)} /></a>
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
            console.log('the data', data)
            this.setState({
                displayedUser: data,
                displayedPets: []
            })
            data.pets.map( (pet) => {
                fetch(`http://localhost:3000/pets/${pet.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem("jwt")
                    },
                })
                .then(resp => resp.json())
                .then(data => {
                    console.log('pet fetch',data)
                    this.setState({
                        displayedPets: [...this.state.displayedPets, data]
                    })
                })
            })
        })
    }

    render() { 
        return (
            <div>
                <div id='browse-slider'>
                    <div id='slider-inner'>
                        {this.renderUserCards()}
                    </div>
                </div>
                <div id='stats-container'>
                    {this.state.displayedUser && <UserStats displayedPets={this.state.displayedPets} displayedUser={this.state.displayedUser} />}
                </div>
            </div>
         );
    }
}
 
export default BrowseContainer;