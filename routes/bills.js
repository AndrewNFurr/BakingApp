const billsRouter = require('express').Router();
const {
    payBill
} = require('../db/index');

const {
    getBills,
    createBill
} = require('../db/index');

billsRouter.get('/', async(req, res, next) => {
    try {
        const bills  = await getBills();

        res.send(bills)
    } catch(error) {
        next({
            name: 'GetBillsError',
            message: 'Bills could not be gotten',
        })
    }
}); 

billsRouter.post('/purchase', async(req, res, next) => {
    console.log(req.body)
    try {
        const { newBill } = req.body;
        const purchase = createBill(newBill);

        res.send(purchase);
    } catch(error) {
        next({
            name: 'MakingPurchaseError',
            message: 'Could not verify the purchase'
        })
    }
});

billsRouter.delete('/:billId', async(req, res, next) => {
    try {
        const { billId } = req.params;
        const paid = payBill(billId);

        res.send({
            paidBill: paid,
            message: 'Bill was successfully paid! The amount has been deducted from your account balance'
        })
    } catch(error) {
        next({
            name: 'PayBillError',
            message: 'Could not complete the payment of the bill'
        })
    }
})



module.exports = billsRouter;