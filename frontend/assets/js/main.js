const apiBaseUrl = 'http://localhost:4000/api';

// Fetch account information
document.getElementById('get-account-info').addEventListener('click', async () => {
    const userId = document.getElementById('userId').value;
    try {
        const response = await fetch(`${apiBaseUrl}/account/${userId}`);
        const data = await response.json();
        document.getElementById('account-details').innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        document.getElementById('account-details').innerText = 'Failed to fetch account information';
    }
});

// Perform a transaction
document.getElementById('perform-transaction').addEventListener('click', async () => {
    const userId = document.getElementById('transaction-user-id').value;
    const amount = document.getElementById('amount').value;
    const type = document.getElementById('transaction-type').value;
    try {
        const response = await fetch(`${apiBaseUrl}/transaction`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, amount, type })
        });
        const data = await response.json();
        document.getElementById('transaction-result').innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        document.getElementById('transaction-result').innerText = 'Failed to perform transaction';
    }
});
