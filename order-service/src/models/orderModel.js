const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: String,
    items: [String],
    userEmail: String,
});

module.exports = mongoose.model('Order', orderSchema);
