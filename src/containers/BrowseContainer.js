import React, { Component } from 'react';
import UserStats from '../components/UserStats'
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from "mdbreact";


class BrowseContainer extends Component {
    state = { 
        users: [],
        displayedUser: undefined
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
        fetch(`http://localhost:3000/profile/${id}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            this.setState({
                displayedUser: data
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
                    <UserStats displayedUser={this.state.displayedUser} />
                </div>
            </div>
         );
    }
}
 
export default BrowseContainer;