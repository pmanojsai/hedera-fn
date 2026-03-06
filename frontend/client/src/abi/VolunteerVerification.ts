export const VolunteerVerificationABI = [
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
      {"indexed": true, "internalType": "address", "name": "verifier", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "volunteer", "type": "address"},
      {"indexed": false, "internalType": "bool", "name": "verified", "type": "bool"}
    ],
    "name": "VerificationCompleted",
    "type": "event"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "volunteerAddress", "type": "address"},
      {"internalType": "string", "name": "verificationData", "type": "string"}
    ],
    "name": "verifyVolunteer",
    "outputs": [{"internalType": "bool", "name": "success", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "volunteer", "type": "address"}],
    "name": "isVerified",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;
