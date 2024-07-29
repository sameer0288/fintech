const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/account/:userId', transactionController.getAccountInfo);
router.post('/transaction', transactionController.performTransaction);

module.exports = router;
