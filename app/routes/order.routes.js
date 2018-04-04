const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order');

router.post('/add', OrderController.addOrder);
router.post('/get', OrderController.getOrder);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Cool...'
    });
});

module.exports = router;
