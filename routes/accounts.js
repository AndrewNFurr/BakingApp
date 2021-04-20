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
        console.log('accountssss', accounts)
        res.send(accounts);
    } catch(error) {
        next(error);
    }
});

accountsRouter.post("/:accountId/cards", async (req, res, next) => {
    const accountCard = req.body;
    try {
      const newAccount = await addCardToAccount(accountCard);
      res.send(newAccount);
    } catch (error) {
      next({
        name: "CardToAccountIssue",
        message: "Could not add the card to the account",
      });
    }
  });

module.exports = accountsRouter;