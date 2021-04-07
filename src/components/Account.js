import React from 'react'
import Button from 'react-bootstrap/Button'
import { useSelector, useDispatch } from 'react-redux'
import { 
  accountCardsModalStatus, 
  showModalStatus, 
  toggleAccountCardsModal,
  toggleShowModal 
} from '../features/modals/modalsSlice'; 

const Account = ({
    account
}) => {
    const accountModal = useSelector(accountCardsModalStatus);
    const showModal = useSelector(showModalStatus);
    const dispatch = useDispatch();

    return <div>
        <h2>{account.name}</h2>
        <p>{account.type}</p>
        <p>{account.balance}</p>
        {accountModal ? <Button
            onClick={() => {
                dispatch(toggleAccountCardsModal());
                dispatch(toggleShowModal());
            }}>
            Choose this Account
        </Button> : null }
    </div>
}

export default Account;