import React from 'react';
import Modal from "react-bootstrap/Modal";
import { AccountsContainer } from '../features';
import { useSelector, useDispatch } from 'react-redux'
import { accountCardsModalStatus, showModalStatus, toggleAccountCardsModal } from '../features/modals/modalsSlice'; 

export const Modals = () => {
    const accountModal = useSelector(accountCardsModalStatus);
    const showModal = useSelector(showModalStatus);
    console.log(showModal, accountModal);
    return (
     <>
        <Modal
        show={showModal}
        animation={false}
        backdrop='static'
        keyboard={false}>
        {accountModal
            ? <div className='accountCards-modal'>
                <AccountsContainer />
            </div>
            : null}
        </Modal>
    </>
    )
};

export default Modals;