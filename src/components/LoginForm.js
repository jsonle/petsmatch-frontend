import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { LinkContainer } from 'react-router-bootstrap';


const LoginForm = (props) => {
    return ( 
        <Form inline onSubmit={props.handleLoginSubmit}>
            <Form.Control type="email" name="email" placeholder="Email" onChange={props.handleChange}/>
            <Form.Control type="password" name="password" placeholder="Password" onChange={props.handleChange} />
            <Button variant="info" type="submit">
                Login
            </Button>
            <LinkContainer to="/signup">
                <Button variant="info">
                    Sign up
                </Button>
            </LinkContainer>
        </Form>
     );
}
 
export default LoginForm;