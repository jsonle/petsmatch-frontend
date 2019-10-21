import React, { Component } from 'react';
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from "mdbreact";


class BrowseContainer extends Component {
    state = { 
        users: []
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
                <MDBCarouselItem itemId="1">
                    <MDBView>
                        <img
                        className="d-block w-100"
                        src={"https://mdbootstrap.com/img/Photos/Slides/img%20(68).jpg"}
                        alt="First slide"
                        />
                        <MDBMask overlay="black-light" />
                    </MDBView>
                    <MDBCarouselCaption>
                        <h3 className="h3-responsive">{user.name}</h3>
                        <p>{user.bio}</p>
                    </MDBCarouselCaption>
                </MDBCarouselItem>
            )
        })
    }

    render() { 
        return (
            <div>
                <div id='browse-slider'>
                    <MDBContainer>
                        <MDBCarousel activeItem={1} length={this.state.users.length} showControls={true} showIndicators={true} className="z-depth-1">
                            <MDBCarouselInner>
                                {this.renderUserCards()}
                            </MDBCarouselInner>
                        </MDBCarousel>
                    </MDBContainer>
                </div>
                <div id='stats-container'>

                </div>
            </div>
         );
    }
}
 
export default BrowseContainer;