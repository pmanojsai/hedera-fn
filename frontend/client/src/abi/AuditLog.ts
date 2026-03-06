export const AuditLogABI = [
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "dataPrincipal", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "fiduciary", "type": "address"},
      {"indexed": false, "internalType": "string", "name": "purpose", "type": "string"},
      {"indexed": false, "internalType": "uint256", "name": "expiry", "type": "uint256"}
    ],
    "name": "ConsentGranted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "dataPrincipal", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "fiduciary", "type": "address"},
      {"indexed": false, "internalType": "string", "name": "reason", "type": "string"}
    ],
    "name": "ConsentRevoked",
    "type": "event"
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
      {"internalType": "address", "name": "requester", "type": "address"},
      {"internalType": "address", "name": "dataPrincipal", "type": "address"},
      {"internalType": "string", "name": "purpose", "type": "string"},
      {"internalType": "uint256", "name": "expiry", "type": "uint256"}
    ],
    "name": "logAccess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "getUserLogs",
    "outputs": [
      {
        "components": [
          {"internalType": "address", "name": "requester", "type": "address"},
          {"internalType": "address", "name": "dataPrincipal", "type": "address"},
          {"internalType": "string", "name": "purpose", "type": "string"},
          {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
          {"internalType": "uint256", "name": "expiry", "type": "uint256"}
        ],
        "internalType": "struct AuditLog.AccessLogEntry[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;
