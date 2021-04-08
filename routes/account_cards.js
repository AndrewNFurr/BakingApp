const account_cardsRouter = require('express').Router();

const {
    getAccountCards
} = require('../db/index');

account_cardsRouter.get('/', async (req, res, next) => {
    console.log('whatido')
    try {
        const accountCards = await getAccountCards();
        console.log('cards', accountCards)
        const accountCardObj = {};
        accountCards.forEach((card) => {
            if (card.accountId in accountCardObj) {
                accountCardObj[card.accountId].push(card);
            } else {
                accountCardObj[card.accountId] = [card];
            }
        });
        console.log('obj', accountCardObj)

        res.send({accountCardObj});
    } catch(error) {
        next(error);
    }
});

module.exports = account_cardsRouter