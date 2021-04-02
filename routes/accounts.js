const accountsRouter = require('express').Router();

const {
    getAccountsByUserId
} = require('../db/index');

accountsRouter.get('/', async (req, res, next) => {
    const { id } = req.body;
    console.log(req.body, req.user)
    try {
        const accounts = await getAccountsByUserId(id);
        console.log(accounts);
        res.send(accounts);
    } catch(error) {
        next(error);
    }
})

module.exports = accountsRouter;