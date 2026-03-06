import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TransactionModal } from "@/components/wallet/TransactionModal";

// Auth
import Landing from "@/pages/auth/Landing";
import ConnectWallet from "@/pages/auth/ConnectWallet";
import Unauthorized from "@/pages/auth/Unauthorized";

// Patient
import PatientDashboard from "@/pages/patient/Dashboard";
import MedicalRecords from "@/pages/patient/MedicalRecords";
import ConsentManagement from "@/pages/patient/ConsentManagement-New";
import AccessLog from "@/pages/patient/AccessLog";
import EmergencyAccess from "@/pages/patient/EmergencyAccess";

// Doctor
import DoctorDashboard from "@/pages/doctor/Dashboard";
import RequestAccess from "@/pages/doctor/RequestAccess-New";
import UploadReport from "@/pages/doctor/UploadReport";
import ActivityLog from "@/pages/doctor/ActivityLog";
import PatientDetail from "@/pages/doctor/PatientDetail";

// Admin
import AdminDashboard from "@/pages/admin/Dashboard";
import RoleAssignment from "@/pages/admin/RoleAssignment";
import AuditLog from "@/pages/admin/AuditLog";
import ComplianceOverview from "@/pages/admin/ComplianceOverview";
import SuspiciousActivity from "@/pages/admin/SuspiciousActivity";

// System
import SmartContractStatus from "@/pages/system/SmartContractStatus";
import TransactionHistory from "@/pages/system/TransactionHistory";
import ProfileSettings from "@/pages/system/ProfileSettings";
import Grievance from "@/pages/system/Grievance";

import NotFound from "@/pages/not-found";
import { useAuthStore } from "./stores/authStore";
import { useEffect } from "react";

function Router() {
  const { isConnected, role } = useAuthStore();
  const [location, setLocation] = useLocation();

  // Redirect to connect wallet if accessing protected route without connection
  useEffect(() => {
    const protectedRoutes = ['/patient', '/doctor', '/admin', '/system'];
    const isProtectedRoute = protectedRoutes.some(route => location.startsWith(route));
    
    if (isProtectedRoute && !isConnected) {
      setLocation('/connect-wallet');
    }
  }, [location, isConnected, setLocation]);

  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/connect-wallet" component={ConnectWallet} />
      <Route path="/unauthorized" component={Unauthorized} />

      {/* Patient Routes */}
      <Route path="/patient" component={PatientDashboard} />
      <Route path="/patient/records" component={MedicalRecords} />
      <Route path="/patient/consent" component={ConsentManagement} />
      <Route path="/patient/access-log" component={AccessLog} />
      <Route path="/patient/emergency" component={EmergencyAccess} />

      {/* Doctor Routes */}
      <Route path="/doctor" component={DoctorDashboard} />
      <Route path="/doctor/request-access" component={RequestAccess} />
      <Route path="/doctor/upload-report" component={UploadReport} />
      <Route path="/doctor/activity-log" component={ActivityLog} />
      <Route path="/doctor/patient/:address" component={PatientDetail} />

      {/* Admin Routes */}
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/roles" component={RoleAssignment} />
      <Route path="/admin/audit" component={AuditLog} />
      <Route path="/admin/compliance" component={ComplianceOverview} />
      <Route path="/admin/suspicious" component={SuspiciousActivity} />

      {/* System Routes */}
      <Route path="/system/contract" component={SmartContractStatus} />
      <Route path="/system/transactions" component={TransactionHistory} />
      <Route path="/system/profile" component={ProfileSettings} />
      <Route path="/system/grievance" component={Grievance} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster position="top-right" />
        <TransactionModal />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
