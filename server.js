require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');
const { readFileSync } = require('fs');

const app = express();
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_RPC_URL));

// Load contract ABI
const contractArtifact = JSON.parse(
  readFileSync('./artifacts/contracts/AgriSupplyChain.sol/AgriSupplyChain.json', 'utf-8')
);
const contractABI = contractArtifact.abi;

// Initialize contract
const contract = new web3.eth.Contract(contractABI, process.env.CONTRACT_ADDRESS);

// Configure Ethereum accounts for different roles
const accounts = {
  farmer: web3.eth.accounts.privateKeyToAccount(process.env.FARMER_PRIVATE_KEY),
  processor: web3.eth.accounts.privateKeyToAccount(process.env.PROCESSOR_PRIVATE_KEY),
  distributor: web3.eth.accounts.privateKeyToAccount(process.env.DISTRIBUTOR_PRIVATE_KEY),
  retailer: web3.eth.accounts.privateKeyToAccount(process.env.RETAILER_PRIVATE_KEY)
};

// Add accounts to wallet
Object.values(accounts).forEach(account => web3.eth.accounts.wallet.add(account));

app.use(bodyParser.json()); // Parse JSON bodies

async function sendTransaction(methodName, productId, role) {
  try {
    const account = accounts[role];
    if (!account) throw new Error(`Invalid role: ${role}`);

    const method = contract.methods[methodName](productId);
    const gas = await method.estimateGas({ from: account.address });
    
    const txData = {
      to: process.env.CONTRACT_ADDRESS,
      data: method.encodeABI(),
      gas,
      from: account.address
    };

    const signedTx = await web3.eth.accounts.signTransaction(txData, account.privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    
    return { 
      success: true, 
      hash: receipt.transactionHash,
      blockNumber: receipt.blockNumber
    };
  } catch (error) {
    console.error('Transaction error:', error);
    return { 
      success: false, 
      error: error.message || 'Unknown error'
    };
  }
}

app.post("/sms", async (req, res) => {
  try {
    const rawMessage = req.body.message || '';
    
    // Extracting only the actual message content after "From:{sender}\n"
    const matchMessage = rawMessage.match(/From:.*\n(.+)/s);
    const content = matchMessage ? matchMessage[1].trim() : '';

    const formattedMessage = content.toUpperCase();
    const match = formattedMessage.match(/^AGC\s+(PNT|HVT|PRO|DIS|RTL|SOL)\s+(\d+)$/);

    if (!match) {
      console.log('Invalid message format:', formattedMessage);
      return res.sendStatus(200);
    }

    const action = match[1];
    const productId = parseInt(match[2], 10);
    
    if (isNaN(productId)) {
      console.log('Invalid product ID:', match[2]);
      return res.sendStatus(200);
    }

    const methodMap = {
      PNT: { method: 'plantProduct', role: 'farmer' },
      HVT: { method: 'harvestProduct', role: 'farmer' },
      PRO: { method: 'processProduct', role: 'processor' },
      DIS: { method: 'distributeProduct', role: 'distributor' },
      RTL: { method: 'receiveProduct', role: 'retailer' },
      SOL: { method: 'sellProduct', role: 'retailer' }
    };

    const methodData = methodMap[action];
    if (!methodData) {
      console.log('Invalid action:', action);
      return res.sendStatus(200);
    }

    const result = await sendTransaction(methodData.method, productId, methodData.role);
    
    if (result.success) {
      console.log(`Transaction successful - Product: ${productId}, TX: ${result.hash}`);
    } else {
      console.error(`Transaction failed - Product: ${productId}, Error: ${result.error}`);
    }

  } catch (error) {
    console.error('Server error:', error);
  }

  return res.sendStatus(200); // Acknowledge receipt
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`SMS processing server running on port ${PORT}`);
  console.log(`Contract address: ${process.env.CONTRACT_ADDRESS}`);
});
