const User = require('../models/userModel');
const { produceMessage } = require('../kafka/producer');

exports.createUser = async (req, res) => {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();

    // Produce message to Kafka
    produceMessage('user-topic', { userId: user._id, email });

    res.status(201).json({ message: 'User created', user });
};
