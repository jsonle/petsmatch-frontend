import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SignUpForm = () => {
    return ( 
        <Form>
            <Form.Row>
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Enter name" />
                        <Form.Text className="text-muted">
                            Please enter your first and last name.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email"/>
                        <Form.Text className="text-muted">
                            Your email will be used to log in.
                        </Form.Text>
                    </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPasswordConfirmation">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" name="password_confirmation" placeholder="Password Confirmation" />
                </Form.Group>
            </Form.Row>

        </Form>
     );
}
 
export default SignUpForm;