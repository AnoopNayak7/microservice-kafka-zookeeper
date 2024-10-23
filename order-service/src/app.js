const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config();
const { startConsumer } = require('./kafka/consumer');

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.use('/api', orderRoutes);

// Start Kafka Consumer
startConsumer();

app.listen(3002, () => console.log('Order service running on port 3002'));
