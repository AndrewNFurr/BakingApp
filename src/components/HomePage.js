import React from 'react';

const HomePage = ({
    user
}) => { 
    return (
        <div>
            <p>Hello {user ? user.firstName : 'Person'}!</p>
        </div>
    )
}

export default HomePage;