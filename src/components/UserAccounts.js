import React from 'react';
import { Account } from './index';

const UserAccounts = ({
    accounts,
    onBills
}) => {
    return <div clasName='accounts-list'>
        {
            accounts.map((account) => {
                return <div>
                    <Account account={account}
                             onBills={onBills}/>
                </div>
            })
        }
    </div>
}

export default UserAccounts;