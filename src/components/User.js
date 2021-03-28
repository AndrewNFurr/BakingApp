import React, { useState } from 'react';

const User = ({
    user
}) => {
    const {
        id,
        firstName,
        lastName,
        username,
        email,
        creditScore,
        type,
        isAdmin
     } = user;
    return <div className='user'>
        <h3>{firstName} {lastName}</h3>
        <p>{email}</p>;
        <p>{creditScore}</p>
    </div>

}

export default User;