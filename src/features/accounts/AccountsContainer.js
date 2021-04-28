import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    loadAccounts,
    selectAccounts,
    selectCurrentAccount
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
    const current = useSelector(selectCurrentAccount)
    const accountCards = useSelector(selectAccountCards);

    useEffect(() => {
        dispatch(loadAccounts(user.id))
    }, [accountCards, current.balance]);

    return <div>
        <UserAccounts 
            accounts={accounts} />
    </div>
};

export default AccountsContainer;