import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Nav from "react-bootstrap/Nav";
import { Button } from "react-bootstrap";
import { clearToken } from '../api/index';
import { clearUser, selectCurrentUser } from '../features/users/usersSlice'
import { Login } from './index';

const Header = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const { user } = currentUser;

    return (<div className='header'>
        <Nav className='nav'>
            <div className='nav-bar' defaultActiveKey='/home' as='ul' variant='tabs'>
                <img src='https://www.logolynx.com/images/logolynx/c4/c4e297cf6b1f22c8df0e7d5ef5bf846e.png' 
                style={{height: '50px', width: '50px'}}/>
                <Nav.Item>
                    <Nav.Link href='/' className='header-link'>Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href='/cards' className='header-link'>Cards</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href='/users' className='header-link'>Users</Nav.Link>
                </Nav.Item>
                { user ? <Nav.Item>
                    <Nav.Link href='/accounts' className='header-link'>Accounts</Nav.Link>
                </Nav.Item> : null }
                <Nav.Item>
                    <Nav.Link href='/purchase' className='header-link'>Make a Purchase</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href='/bills' className='header-link'>Payments</Nav.Link>
                </Nav.Item>
            </div>
        </Nav>
        <div className='nav-login'>
            { !user ? <Login />
                : <Button 
                    variant='primary'
                    onClick={() => {
                        clearToken();
                        dispatch(clearUser());
                }}>
                    Log Out
                </Button>
            }
        </div>
    </div>)
}

export default Header;