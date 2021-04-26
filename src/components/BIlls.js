import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button'
import { useSelector, useDispatch } from 'react-redux';
import { SingleBill } from './index';
import { AccountsContainer } from '../features/index'
import { isOverDraft, setOverDraft } from '../features/accounts/accountSlice';

const Bills = ({
    bills
}) => {
    const dispatch = useDispatch();
    const overDraft = useSelector(isOverDraft);
    return <>
        <div>
            {
                bills.map((bill) => {
                    return <SingleBill bill={bill} />
                })
            }
        </div>
        <div>
            <h2>Choose an Account</h2>
            <AccountsContainer />
        </div>
        <Modal
        show={overDraft}
        animation={true}
        centered={true}
        backdrop={true}
        // onExit={() => dispatch(toggleAccountCardsModal())}
        keyboard={false}>
        <Modal.Body>
            <p>There is not enough money in the account for this purchase!</p>
         </Modal.Body>
         <Modal.Footer>
         <Button onClick={() => {
            dispatch(setOverDraft());
         }}>Close Modal</Button>
         </Modal.Footer>
        </Modal>
    </>
}

export default Bills;