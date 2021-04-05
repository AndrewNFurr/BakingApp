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
    
    const { user } = useSelector(selectCurrentUser);
    const accounts = useSelector(selectAccounts);
    console.log(accounts, user);

    return <div>
        <UserAccounts 
            accounts={accounts} />
    </div>
};

export default AccountsContainer;