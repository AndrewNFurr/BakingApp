import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    loadUsers,
    selectUsers 
} from './usersSlice';
import { UsersList }  from '../../components';

const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
    console.log(users)

    useEffect(() => {
        dispatch(loadUsers());
    }, [])

    if (!users) return null;
    return (
        <div className='users-container'>
            <h2>Bank Users</h2>
            <UsersList users={users}/>
        </div>
    )
}

export default Users;
