import React from 'react'

const SingleBill = ({
    bill
}) => {
    return <div>
        <h3>{bill.title}</h3>
        <p>{bill.description}</p>
    </div>

}

export default SingleBill;