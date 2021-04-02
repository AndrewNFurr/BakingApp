import React from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { CardInfo } from './index';

const CardsList = ({
    cards
}) => {
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
                  <Button variant="primary">Purchase</Button>
                </Card.Body>
              </Card>
            })
        }
    </div>
};

export default CardsList;