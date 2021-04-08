import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    loadCards,
    loadAccountCards,
    selectCards,
    selectAccountCards
} from './cardsSlice';
import {
    loadAccounts
} from '../accounts/accountSlice'
import { CardsList }  from '../../components';

const Cards = () => {
    const dispatch = useDispatch();
    const cards = useSelector(selectCards);

    useEffect(() => {
        dispatch(loadCards());
        dispatch(loadAccountCards());
        //dispatch(loadAccounts());
}, []);

    if (!cards) return null;

    return (
        <div className='cards-container'>
            <h2>Card Options</h2>
            <CardsList 
                cards={cards}/>
        </div>
    )
}

export default Cards;
