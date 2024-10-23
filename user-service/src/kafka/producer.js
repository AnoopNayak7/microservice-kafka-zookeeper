const kafka = require('kafka-node');

const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BROKER });
const producer = new kafka.Producer(client);

producer.on('ready', () => {
    console.log('Kafka Producer is ready.');
});

producer.on('error', (err) => {
    console.error('Producer error:', err);
});

exports.produceMessage = (topic, message) => {
    const payloads = [{ topic, messages: JSON.stringify(message) }];
    producer.send(payloads, (err, data) => {
        if (err) console.error('Error sending message to Kafka:', err);
        else console.log('Message sent to Kafka:', data);
    });
};
