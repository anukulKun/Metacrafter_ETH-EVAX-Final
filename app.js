// Initialize Web3 (assuming MetaMask is installed and unlocked)
if (typeof window.ethereum !== 'undefined') {
    window.web3 = new Web3(window.ethereum);
    // Request account access
    try {
        window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
        console.error('User denied account access');
    }
} else {
    alert('Please install MetaMask!');
}

// ABI of the Counter contract
const abi = [
    {
        "inputs": [],
        "name": "count",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decrement",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "increment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "reset",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

// Contract address
const contractAddress = '0xc678bc7a857281Ab0bD559A072A996810b1EAA42';

// Create a contract instance
const counterContract = new web3.eth.Contract(abi, contractAddress);

// Function to get the current count
async function getCount() {
    try {
        const count = await counterContract.methods.getCount().call();
        document.getElementById('count').innerText = count;
    } catch (error) {
        console.error('Error fetching count:', error);
    }
}

// Function to get the wallet address
async function getWalletAddress() {
    try {
        const accounts = await web3.eth.getAccounts();
        document.getElementById('wallet').innerText = accounts[0];
        return accounts[0];
    } catch (error) {
        console.error('Error fetching wallet address:', error);
    }
}

// Function to increment the count
async function incrementCount() {
    try {
        const account = await getWalletAddress();
        await counterContract.methods.increment().send({ from: account });
        getCount(); // Refresh the count after incrementing
    } catch (error) {
        console.error('Error incrementing count:', error);
    }
}

// Function to decrement the count
async function decrementCount() {
    try {
        const account = await getWalletAddress();
        await counterContract.methods.decrement().send({ from: account });
        getCount(); // Refresh the count after decrementing
    } catch (error) {
        console.error('Error decrementing count:', error);
    }
}

// Function to reset the count
async function resetCount() {
    try {
        const account = await getWalletAddress();
        await counterContract.methods.reset().send({ from: account });
        getCount(); // Refresh the count after resetting
    } catch (error) {
        console.error('Error resetting count:', error);
    }
}

// Fetch the initial count and wallet address when the page loads
document.addEventListener('DOMContentLoaded', () => {
    getCount();
    getWalletAddress();
});
