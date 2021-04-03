import React from 'react';
import { Account } from './index';

const UserAccounts = ({
    accounts
}) => {
    return <div>
        {
            accounts.map((account) => {
                return <div>
                    <Account account={account}/>
                </div>
            })
        }
    </div>
}

export default UserAccounts;