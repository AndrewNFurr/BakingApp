import React from 'react'
import Button from 'react-bootstrap/Button'
import { useSelector, useDispatch } from 'react-redux'
import { CardInfo } from './index';
import { 
    selectCurrentUser 
} from '../features/users/usersSlice';
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
    const user = useSelector(selectCurrentUser);
    const accountModal = useSelector(accountCardsModalStatus);
    const accountCards = useSelector(selectAccountCards);
    const currentAccount = useSelector(selectCurrentAccount);
    const currentCard = useSelector(selectCurrentCard);
    const dispatch = useDispatch();

    return <main className='account-container'
                onClick={() => {
                    dispatch(setCurrentAccount(account))
                }}
                style={account == currentAccount ? {
                    border: "2px solid blue"
                } : null}>
        <h2 syle={{
            color: 'whitesmoke',
            backgroundColor: 'olive',
            padding: '1px',
            margin: '0.5rem'
        }}>{account.name}</h2>
        <div className='card-details'>
            <h3>Card Details</h3>
            <hr  style={{
                    color: '#000000',
                    backgroundColor: '#000000',
                    height: .5,
                    borderColor : '#000000'
                }}/>
            <p>Account Type: {account.type}</p>
            <p>Balance: ${(account.balance / 100).toFixed(2)}</p>
        </div>
        <hr  style={{
            color: '#000000',
            backgroundColor: '#000000',
            height: .5,
            borderColor : '#000000'
        }}/>
        <aside className='account-aside'>
            <h3>Cards Available</h3>
            <div className='account-card-list'>
                { account.cards ?
                    account.cards.map((card) => {
                        return <CardInfo className='account-card'
                                         card={card}
                                         user={user} />
                    }) : null
                }
            </div>
        </aside>
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
    </main>
}

export default Account;