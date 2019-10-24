import React, { Component } from 'react';
import EditProfileForm from '../components/EditProfileForm';

class EditProfileContainer extends Component {
    state = {
        name: this.props.currentUser.name,
        email: this.props.currentUser.email,
        password: "",
        password_confirmation: "",
        age: this.props.currentUser.age,
        gender: this.props.currentUser.gender,
        bio: this.props.currentUser.bio,
        zipcode: this.props.currentUser.zipcode,
    }

    handleFormChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSaveSubmit = event => {
        event.preventDefault();
        console.log("EditProfileContainer State", this.state);
        const formData = new FormData();
        formData.append('name', this.state.name)
        formData.append('email', this.state.email)
        formData.append('password', this.state.password)
        formData.append('password_confirmation', this.state.password_confirmation)
        formData.append('age', this.state.age)
        formData.append('gender', this.state.gender)
        formData.append('bio', this.state.bio)
        formData.append('zipcode', this.state.zipcode)
        this.props.onEditProfileSave(formData);
    }

    handleReturnClick = event => {
        event.preventDefault();
        this.props.history.push('/profile');
    }

    render() { 
        return (
            <div>
                <EditProfileForm currentInfo={this.state} handleFormChange={this.handleFormChange} handleReturnClick={this.handleReturnClick} handleSaveSubmit={this.handleSaveSubmit}/>
            </div>
        );
    }
}
 
export default EditProfileContainer;