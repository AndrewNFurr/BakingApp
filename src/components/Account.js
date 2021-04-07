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
    selectCurrentCard
} from '../features/cards/cardsSlice';

const Account = ({
    account
}) => {
    const accountModal = useSelector(accountCardsModalStatus);
    const showModal = useSelector(showModalStatus)
    const currentCard = useSelector(selectCurrentCard);
    console.log(currentCard, showModal);
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
                dispatch(toggleAccountCardsModal());
                dispatch(toggleShowModal());
                dispatch(addCardToAccount({
                    cardId: currentCard.id,
                    accountId: account.id,
                    type: currentCard.type,
                    availableCredit: currentCard.availableCredit,
                    active: true
                }));
            }}>
            Choose this Account
        </Button> : null }
    </div>
}

export default Account;