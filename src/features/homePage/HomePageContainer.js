import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../users/usersSlice';
import {
    HomePage
} from '../../components/index';

const HomePageContainer = () => { 
    const currentUser = useSelector(selectCurrentUser);
    const { user } = currentUser;

    useEffect(() => {
        console.log(currentUser);
    }, [currentUser]);

    return (
        <HomePage user={user} />
    )
}

export default HomePageContainer;