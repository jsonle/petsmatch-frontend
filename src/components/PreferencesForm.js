import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FormCheck from 'react-bootstrap/FormCheck'

const PreferencesForm = (props) => {
    return (
        <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridPetCategories">
                    <Form.Label>Please select your preferred pets:</Form.Label>
                    <Form.Check label="Dog" name="wants_dog" onClick={props.handleCheckBoxClick} />
                    <Form.Check label="Cat" name="wants_cat" onClick={props.handleCheckBoxClick} />
                    <Form.Check label="Fish" name="wants_fish" onClick={props.handleCheckBoxClick} />
                    <Form.Check label="Bird" name="wants_bird" onClick={props.handleCheckBoxClick} />
                    <Form.Check label="Reptile" name="wants_reptile" onClick={props.handleCheckBoxClick} />
                    <Form.Check label="Rodent" name="wants_rodent" onClick={props.handleCheckBoxClick} />
                    <Form.Check label="Exotic" name="wants_exotic" onClick={props.handleCheckBoxClick} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridGenders">
                    <Form.Label>Please select your preferred gender:</Form.Label>
                    <Form.Check label="Male" name="wants_male" onClick={props.handleCheckBoxClick} />
                    <Form.Check label="Female" name="wants_female" onClick={props.handleCheckBoxClick} />
                    <Form.Check label="Non-binary" name="wants_non_binary" onClick={props.handleCheckBoxClick} />
                    <Form.Check label="Other" name="wants_other" onClick={props.handleCheckBoxClick} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridAge">
                    <Form.Label>Please type in your preferred age range:</Form.Label>
                    <Form.Control type="text" name="min_age" onChange={props.handlePreferencesChange} placeholder="Minimum age" />
                    <Form.Control type="text" name="max_age" onChange={props.handlePreferencesChange} placeholder="Maximum age" />
                </Form.Group>
            </Form.Row>
        </Form>
    );
}
 
export default PreferencesForm;