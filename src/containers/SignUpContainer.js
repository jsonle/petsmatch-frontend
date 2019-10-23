import React, { Component } from 'react';
import SignUpForm from '../components/SignUpForm';
import { forStatement } from '@babel/types';

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
        image: null,
     }
     
     selectImage = image => {
         console.log(image)
     };

     unselectImage = () => this.setState({ image: '' });

     handleFormChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
     }

     handleFileChange = event => {
         console.log(event.target.files[0])
         this.setState({
            [event.target.name]: event.target.files[0]
         })
     }

     handleSignUpSubmit = event => {
         event.preventDefault();
         console.log(this.state)
         const formData = new FormData();
         formData.append('name', this.state.name)
         formData.append('email', this.state.email)
         formData.append('password', this.state.password)
         formData.append('password_confirmation', this.state.password_confirmation)
         formData.append('age', this.state.age)
         formData.append('gender', this.state.gender)
         formData.append('bio', this.state.bio)
         formData.append('zipcode', this.state.zipcode)
         formData.append('image', this.state.image)
         this.props.onSignUpSubmit(formData);
         this.props.history.push('/addpets');
     }

    render() { 
        return (
            <div className="signup-container">
                <SignUpForm handleFileChange={this.handleFileChange} handleFormChange={this.handleFormChange} handleSignUpSubmit={this.handleSignUpSubmit}/>
            </div>
        )
    }
}
 
export default SignUpContainer;