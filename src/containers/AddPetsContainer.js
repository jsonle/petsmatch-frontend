import React, { Component } from 'react';
import AddPetForm from '../components/AddPetForm';

class AddPetsContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            age: "",
            pet_type: "",
            category: "dog",
            image: null
        }
    }

    handlePetFormChange = event => {
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

    handleAddPetSubmit = event => {
        event.preventDefault();
        this.props.onAddPetSubmit(this.state);
        this.props.history.push('/');
    }

    handleAddAnotherPetClick = event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', this.state.name)
        formData.append('age', this.state.age)
        formData.append('pet_type', this.state.pet_type)
        formData.append('category', this.state.category)
        formData.append('image', this.state.image)
        this.props.onAddPetSubmit(formData);
        this.props.history.push('/addpets');
        this.setState({
            name: "",
            age: "",
            pet_type: "",
            category: "dog",
            image: null
        })
    }

    handleEditPreferencesClick = event => {
        event.preventDefault();
        this.props.onAddPetSubmit(this.state);
        this.props.history.push('/preferences');
    }

    render() { 
        console.log(this.state.pet_type)
        return (
            <div className="add-pets-container">
                <AddPetForm 
                    handleFileChange={this.handleFileChange}
                    handlePetFormChange={this.handlePetFormChange}
                    handleAddPetSubmit={this.handleAddPetSubmit}
                    handleAddAnotherPetClick={this.handleAddAnotherPetClick}
                    handleEditPreferencesClick={this.handleEditPreferencesClick}
                    currentInput={this.state}
                 />
            </div>
        );
    }
}
 
export default AddPetsContainer;