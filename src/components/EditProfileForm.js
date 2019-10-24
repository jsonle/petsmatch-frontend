import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const EditProfileForm = (props) => {
    return (
        <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" onChange={props.handleFormChange} value={props.currentInfo.name}/>
                    <Form.Text className="text-muted">
                        Please enter your first and last name.
                    </Form.Text>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" name="email" onChange={props.handleFormChange} value={props.currentInfo.email}/>
                    <Form.Text className="text-muted">
                        Your email is used to log in.
                    </Form.Text>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={props.handleFormChange} placeholder="Please enter your current or new password" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPasswordConfirmation">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type="password" name="password_confirmation" onChange={props.handleFormChange} placeholder="Confirm Password" />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control as="select" name="gender" value={props.currentInfo.gender} onChange={props.handleFormChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="non-binary">Non-binary</option>
                        <option value="other">Other</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" name="age" onChange={props.handleFormChange} value={props.currentInfo.age}/>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridZipcode">
                    <Form.Label>Zipcode</Form.Label>
                    <Form.Control type="number" name="zipcode" onChange={props.handleFormChange} value={props.currentInfo.zipcode} />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridBio">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control as="textarea" name="bio" onChange={props.handleFormChange} value={props.currentInfo.bio}/>
                </Form.Group>
            </Form.Row>
            
            <Form.Row>
                <Form.Group as={Col}>
                    <Button variant="primary" type="submit" onClick={props.handleSaveSubmit}>
                        Save
                    </Button>
                    <Button variant="primary" type="submit" onClick={props.handleReturnClick}>
                        Return to Profile
                    </Button>
                </Form.Group>
            </Form.Row>

        </Form>
    );
}
 
export default EditProfileForm;