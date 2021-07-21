const express = require('express')
const router = express.Router()
const Order = require('../models/Order')
const passport = require('passport')

// find my orders
router.get('/mine', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).populate({path : "orderItems", populate : { path: "product"} })
    
    // console.log('orders:', orders);    
    res.json(orders);
});

// create a new order  
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (req.body.orderItems.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' });
    }

    const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id
    });

    console.log('req.user', req.user);

    const createdOrder = await order.save();
    res.status(201).json({ message: 'New Order Created', order: createdOrder });
});


// get order details by users
router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Order Not Found' });
    }
});


module.exports = router;