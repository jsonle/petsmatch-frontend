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
        newUserId: null
     }

     handleFormChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
     }

    render() { 
        return (
            <div>
                <SignUpForm handleFormChange={this.handleFormChange}/>
            </div>
        )
    }
}
 
export default SignUpContainer;