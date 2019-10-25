import React, { Component } from 'react';
import AddPetForm from '../components/AddPetForm';
import Alert from 'react-bootstrap/Alert'

class AddPetsContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            age: "",
            pet_type: "",
            category: "dog",
            image: null,
            savePetAlert: false
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
            image: null,
            savePetAlert: true
        })
    }

    handleEditPreferencesClick = event => {
        event.preventDefault();
        this.props.history.push('/preferences');
    }

    render() { 
        return (
            <div className="add-pets-container">
                <Alert variant="primary" show={this.state.savePetAlert} onClose={() => this.setState({savePetAlert: false})} dismissible>Successfully added pet to your profile! You can add another pet by filling out the form again.</Alert>
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