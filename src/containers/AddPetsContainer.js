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
        }
    }

    handlePetFormChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleAddPetSubmit = event => {
        event.preventDefault();
        this.props.onAddPetSubmit(this.state);
        this.props.history.push('/');
    }

    handleAddAnotherPetClick = event => {
        event.preventDefault();
        this.props.onAddPetSubmit(this.state);
        this.props.history.push('/addpets');
        this.setState({
            name: "",
            age: "",
            breed: "",
            species: "",
            category: "dog",
        })
    }

    handleEditPreferencesClick = event => {
        event.preventDefault();
        this.props.history.push('/preferences');
    }

    render() { 
        return (
            <div className="add-pets-container">
                <AddPetForm 
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