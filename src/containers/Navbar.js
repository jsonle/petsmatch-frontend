import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

class Navbar extends Component {
    state = { 
        username: "",
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
            <LoginForm handleLoginSubmit={this.handleLoginSubmit} handleChange={this.handleChange}/>
            </div>
         );
    }
}
 
export default Navbar;