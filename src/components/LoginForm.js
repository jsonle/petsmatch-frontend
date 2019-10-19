import React from 'react';

const LoginForm = (props) => {
    return ( 
        <form className="login-form" onSubmit={props.handleLoginSubmit}>
            <label>Username:</label><input type="text" name="username" onChange={props.handleChange}></input>
            <label>Password:</label><input type="password" name="password" onChange={props.handleChange}></input>
            <input type="submit"></input>
        </form>
     );
}
 
export default LoginForm;