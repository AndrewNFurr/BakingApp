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
});

cardsRouter.get('/current', async (req, res, next) => {
    console.log(req);
    const { cardId } = req.body;
  
    try {
      const card = await getCardById(cardId);
  
      res.send({ card });
    } catch (error) {
      next(error);
    }
  });

module.exports = cardsRouter;
