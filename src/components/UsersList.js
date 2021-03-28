import React from 'react';
import { User }  from './index';

const UsersList = ({
    users
}) => {
    return <div className='users-list'>
        {
            users.map((user) => {
                return <User user={user} />
            })
        }
    </div>
};

export default UsersList;