import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../features/users/usersSlice'

const HomePage = () => { 
    const currentUser = useSelector(selectCurrentUser);
    const { user } = currentUser;

    useEffect(() => {
        console.log(currentUser);
    }, [currentUser]);

    return (
        <div>
            <p>Hello {user ? user.firstName : 'Person'}!</p>
        </div>
    )
}

export default HomePage;