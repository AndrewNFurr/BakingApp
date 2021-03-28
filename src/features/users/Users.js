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

    useEffect(() => {
            dispatch(loadUsers());
    }, [])

    // if (usersAreLoading) return <div>Loading Users</div>;
    if (!users) return null;
    return (
        <div className='users-container'>
            <h2>Bank Users</h2>
            <UsersList users={users}/>
            {/* <UserForm /> */}
        </div>
    )
}

export default Users;
