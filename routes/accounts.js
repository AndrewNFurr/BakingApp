const accountsRouter = require('express').Router();

const {
    getAccountsByUserId
} = require('../db/index');

accountsRouter.get('/', async (req, res, next) => {
    const { id } = req.query;
    try {
        const accounts = await getAccountsByUserId(id);
        res.send(accounts);
    } catch(error) {
        next(error);
    }
})

module.exports = accountsRouter;