import React from 'react'

const Account = ({
    account
}) => {
    return <div>
        <h2>{account.name}</h2>
        <p>{account.type}</p>
        <p>{account.balance}</p>
    </div>
}

export default Account;