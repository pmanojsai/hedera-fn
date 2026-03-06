export const DataAccessManagerABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "_registry", "type": "address"},
      {"internalType": "address", "name": "_consentManager", "type": "address"},
      {"internalType": "address", "name": "_audit", "type": "address"}
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "requester", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "dataPrincipal", "type": "address"},
      {"indexed": false, "internalType": "string", "name": "dataType", "type": "string"}
    ],
    "name": "AccessRequested",
    "type": "event"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "patientAddress", "type": "address"},
      {"internalType": "string", "name": "dataType", "type": "string"}
    ],
    "name": "requestAccess",
    "outputs": [{"internalType": "uint256", "name": "requestId", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "doctorAddress", "type": "address"}
    ],
    "name": "getAccessRequests",
    "outputs": [
      {
        "components": [
          {"internalType": "uint256", "name": "requestId", "type": "uint256"},
          {"internalType": "address", "name": "patientAddress", "type": "address"},
          {"internalType": "string", "name": "dataType", "type": "string"},
          {"internalType": "bool", "name": "approved", "type": "bool"},
          {"internalType": "uint256", "name": "timestamp", "type": "uint256"}
        ],
        "internalType": "struct DataAccessManager.AccessRequest[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "doctorAddress", "type": "address"},
      {"internalType": "address", "name": "patientAddress", "type": "address"},
      {"internalType": "string", "name": "dataType", "type": "string"}
    ],
    "name": "hasAccess",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;
