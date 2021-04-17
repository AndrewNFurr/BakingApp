const account_cardsRouter = require('express').Router();

const {
    getAccountCards
} = require('../db/index');

account_cardsRouter.get('/', async (req, res, next) => {
    console.log('whatido')
    try {
        const accountCards = await getAccountCards();
        console.log('cards', accountCards)

        res.send(accountCards);
    } catch(error) {
        next(error);
    }
});

module.exports = account_cardsRouter