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

cardsRouter.get("/:cardId", async (req, res, next) => {
    const { cardId } = req.params;
  
    try {
      console.log(req.params, req.body);
      const card = await getCardById(cardId);
  
      res.send({ card });
    } catch (error) {
      next(error);
    }
  });

module.exports = cardsRouter;
