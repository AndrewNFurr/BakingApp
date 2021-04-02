import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    loadAccounts,
    selectAccounts
} from './accountSlice';
import { selectCurrentUser } from '../users/usersSlice';
import { UserAccounts }  from '../../components';

const AccountsContainer = () => {
    const dispatch = useDispatch();
    const accounts = useSelector(selectAccounts);
    const user = useSelector(selectCurrentUser)
    console.log(accounts)

    useEffect(() => {
        const dis = dispatch(loadAccounts(user));
    }, [dispatch, accounts]);

    return <div>
        <UserAccounts accounts={accounts} />
    </div>
};

export default AccountsContainer;