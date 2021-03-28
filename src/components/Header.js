import React from 'react';
import Nav from "react-bootstrap/Nav";
import { useDispatch } from 'react-redux';
import { clearToken } from '../api/index';
import { clearUser } from '../features/users/usersSlice'
import { Login } from './index';

const Header = () => {
    const dispatch = useDispatch();
    return (<div className='header'>
        
        <Nav className='nav'>
            <div className='nav-bar' defaultActiveKey='/home' as='ul' variant='tabs'>
                <img src='https://www.logolynx.com/images/logolynx/c4/c4e297cf6b1f22c8df0e7d5ef5bf846e.png' 
                style={{height: '50px', width: '50px'}}/>
                <Nav.Item>
                    <Nav.Link href='/' className='header-link'>Home</Nav.Link>
                </Nav.Item>
            </div>
        </Nav>
        <Login />
        <button onClick={() => {
            clearToken();
            dispatch(clearUser());
            
        }}>
            Log Out
        </button>
    </div>)
}

export default Header;