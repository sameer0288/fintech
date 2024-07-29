const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());

// Define routes
app.use('/api', transactionRoutes);

module.exports = app;
