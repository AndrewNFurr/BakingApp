import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    loadAccounts,
    selectAccounts
} from './accountSlice';
import { 
    selectAccountCards
} from '../cards/cardsSlice';
import { selectCurrentUser } from '../users/usersSlice';
import { UserAccounts }  from '../../components';

const AccountsContainer = () => {
    const dispatch = useDispatch();
    
    const { user } = useSelector(selectCurrentUser);
    const accounts = useSelector(selectAccounts);
    const accountCards = useSelector(selectAccountCards);
    console.log(accounts, user);

    // useEffect(() => {
    //     console.log('added card to account');
    // }, [accountCards]);

    return <div>
        <UserAccounts 
            accounts={accounts} />
    </div>
};

export default AccountsContainer;