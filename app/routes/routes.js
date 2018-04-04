const express = require('express');
const routes = express.Router();

const userRoutes = require('./user.routes');
const cartRoutes = require('./cart.routes');
const orderRoutes = require('./order.routes');

routes.use('/users', userRoutes);
routes.use('/cart', cartRoutes);
routes.use('/order', orderRoutes);

routes.get('/', function (req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
});

module.exports = routes;