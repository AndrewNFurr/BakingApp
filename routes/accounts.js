const accountsRouter = require('express').Router();

const {
    getAccountsByUserId, 
    addCardToAccount
} = require('../db/index');

const { requireUser } = require('./utils')

accountsRouter.get('/', async (req, res, next) => {
    const { id } = req.query;
    try {
        const accounts = await getAccountsByUserId(id);
        res.send(accounts);
    } catch(error) {
        next(error);
    }
});

accountsRouter.post("/:accountId/cards", async (req, res, next) => {
    const accountCard  = req.body;
    //console.log(req.params, req.body)
    try {
      const newCard = await addCardToAccount(accountCard);
      res.send(newCard);
    } catch (error) {
      next({
        name: "CardToAccountIssue",
        message: "Could not add the card to the account",
      });
    }
  });

module.exports = accountsRouter;