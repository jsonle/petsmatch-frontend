import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const AddPetForm = (props) => {
    return (
        <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Pet Name</Form.Label>
                    <Form.Control type="text" name="name" onChange={props.handlePetFormChange} placeholder="Enter name" value={props.currentInput.name} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="text" name="age" onChange={props.handlePetFormChange} placeholder="Age" value={props.currentInput.age} />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridCategory">
                    <Form.Label>Pet Category</Form.Label>
                    <Form.Control as="select" name="category" onChange={props.handlePetFormChange} value={props.currentInput.category}>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="bird">Bird</option>
                        <option value="reptile">Reptile</option>
                        <option value="fish">Fish</option>
                        <option value="rodent">Rodent</option>
                        <option value="exotic">Exotic</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPetType">
                    <Form.Label>Pet Type</Form.Label>
                    <Form.Control type="text" name="pet_type" onChange={props.handlePetFormChange} placeholder="ex. Corgi" value={props.currentInput.pet_type}/>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPicture">
                    <Form.Label>Upload Picture</Form.Label>
                    <Form.Control type="file" name="image" onChange={props.handleFileChange} />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Button variant="primary" type="submit" onClick={props.handleAddAnotherPetClick}>
                    Add Pet
                </Button>
                <Button variant="primary" type="submit" onClick={props.handleEditPreferencesClick}>
                    Edit your preferences
                </Button>
                <Button variant="primary" type="submit" onClick={props.handleAddPetSubmit}>
                    Done
                </Button>
            </Form.Row>
        </Form>
    );
}
 
export default AddPetForm;