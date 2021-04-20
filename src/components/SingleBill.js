import React from 'react'
import Button from 'react-bootstrap/Button'

const SingleBill = ({
    bill
}) => {
    const handlePayment = () => {

    }
    return <>
        <div className='single-bill'>
            <h3>{bill.title} - {bills.type}</h3>
            <p>{bill.description}</p>
            <p>{bills.price}</p>
        </div>
        <Button>
            Pay Bill
        </Button>
    </>
}

export default SingleBill;