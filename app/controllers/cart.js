const uuidv4 = require('uuid/v4');
const Cart = require('../models/cart');
const config = require('../config');

module.exports = {
    addCart: addCart,
    getCart: getCart,
    updateCart: updateCart,
    deleteCart: deleteCart,
}

function addCart(req, res) {
    Cart.findOne({ _id: req.body._id }, (err, cart) => {
        if (err) throw err;
        if (cart) {
            res.status(400);
            return res.json({
                success: false,
                data: null,
                message: 'Item already exits in your cart.'
            });
        } 
        else {
            var newItem = new Cart({
                quantity: req.body.quantity,
                amount: req.body.amount,
                rsName: req.body.rsName,
                gold: req.body.gold,
                userID: req.body.userID,
            });

            newItem.save(function (err, cart) {
                if (err) throw err;
                res.status(200);
                return res.json({
                    success: true,
                    message: 'Item has been added to your cart.',
                    data: cart
                });
            });
        }
    });
}

function getCart(req, res) {
    Cart.find({ userID: req.body.userID }, function (err, cart) {
        res.json(cart);
    });
}

function deleteCart(req, res, next) {
    Cart.findById(req.body.id, (err, cart) => {
        if (err) throw err;
        if (!cart) {
            res.status(400);
            return res.json({
                success: false,
                message: 'Item no more exist in your cart.'
            });
        } 
        else {
            Cart.findByIdAndRemove(req.body.id, (err, cart) => {
                if (err) throw err;
                res.status(200);
                return res.json({
                    success: true,
                    message: 'Item has been removed from your cart.',
                    data:cart
                });
            })
        }
    })
}

function updateCart(req, res, next) {
    Cart.findById(req.body.id, (err, cart) => {
        if (err) throw err;
        if (!cart) {
            res.status(400);
            return res.json({
                success: false,
                message: 'Item not found.'
            });
        } 
        else {
            let data = {
                quantity: req.body.quantity,
                amount: req.body.amount,
                gold: req.body.gold,
                rsName: req.body.rsName,
                userID: req.body.userID,
            };

            Cart.findByIdAndUpdate(req.body.id, data, (err, cart) => {
                if (err) throw err;
                res.status(200);
                res.json({
                    success: true,
                    message: 'Item has been updated.',
                    data: cart
                });
            })
        }
    })
}






