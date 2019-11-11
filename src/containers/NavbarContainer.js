import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import UserMenu from '../components/UserMenu';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';

class NavbarContainer extends Component {
    state = { 
        email: "",
        password: ""
     }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    } 

    handleLoginSubmit = event => {
        event.preventDefault()
        this.props.onLoginSubmit(this.state);
    }
    render() { 
        return ( 
            <Navbar className="navbar" bg="light" expand="lg">
                <LinkContainer to="/">
                    <Navbar.Brand><h1><span style={{color: '#287aed'}}>Pets</span><span style={{color: '#ee8712'}}>Match</span><img style={{width: '40px', marginTop: '0px'}} className='home-image' src={process.env.PUBLIC_URL + '/match-fire-pngrepo-com.png'}></img></h1></Navbar.Brand>
                </LinkContainer>
                
                { this.props.currentUser ?  
                <UserMenu currentUser={this.props.currentUser} handleLogout={this.props.handleLogout}/>
                : 
                <LoginForm handleLoginSubmit={this.handleLoginSubmit} handleChange={this.handleChange}/>}
            
            </Navbar>
         );
    }
}
 
export default NavbarContainer;