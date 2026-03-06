import { getContract, getProvider, getSigner } from '../lib/ethers';

export const contractInteractions = {
  async grantConsent(doctorAddress: string) {
    const signer = await getSigner();
    if (!signer) throw new Error('Signer not found');
    const contract = getContract(signer);
    const tx = await contract.grantConsent(doctorAddress);
    return await tx.wait();
  },

  async revokeConsent(doctorAddress: string) {
    const signer = await getSigner();
    if (!signer) throw new Error('Signer not found');
    const contract = getContract(signer);
    const tx = await contract.revokeConsent(doctorAddress);
    return await tx.wait();
  },

  async requestAccess(patientAddress: string) {
    const signer = await getSigner();
    if (!signer) throw new Error('Signer not found');
    const contract = getContract(signer);
    const tx = await contract.requestAccess(patientAddress);
    return await tx.wait();
  },

  async assignRole(userAddress: string, role: string) {
    const signer = await getSigner();
    if (!signer) throw new Error('Signer not found');
    const contract = getContract(signer);
    const tx = await contract.assignRole(userAddress, role);
    return await tx.wait();
  },

  async getUserRole(userAddress: string): Promise<string> {
    const provider = getProvider();
    if (!provider) throw new Error('Provider not found');
    const contract = getContract(provider);
    return await contract.getUserRole(userAddress);
  },

  async hasConsent(patientAddress: string, doctorAddress: string): Promise<boolean> {
    const provider = getProvider();
    if (!provider) throw new Error('Provider not found');
    const contract = getContract(provider);
    return await contract.hasConsent(patientAddress, doctorAddress);
  }
};
