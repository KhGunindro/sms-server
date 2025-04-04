# 🌾 AgriChains SMS Endpoint Server 📡

Welcome to the **AgriChains SMS Endpoint Server**! This project enables blockchain-based supply chain tracking for agricultural products using SMS messages. It bridges the gap between traditional communication methods and blockchain technology, making it accessible for everyone in the supply chain.

---

## 🚀 Overview

The AgriChains SMS Endpoint Server processes inbound SMS messages to trigger blockchain transactions on the **AgriChains** smart contract. It empowers various roles in the supply chain (e.g., farmers, processors, distributors, retailers) to interact with the blockchain seamlessly via SMS.

---

## 🛠 Features

- 📲 **SMS Integration**: Process SMS messages to trigger blockchain actions.

- 🔗 **Blockchain Transactions**: Interact with the AgriChains smart contract on Ethereum.

- 👥 **Role-Based Actions**: Supports multiple roles in the supply chain:
  - 🌱 **Farmer**: Plant and harvest products.
  - 🏭 **Processor**: Process products.
  - 🚚 **Distributor**: Distribute products.
  - 🛒 **Retailer**: Receive and sell products.

- ✅ **Secure Transactions**: Uses private keys for signing transactions.

- 📜 **Action Logging**: Logs transaction results for traceability.

---

## 📜 How It Works

1. **Send an SMS**: Users send an SMS in the format:
   ```
   AGC <ACTION> <PRODUCT_ID>
   ```
   - `ACTION`: One of the predefined actions (e.g., `PNT`, `HVT`, `PRO`, `DIS`, `RTL`, `SOL`).
   
   - `PRODUCT_ID`: The ID of the product being tracked.

2. **Process the Message**: The server parses the SMS, validates the format, and maps the action to a blockchain method.

3. **Trigger Blockchain Transaction**: The server signs and sends the transaction to the Ethereum blockchain.

4. **Acknowledge Receipt**: The server logs the transaction result and acknowledges the SMS.

---

## 📖 Supported Actions

| Action Code | Description           | Role       |
|-------------|-----------------------|------------|
| `PNT`       | Plant a product       | 🌱 Farmer  |
| `HVT`       | Harvest a product     | 🌱 Farmer  |
| `PRO`       | Process a product     | 🏭 Processor |
| `DIS`       | Distribute a product  | 🚚 Distributor |
| `RTL`       | Receive a product     | 🛒 Retailer |
| `SOL`       | Sell a product        | 🛒 Retailer |

---

## 🛠 Setup Instructions

Follow these steps to set up and run the server:

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-repo/sms-server.git
cd sms-server
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory and add the following variables:
```plaintext
PORT=3000
INFURA_RPC_URL=<Your Infura RPC URL>
CONTRACT_ADDRESS=<Your Smart Contract Address>
FARMER_PRIVATE_KEY=<Farmer's Private Key>
PROCESSOR_PRIVATE_KEY=<Processor's Private Key>
DISTRIBUTOR_PRIVATE_KEY=<Distributor's Private Key>
RETAILER_PRIVATE_KEY=<Retailer's Private Key>
```

### 4️⃣ Start the Server
```bash
node server.js
```
The server will run on the port specified in the `.env` file (default: `3000`).

---

## 📂 Project Structure

- **`server.js`**: Main server file that handles SMS processing and blockchain transactions.
- **`artifacts/`**: Contains the compiled contract ABI for interacting with the blockchain.
- **`.env`**: Environment variables for configuration (not included in the repository).

---

## 🛡 Security

- Ensure private keys are stored securely in the `.env` file and never exposed.
- Use HTTPS and secure communication channels for production deployments.

---

## 📧 Contact

For questions or support, please contact the **AgriChains** team at [agrichains2025@gmail.com](mailto:agrichains2025@gmail.com).

---

## 🌟 Contributing

We welcome contributions! Please fork the repository and submit a pull request with your changes.

---









Happy farming! 🌾---This project is licensed under the [MIT License](LICENSE).
This project is licensed under the [MIT License](LICENSE).
