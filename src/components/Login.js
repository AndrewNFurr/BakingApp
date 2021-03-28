import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {
    loginUser
} from '../features/users/usersSlice';


const Login = (props) => {
    const { setIsLoggedIn, setShowModal, setLogInModal, setMessage, setForgotPassword } = props;
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const dispatch = useDispatch();

  return (
    <div className='login-block'>
        <form onSubmit={(event) => { event.preventDefault() }}
            className='login-form'>
                <div className='form-input'>
                <p>Username</p>
                    <input
                        type='text'
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder='username'
                        required
                    />
                </div>
                <div className='form-input'>
                    <p>Password</p>
                    <input
                        type='password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder='password'
                        required
                    />
                </div>
            </form>
            <Button
                variant='primary'
                className='login-siginbutton'
                onClick={() => {
                    dispatch(loginUser({username: username, password: password}));
                    setPassword('');
                    setUsername('')
                    history.push('/')
                }
                }>
                Sign In
            </Button>
    </div>
  )
}

export default Login;