const transactionService = require('../services/transactionService');

const getAccountInfo = async (req, res) => {
    const { userId } = req.params;
    try {
        const accountInfo = await transactionService.getAccountInfo(userId);
        res.json(accountInfo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch account information' });
    }
};

const performTransaction = async (req, res) => {
    const { userId, amount, type } = req.body;
    console.log(userId,amount);
    try {
        const transactionResult = await transactionService.performTransaction(userId, amount, type);
        res.json(transactionResult);
    } catch (error) {
        res.status(500).json({ error: 'Failed to perform transaction' });
    }
};

module.exports = {
    getAccountInfo,
    performTransaction
};
