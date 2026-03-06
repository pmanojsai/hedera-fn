export const CONTRACT_ADDRESS = import.meta.env.VITE_PUBLIC_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';
export const EXPECTED_CHAIN_ID = Number(import.meta.env.VITE_PUBLIC_CHAIN_ID || 1337);
export const RPC_URL = import.meta.env.VITE_PUBLIC_RPC_URL || 'http://127.0.0.1:8545';

export const HOSPITAL_ABI = [
  "function grantConsent(address doctor) public",
  "function revokeConsent(address doctor) public",
  "function requestAccess(address patient) public",
  "function assignRole(address user, string role) public",
  "function getUserRole(address user) public view returns (string)",
  "function hasConsent(address patient, address doctor) public view returns (bool)"
];

export const EXPLORER_URL = import.meta.env.VITE_PUBLIC_EXPLORER_URL || 'https://etherscan.io';
