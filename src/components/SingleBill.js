import React,{ useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { payBill } from '../features/bills/billsSlice'
import { selectCurrentAccount, chargeAccount, setOverDraft } from '../features/accounts/accountSlice';

const SingleBill = ({
    bill
}) => {
    const dispatch = useDispatch();
    const currentAccount = useSelector(selectCurrentAccount);

    const handlePayment = () => {
        const newBalance = currentAccount.balance - bill.amount;
        console.log(newBalance, currentAccount.balance, bill.amount);
        if (newBalance < 0) {
            dispatch(setOverDraft());
        } else {
            const paid = dispatch(payBill(bill.id));
            const accountAfterBill = dispatch(chargeAccount({newBalance: newBalance, account: currentAccount}));
            return paid
        }
        return currentAccount;
    }

    return <>
        <div className='single-bill'>
            <h3 style={{
                color: 'whitesmoke',
                backgroundColor: 'darkgreen'
            }}>{bill.title} - {bill.type}</h3>
            <div style={{
                backgroundColor: 'lightgray'
            }}>
                <h4>Contents and Details:</h4>
                <p>{bill.description}</p>
            </div>
            <p>Amount to be Paid: ${(bill.amount / 100).toFixed(2)}</p>
        </div>
        <Button onClick={handlePayment}>
            Pay Bill
        </Button>
    </>
}

export default SingleBill;