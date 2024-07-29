const axios = require('axios');
const { HASURA_GRAPHQL_ENDPOINT, HASURA_ADMIN_SECRET } = require('../config/config');

// Function to execute GraphQL queries and mutations
const executeQuery = async (query, variables) => {
    try {
        const response = await axios.post(
            HASURA_GRAPHQL_ENDPOINT,
            { query, variables },
            {
                headers: {
                    'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('GraphQL request failed:', error.message);
        throw new Error('Failed to execute GraphQL query');
    }
};

// Function to get account information by user ID
const getAccountInfo = async (userId) => {
    // Validate userId
    if (!userId || isNaN(parseInt(userId))) {
        throw new Error('Invalid user ID');
    }

    const query = `
        query getUser($id: Int!) {
            users_by_pk(id: $id) {
                id
                name
                email
                balance
            }
        }
    `;
    
    try {
        const result = await executeQuery(query, { id: parseInt(userId) });
        if (!result.data || !result.data.users_by_pk) {
            throw new Error('User not found');
        }
        return result.data.users_by_pk;
    } catch (error) {
        console.error('Failed to get account info:', error.message);
        throw new Error('Failed to get account information');
    }
};

// Function to perform a transaction (deposit or withdrawal)
const performTransaction = async (userId, amount, type) => {
    // Validate inputs
    if (!userId || isNaN(parseInt(userId)) || !amount || isNaN(amount) || (type !== 'deposit' && type !== 'withdrawal')) {
        throw new Error('Invalid input parameters');
    }

    const mutation = `
        mutation performTransaction($userId: Int!, $amount: numeric!, $type: String!) {
            insert_transactions_one(object: { user_id: $userId, amount: $amount, type: $type }) {
                id
            }
            update_users_by_pk(pk_columns: { id: $userId }, _inc: { balance: $type === "deposit" ? $amount : -$amount }) {
                id
                balance
            }
        }
    `;

    try {
        const result = await executeQuery(mutation, { userId: parseInt(userId), amount: parseFloat(amount), type });
        if (!result.data) {
            throw new Error('Transaction failed');
        }
        return result.data;
    } catch (error) {
        console.error('Failed to perform transaction:', error.message);
        throw new Error('Failed to perform transaction');
    }
};

module.exports = {
    getAccountInfo,
    performTransaction
};
