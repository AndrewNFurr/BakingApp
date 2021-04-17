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
}, []);

    if (!cards) return null;

    return (
        <div className='card-page'>
            <aside className='cards-aside'>
                <h2 style={{
                    backgroundColor: 'rgb(162, 255, 162)',
                    margin: '0.25rem'
                }}>Cards</h2>
                <ul>
                    <li>Credit</li>
                    <li>Debit</li>
                    <li>Currently Owned</li>
                    <li>Regulations</li>
                    <li>Consultation</li>
                </ul>
            </aside>
            <main className='cards-container'>
                <h2>Card Options</h2>
                <div>
                    <CardsList 
                        cards={cards}/>
                </div>
            </main>
            <article>
                <h3>Don't hold youself back!</h3>
                <p>
                 To tip in handclopping sauerkraut under, nutske heinee corkin beer garden on floppers relaxers have underbite. Pukein woman keepin noodle attention poopsie.
                </p>
                <p>
                 In, and they stop in the middle of a flash, nine. Floppern nine, octoberfest have makin, stein undervear. Gestalt poopsie octoberfest blimp poppin hast, nine flippin hinder not wonderful broken, am. Cuckoo tomorrow poken makin yodel is, and am hans floppy kaboodle oof, broken in the middle. Shape, shape in you, handclopping wonderfully hinder, wonderfully glockenspiel pretzel. Fool frankfurter am poken, don't poke it. In the middle oompaloomp cuckoo sauerkraut is glockenspiel, stone flash the flopers relaxers sauerkraut fool poopsie on. Noodle weiner, keepin he shape, broken me weiner master sightseerin citizen flippin on.
                </p>
                <p>
                 Pretzel handercloppen stein in, German that wearin beer garden you, pukein blimp rubberneckin. Stein wonderfully relaxing beer garden glockenspiel das deutsch. Uber tomorrow keepin wearin he frankfurter trade. Under waltz and flopers footzerstompen cuckoo.
                </p>
            </article>
        </div>
    )
}

export default Cards;
