export const VolunteerRegistryABI = [
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
      {"indexed": true, "internalType": "address", "name": "volunteer", "type": "address"},
      {"indexed": false, "internalType": "string", "name": "name", "type": "string"},
      {"indexed": false, "internalType": "string", "name": "role", "type": "string"}
    ],
    "name": "VolunteerRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "volunteer", "type": "address"},
      {"indexed": false, "internalType": "bool", "name": "verified", "type": "bool"}
    ],
    "name": "VolunteerVerified",
    "type": "event"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "role", "type": "string"},
      {"internalType": "string", "name": "credentials", "type": "string"}
    ],
    "name": "registerVolunteer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "volunteer", "type": "address"}],
    "name": "verifyVolunteer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "volunteer", "type": "address"}],
    "name": "getVolunteerInfo",
    "outputs": [
      {
        "components": [
          {"internalType": "string", "name": "name", "type": "string"},
          {"internalType": "string", "name": "role", "type": "string"},
          {"internalType": "string", "name": "credentials", "type": "string"},
          {"internalType": "bool", "name": "verified", "type": "bool"},
          {"internalType": "uint256", "name": "registrationTime", "type": "uint256"}
        ],
        "internalType": "struct VolunteerRegistry.VolunteerInfo",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllVolunteers",
    "outputs": [
      {
        "components": [
          {"internalType": "address", "name": "volunteerAddress", "type": "address"},
          {"internalType": "string", "name": "name", "type": "string"},
          {"internalType": "string", "name": "role", "type": "string"},
          {"internalType": "bool", "name": "verified", "type": "bool"}
        ],
        "internalType": "struct VolunteerRegistry.VolunteerSummary[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;
