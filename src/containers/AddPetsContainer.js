import React, { Component } from 'react';
import AddPetForm from '../components/AddPetForm';

class AddPetsContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            age: "",
            breed: "",
            species: "",
            category: "dog",
            // user_id: props.currentUser.id
        }
    }

    handlePetFormChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() { 
        return (
            <div className="add-pets-container">
                <AddPetForm handlePetFormChange={this.handlePetFormChange}/>
            </div>
        );
    }
}
 
export default AddPetsContainer;