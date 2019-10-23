import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { LinkContainer } from 'react-router-bootstrap';

const SignUpForm = (props) => {
    return ( 
        <Form >
            <Form.Row>
                <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" onChange={props.handleFormChange} placeholder="Enter name" />
                    <Form.Text className="text-muted">
                        Please enter your first and last name.
                    </Form.Text>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" name="email" onChange={props.handleFormChange} placeholder="Enter email"/>
                    <Form.Text className="text-muted">
                        Your email will be used to log in.
                    </Form.Text>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={props.handleFormChange} placeholder="Password" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPasswordConfirmation">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type="password" name="password_confirmation" onChange={props.handleFormChange} placeholder="Confirm Password" />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control as="select" name="gender" onChange={props.handleFormChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="non-binary">Non-binary</option>
                        <option value="other">Other</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="text" name="age" onChange={props.handleFormChange} placeholder="Age" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridZipcode">
                    <Form.Label>Zipcode</Form.Label>
                    <Form.Control type="text" name="zipcode" onChange={props.handleFormChange} placeholder="Zipcode" />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridBio">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control as="textarea" name="bio" onChange={props.handleFormChange} placeholder="Let everyone know a little about yourself."/>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPicture">
                    <Form.Label>Upload Picture</Form.Label>
                    <Form.Control type="file" name="image" onChange={props.handleFileChange} />
                </Form.Group>
            </Form.Row>
            
            <Button variant="primary" type="submit" onClick={props.handleSignUpSubmit}>
                Create Account and Add Pets!
            </Button>

        </Form>
     );
}
 
export default SignUpForm;