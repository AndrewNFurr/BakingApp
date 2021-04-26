const accountsRouter = require('express').Router();

const {
    getAccountsByUserId, 
    addCardToAccount,
    deductBillAmount
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

accountsRouter.patch('/:accountId/bills', async (req, res, next) => {
    const { newBalance } = req.body;
    const { accountId } = req.params;
    try {
        console.log(newBalance, accountId);
        const accountAfterBill = await deductBillAmount(accountId, newBalance);
        res.send(accountAfterBill);
    } catch(error) {
        next(error)
    }
})

module.exports = accountsRouter;