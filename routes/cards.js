const cardsRouter = require('express').Router();

const {
    getAllCards,
} = require('../db/index')

cardsRouter.get('/', async (req, res, next) => {
    try {
        const cards = await getAllCards();
        res.send(cards);
    } catch(error) {
        next(error);
    }
})

module.exports = cardsRouter;
