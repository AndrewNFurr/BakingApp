import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { payBill } from '../features/bills/billsSlice'

const SingleBill = ({
    bill
}) => {
    const dispatch = useDispatch();

    const handlePayment = () => {
        const paid = dispatch(payBill(bill.id)) ;
        console.log(paid);
        return paid
    }

    return <>
        <div className='single-bill'>
            <h3>{bill.title} - {bill.type}</h3>
            <p>{bill.description}</p>
            <p>{bill.price}</p>
        </div>
        <Button onClick={handlePayment}>
            Pay Bill
        </Button>
    </>
}

export default SingleBill;