import React, { Component } from 'react';
import SignUpForm from '../components/SignUpForm';

class SignUpContainer extends Component {
    state = { 
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        age: "",
        gender: "",
        bio: "",
        zipcode: ""
     }
     
    render() { 
        return (
            <div>
                <SignUpForm />
            </div>
        )
    }
}
 
export default SignUpContainer;