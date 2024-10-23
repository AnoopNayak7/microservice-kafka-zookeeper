const Order = require('../models/orderModel');

exports.createOrder = async (req, res) => {
    const { userId, items, userEmail } = req.body;
    const order = new Order({ userId, items, userEmail });
    await order.save();
    res.status(201).json({ message: 'Order created', order });
};
