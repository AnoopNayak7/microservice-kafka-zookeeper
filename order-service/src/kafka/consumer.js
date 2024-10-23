const kafka = require('kafka-node');
const Order = require('../models/orderModel');
const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BROKER });
const consumer = new kafka.Consumer(client, [{ topic: 'user-topic' }]);

exports.startConsumer = () => {
    consumer.on('message', async (message) => {
        const userData = JSON.parse(message.value);

        // Here you can trigger actions in the order service
        console.log('Received message:', userData);

        // Example: Create an order when a user is created (just for illustration)
        const newOrder = new Order({
            userId: userData.userId,
            items: ['Sample Item'],
            userEmail: userData.email,
        });
        await newOrder.save();
        console.log('Order created for user:', userData.email);
    });
};
