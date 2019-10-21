import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import UserMenu from '../components/UserMenu'

class Navbar extends Component {
    state = { 
        email: "",
        password: "",
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
            <div className="navbar navbar-light bg-primary">
                Petsmatch
                { this.props.currentUser ?  
                <UserMenu currentUser={this.props.currentUser} handleLogout={this.props.handleLogout}/>
                : 
                <LoginForm handleLoginSubmit={this.handleLoginSubmit} handleChange={this.handleChange}/>}
            
            </div>
         );
    }
}
 
export default Navbar;