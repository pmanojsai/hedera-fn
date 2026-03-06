export const ConsentManagerABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "_registry", "type": "address"},
      {"internalType": "address", "name": "_audit", "type": "address"}
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "requestId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "dataPrincipal", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "fiduciary", "type": "address"},
      {"indexed": false, "internalType": "string", "name": "purpose", "type": "string"}
    ],
    "name": "ConsentRequested",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "requestId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "dataPrincipal", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "fiduciary", "type": "address"}
    ],
    "name": "ConsentGranted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "requestId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "dataPrincipal", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "fiduciary", "type": "address"}
    ],
    "name": "ConsentRevoked",
    "type": "event"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "fiduciary", "type": "address"},
      {"internalType": "string", "name": "purpose", "type": "string"},
      {"internalType": "uint256", "name": "expiry", "type": "uint256"}
    ],
    "name": "requestConsent",
    "outputs": [{"internalType": "uint256", "name": "requestId", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "requestId", "type": "uint256"}],
    "name": "grantConsent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "requestId", "type": "uint256"}],
    "name": "revokeConsent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "patient", "type": "address"}],
    "name": "getConsentRequests",
    "outputs": [
      {
        "components": [
          {"internalType": "uint256", "name": "requestId", "type": "uint256"},
          {"internalType": "address", "name": "fiduciary", "type": "address"},
          {"internalType": "string", "name": "purpose", "type": "string"},
          {"internalType": "uint256", "name": "expiry", "type": "uint256"},
          {"internalType": "bool", "name": "granted", "type": "bool"},
          {"internalType": "uint256", "name": "timestamp", "type": "uint256"}
        ],
        "internalType": "struct ConsentManager.ConsentRequest[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;
