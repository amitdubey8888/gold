const uuidv4 = require('uuid/v4');
const Order = require('../models/order');
const config = require('../config');

module.exports = {
    addOrder: addOrder,
    getOrder: getOrder,
}

function addOrder(req, res) {
    
    var newOrder = new Order({
        quantity: req.body.quantity,
        amount: req.body.amount,
        rsName: req.body.rsName,
        gold: req.body.gold,
        userID: req.body.userID,
        itemID: req.body.itemID,
        discount: req.body.discount,
        subtotal: req.body.subtotal,
        final: req.body.final
    });

    newOrder.save(function (err, order) {
        if (err) throw err;
        res.status(200);
        return res.json({
            success: true,
            message: 'Order placed successfully.',
            data: order
        });
    });
       
}

function getOrder(req, res) {
    Order.find({userID: req.body.userID},function (err, order) {
        res.json(order);
    });
}





