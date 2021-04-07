import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button'
import { AccountsContainer } from '../features';
import { useSelector, useDispatch } from 'react-redux'
import { accountCardsModalStatus, showModalStatus, toggleAccountCardsModal, toggleShowModal } from '../features/modals/modalsSlice'; 

export const Modals = () => {
    const dispatch = useDispatch();
    const accountModal = useSelector(accountCardsModalStatus);
    const showModal = useSelector(showModalStatus);
    console.log('show:', showModal, accountModal);
    return (
     <>
        <Modal
        show={showModal}
        animation={true}
        centered={true}
        backdrop={true}
        onExit={() => console.log('danke schon')}
        keyboard={false}>
        <Modal.Body>
            {accountModal
                ? <div className='accountCards-modal'>
                    <AccountsContainer />
                </div>
                : null}
         </Modal.Body>
         <Modal.Footer>
         <Button onClick={() => {
            dispatch(toggleShowModal());
            dispatch(toggleAccountCardsModal());
         }}>Close Modal</Button>
         </Modal.Footer>
        </Modal>
        
    </>
    )
};

export default Modals;