const express = require('express');
const router = express.Router();
const UserController = require('../controllers/cart');

router.post('/add', UserController.addCart);
router.post('/get', UserController.getCart);
router.post('/update', UserController.updateCart);
router.post('/delete', UserController.deleteCart);

router.get('/', function (req, res, next) {
    res.status(200);
    res.json({
        message: 'Cool...'
    });
});

module.exports = router;
