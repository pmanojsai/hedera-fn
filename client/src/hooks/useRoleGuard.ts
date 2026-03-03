import { useEffect } from 'react';
import { useAuthStore, UserRole } from '../stores/authStore';
import { useContract } from './useContract';

export const useRoleGuard = () => {
  const { address, role, setRole, setIsRoleLoading } = useAuthStore();
  const contract = useContract();

  useEffect(() => {
    const fetchRole = async () => {
      if (!address) return;
      setIsRoleLoading(true);
      try {
        const fetchedRole = await contract.getUserRole(address);
        // Map string to enum if valid
        if (fetchedRole === 'PATIENT' || fetchedRole === 'DOCTOR' || fetchedRole === 'ADMIN') {
          setRole(fetchedRole as UserRole);
        } else {
          setRole(null);
        }
      } catch (e) {
        console.error('Failed to fetch role', e);
        setRole(null);
      } finally {
        setIsRoleLoading(false);
      }
    };

    if (address && !role) {
      fetchRole();
    }
  }, [address, role, contract, setRole, setIsRoleLoading]);

  return { role };
};
