import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


const LoginForm = (props) => {
    return ( 
        <Form inline onSubmit={props.handleLoginSubmit}>
            <Form.Control type="text" name="email" placeholder="Email" onChange={props.handleChange}/>
            <Form.Control type="password" name="password" placeholder="Password" onChange={props.handleChange} />
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
     );
}
 
export default LoginForm;