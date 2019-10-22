import React, { Component } from 'react';
import SignUpForm from '../components/SignUpForm';

class SignUpContainer extends Component {
    state = { 
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        age: "",
        gender: "male",
        bio: "",
        zipcode: "",
        image: "",
     }

     handleFormChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
     }

     handleSignUpSubmit = event => {
         event.preventDefault();
         this.props.onSignUpSubmit(this.state);
         this.props.history.push('/addpets');
     }

    render() { 
        return (
            <div className="signup-container">
                <SignUpForm handleFormChange={this.handleFormChange} handleSignUpSubmit={this.handleSignUpSubmit}/>
            </div>
        )
    }
}
 
export default SignUpContainer;