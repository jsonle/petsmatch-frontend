import React, { Component } from 'react';
import EditProfileForm from '../components/EditProfileForm';
import Alert from 'react-bootstrap/Alert'

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
        saveAlert: false,
        noPasswordAlert: false
    }

    handleFormChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSaveSubmit = event => {
        event.preventDefault();

        if (this.state.password === "" || this.state.password !== this.state.password_confirmation) {
            this.setState({noPasswordAlert: true});
        } else {
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
            this.setState({
                saveAlert: true
            })
        }

    }

    handleReturnClick = event => {
        event.preventDefault();
        this.props.history.push('/profile');
    }

    render() { 
        return (
            <div>
                <Alert variant="primary" show={this.state.saveAlert} onClose={() => this.setState({saveAlert: false})} dismissible>Successfully saved your profile!</Alert>
                <EditProfileForm currentInfo={this.state} handleFormChange={this.handleFormChange} handleReturnClick={this.handleReturnClick} handleSaveSubmit={this.handleSaveSubmit}/>
                <Alert variant="danger" show={this.state.noPasswordAlert} onClose={() => this.setState({noPasswordAlert: false})} dismissible>Passwords didn't match or no password was entered.</Alert>
            </div>
        );
    }
}
 
export default EditProfileContainer;