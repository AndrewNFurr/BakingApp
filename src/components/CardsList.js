import React from 'react';
import Button from 'react-bootstrap/Button'
import { useSelector, useDispatch } from 'react-redux'
import { 
  accountCardsModalStatus, 
  showModalStatus, 
  toggleAccountCardsModal,
  toggleShowModal 
} from '../features/modals/modalsSlice'; 
import {
  getCurrentCard
} from '../features/cards/cardsSlice'
import Card from 'react-bootstrap/Card'
import { CardInfo } from './index';

const CardsList = ({
    cards
}) => {
    const accountModal = useSelector(accountCardsModalStatus);
    const showModal = useSelector(showModalStatus);
    const dispatch = useDispatch();

    return <div className='cards-list'>
        {
            cards.map((card) => {
                return <Card style={{ width: '40rem', height: '25rem' }}>
                <CardInfo card={card}/>
                <Card.Body>
                  <Card.Title>{card.type}</Card.Title>
                  <Card.Text>
                    {card.description}
                  </Card.Text>
                  <Button 
                    onClick={() => {
                      dispatch(toggleAccountCardsModal());
                      dispatch(toggleShowModal());
                      dispatch(getCurrentCard(card.id));
                    }}
                    variant="primary">
                      Purchase
                  </Button>
                </Card.Body>
              </Card>
            })
        }
    </div>
};

export default CardsList;