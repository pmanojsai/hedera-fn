import { BrowserProvider, Contract, ethers } from 'ethers';

// Contract ABIs
import { AuditLogABI } from '../abi/AuditLog';
import { ConsentManagerABI } from '../abi/ConsentManager';
import { DataAccessManagerABI } from '../abi/DataAccessManager';
import { VolunteerRegistryABI } from '../abi/VolunteerRegistry';
import { VolunteerVerificationABI } from '../abi/VolunteerVerification';

// Contract Addresses
const CONTRACT_ADDRESSES = {
  Registry: '0xb54F86cb9a87f4F8c27915c9820e2a4D48221Db2',
  AuditLog: '0x92cfC835Eaf73624bb84FEC5f6CC23814E545922',
  ConsentManager: '0x9f235ce7634fE3aB4B3AbD16afBFe7C242C77296',
  DataAccessManager: '0xa072a469aFE0361983f59681E527A5cB53F38414',
  VolunteerRegistry: '0x79a758403F92c9E5597a4484d9d9bd2055Da8c55',
  VolunteerVerification: '0x61874286436622c9f0e432445d3163581620EaFF'
};

let contracts: {
  auditLog?: Contract;
  consentManager?: Contract;
  dataAccessManager?: Contract;
  volunteerRegistry?: Contract;
  volunteerVerification?: Contract;
} = {};

let provider: BrowserProvider | null = null;
let signer: ethers.JsonRpcSigner | null = null;

export const initializeContracts = async () => {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  try {
    provider = new BrowserProvider(window.ethereum);
    signer = await provider.getSigner();

    // Initialize contracts
    contracts.auditLog = new Contract(
      CONTRACT_ADDRESSES.AuditLog,
      AuditLogABI,
      signer
    );

    contracts.consentManager = new Contract(
      CONTRACT_ADDRESSES.ConsentManager,
      ConsentManagerABI,
      signer
    );

    contracts.dataAccessManager = new Contract(
      CONTRACT_ADDRESSES.DataAccessManager,
      DataAccessManagerABI,
      signer
    );

    contracts.volunteerRegistry = new Contract(
      CONTRACT_ADDRESSES.VolunteerRegistry,
      VolunteerRegistryABI,
      signer
    );

    contracts.volunteerVerification = new Contract(
      CONTRACT_ADDRESSES.VolunteerVerification,
      VolunteerVerificationABI,
      signer
    );

    return contracts;
  } catch (error) {
    console.error('Failed to initialize contracts:', error);
    throw error;
  }
};

export const getContracts = () => {
  if (!contracts.auditLog || !contracts.consentManager) {
    throw new Error('Contracts not initialized. Call initializeContracts() first.');
  }
  return contracts;
};

export const getProvider = () => {
  if (!provider) {
    throw new Error('Provider not initialized');
  }
  return provider;
};

export const getSigner = () => {
  if (!signer) {
    throw new Error('Signer not initialized');
  }
  return signer;
};

// Contract Functions

export const requestAccess = async (patientAddress: string, dataType: string) => {
  try {
    const contracts = getContracts();
    const tx = await contracts.dataAccessManager!.requestAccess(patientAddress, dataType);
    
    return {
      hash: tx.hash,
      status: 'pending',
      wait: () => tx.wait()
    };
  } catch (error: any) {
    console.error('Error requesting access:', error);
    throw new Error(error.message || 'Failed to request access');
  }
};

export const approveConsent = async (requestId: number) => {
  try {
    const contracts = getContracts();
    const tx = await contracts.consentManager!.grantConsent(requestId);
    
    return {
      hash: tx.hash,
      status: 'pending',
      wait: () => tx.wait()
    };
  } catch (error: any) {
    console.error('Error approving consent:', error);
    throw new Error(error.message || 'Failed to approve consent');
  }
};

export const rejectConsent = async (requestId: number) => {
  try {
    const contracts = getContracts();
    const tx = await contracts.consentManager!.revokeConsent(requestId);
    
    return {
      hash: tx.hash,
      status: 'pending',
      wait: () => tx.wait()
    };
  } catch (error: any) {
    console.error('Error rejecting consent:', error);
    throw new Error(error.message || 'Failed to reject consent');
  }
};

export const verifyStaff = async (staffAddress: string) => {
  try {
    const contracts = getContracts();
    const tx = await contracts.volunteerRegistry!.verifyVolunteer(staffAddress);
    
    return {
      hash: tx.hash,
      status: 'pending',
      wait: () => tx.wait()
    };
  } catch (error: any) {
    console.error('Error verifying staff:', error);
    throw new Error(error.message || 'Failed to verify staff');
  }
};

export const registerVolunteer = async (name: string, role: string, credentials: string) => {
  try {
    const contracts = getContracts();
    const tx = await contracts.volunteerRegistry!.registerVolunteer(name, role, credentials);
    
    return {
      hash: tx.hash,
      status: 'pending',
      wait: () => tx.wait()
    };
  } catch (error: any) {
    console.error('Error registering volunteer:', error);
    throw new Error(error.message || 'Failed to register volunteer');
  }
};

export const verifyVolunteer = async (volunteerAddress: string) => {
  try {
    const contracts = getContracts();
    const tx = await contracts.volunteerVerification!.verifyVolunteer(volunteerAddress);
    
    return {
      hash: tx.hash,
      status: 'pending',
      wait: () => tx.wait()
    };
  } catch (error: any) {
    console.error('Error verifying volunteer:', error);
    throw new Error(error.message || 'Failed to verify volunteer');
  }
};

// Audit Log Functions
export const getAuditLogs = async (filters?: any) => {
  try {
    const contracts = getContracts();
    const logs = await contracts.auditLog!.getAuditLogs(filters || {});
    
    return logs;
  } catch (error: any) {
    console.error('Error fetching audit logs:', error);
    throw new Error(error.message || 'Failed to fetch audit logs');
  }
};

export const getConsentRequests = async (patientAddress: string) => {
  try {
    const contracts = getContracts();
    const requests = await contracts.consentManager!.getConsentRequests(patientAddress);
    
    return requests;
  } catch (error: any) {
    console.error('Error fetching consent requests:', error);
    throw new Error(error.message || 'Failed to fetch consent requests');
  }
};

export const getAccessRequests = async (doctorAddress: string) => {
  try {
    const contracts = getContracts();
    const requests = await contracts.dataAccessManager!.getAccessRequests(doctorAddress);
    
    return requests;
  } catch (error: any) {
    console.error('Error fetching access requests:', error);
    throw new Error(error.message || 'Failed to fetch access requests');
  }
};

// Event Listeners
export const listenToConsentEvents = (callback: (event: any) => void) => {
  try {
    const contracts = getContracts();
    
    contracts.consentManager!.on('ConsentGranted', callback);
    contracts.consentManager!.on('ConsentRevoked', callback);
    contracts.auditLog!.on('AccessRequested', callback);
    contracts.auditLog!.on('AccessGranted', callback);
    
  } catch (error: any) {
    console.error('Error setting up event listeners:', error);
    throw new Error(error.message || 'Failed to set up event listeners');
  }
};

export const removeEventListeners = () => {
  try {
    const contracts = getContracts();
    
    contracts.consentManager!.removeAllListeners();
    contracts.auditLog!.removeAllListeners();
    
  } catch (error: any) {
    console.error('Error removing event listeners:', error);
  }
};

export default {
  initializeContracts,
  getContracts,
  requestAccess,
  approveConsent,
  rejectConsent,
  verifyStaff,
  registerVolunteer,
  verifyVolunteer,
  getAuditLogs,
  getConsentRequests,
  getAccessRequests,
  listenToConsentEvents,
  removeEventListeners
};
