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
    selectAccountCards
} from '../features/cards/cardsSlice';
import {
    loadAccounts,
    setAccountCards,
    selectCurrentAccount,
    setCurrentAccount
} from '../features/accounts/accountSlice';

const Account = ({
    account
}) => {
    console.log(account);
    const accountModal = useSelector(accountCardsModalStatus);
    const accountCards = useSelector(selectAccountCards);
    const currentAccount = useSelector(selectCurrentAccount);
    const currentCard = useSelector(selectCurrentCard);
    const dispatch = useDispatch();

    return <div className='account-container'
                onClick={() => {
                    dispatch(setCurrentAccount(account))
                }}
                style={account == currentAccount ? {
                    border: "2px solid blue"
                } : null}>
        <h2>{account.name}</h2>
        <p>{account.type}</p>
        <p>${account.balance / 100}</p>
        <ul className='account-card-list'>
            { account.cards ?
                account.cards.map((card) => {
                    return <li>{card.type}</li>
                }) : null
            }
        </ul>
        { accountModal ? 
            <Button
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
                Add Card to this Account
            </Button> : null }
    </div>
}

export default Account;