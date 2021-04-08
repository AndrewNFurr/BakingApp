import React from 'react'
import Button from 'react-bootstrap/Button'
import { useSelector, useDispatch } from 'react-redux'
import { 
  accountCardsModalStatus, 
  showModalStatus, 
  toggleAccountCardsModal,
  toggleShowModal 
} from '../features/modals/modalsSlice'; 
import { 
    addCardToAccount,
    selectCurrentCard,
} from '../features/cards/cardsSlice';
import {
    loadAccounts
} from '../features/accounts/accountSlice';

const Account = ({
    account
}) => {
    console.log(account);
    const accountModal = useSelector(accountCardsModalStatus);
    const showModal = useSelector(showModalStatus)
    const currentCard = useSelector(selectCurrentCard);
    const dispatch = useDispatch();

    return <div>
        <h2>{account.name}</h2>
        <p>{account.type}</p>
        <p>{account.balance}</p>
        <ul>
            { account.cards ?
                account.cards.map((card) => {
                    return <li>{card}</li>
                }) : null
            }
        </ul>
        {accountModal ? <Button
            onClick={() => {
                const newCard = {
                    cardId: currentCard.id,
                    accountId: account.id,
                    type: currentCard.type,
                    availableCredit: currentCard.availableCredit,
                    active: true
                }
                dispatch(toggleShowModal());
                dispatch(addCardToAccount(newCard));
            }}>
            Choose this Account
        </Button> : null }
    </div>
}

export default Account;