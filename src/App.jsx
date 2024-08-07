import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import { CookiesAccessProvider } from './contexts/CookiesAccessProvider';
import { PatientInfoProvider } from './contexts/PatientInfoProvider';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import SearchPatient from './features/patients/search/SearchPatient';
import Settings from './pages/Settings';
import ContractsPage from './pages/ContractsPage';
import VisitsPage from './pages/VisitsPage';
import MonthlyReportsPage from './pages/MonthlyReportsPage';
import DuesPage from './pages/DuesPage';
import Payments from './pages/Payments';
import PageNotFound from './pages/PageNotFound';
import ChooseClinic from './pages/ChooseClinic';
import Patient from './pages/Patient';

import PatientRecord from './features/patients/PatientRecord';
import SettingLayout from './features/settings/SettingLayout';
import BasicInfo from './features/patients/BasicInfo';
import MedicalHistory from './features/patients/medicalHistory/MedicalHistory';
import Labs from './features/patients/labs/Labs';
import Scans from './features/patients/scans/Scans';
import TreatmentPlans from './features/patients/treatmentPlan/TreatmentPlans';
import Reports from './features/patients/reports/Reports';
import VitalData from './features/patients/vitalData/VitalData';
import Prescriptions from './features/patients/prescription/Prescriptions';
import AddPrescriptionForm from './features/patients/prescription/Form/AddPrescriptionForm';
import RequestScanForm from './features/patients/scans/RequestScanForm';
import RequestLabForm from './features/patients/labs/RequestLabForm';

import AppLayout from './ui/AppLayout';
import ProtectedRoute from './ui/ProtectedRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <CookiesAccessProvider>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route
                path="patient"
                element={
                  <PatientInfoProvider>
                    <Patient />
                  </PatientInfoProvider>
                }
              >
                <Route index element={<Navigate replace to="search" />} />
                <Route path="search" element={<SearchPatient />} />
                <Route element={<PatientRecord />}>
                  <Route path=":id" element={<BasicInfo />} />
                  <Route
                    path=":id/medicalHistory"
                    element={<MedicalHistory />}
                  />
                  <Route path=":id/prescriptions" element={<Prescriptions />} />
                  <Route
                    path=":id/prescriptions/add"
                    element={<AddPrescriptionForm />}
                  />
                  <Route path=":id/labs" element={<Labs />} />
                  <Route path=":id/labs/add" element={<RequestLabForm />} />
                  <Route path=":id/scans" element={<Scans />} />
                  <Route path=":id/scans/add" element={<RequestScanForm />} />
                  <Route
                    path=":id/treatmentPlans"
                    element={<TreatmentPlans />}
                  />
                  <Route path=":id/vitalData" element={<VitalData />} />
                  <Route path=":id/reports" element={<Reports />} />
                </Route>
              </Route>
              <Route path="contracts" element={<ContractsPage />} />
              <Route path="settings" element={<Settings />}>
                <Route path=":settingCategory" element={<SettingLayout />} />
              </Route>
              <Route path="visits" element={<VisitsPage />} />
              <Route path="monthly-reports" element={<MonthlyReportsPage />} />
              <Route path="dues" element={<DuesPage />} />
              <Route path="payments" element={<Payments />} />
            </Route>

            <Route
              path="choose-clinic"
              element={
                <ProtectedRoute>
                  <ChooseClinic />
                </ProtectedRoute>
              }
            />

            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CookiesAccessProvider>

      <Toaster
        position="center-bottom"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            padding: '12px 24px',
            backgroundColor: 'var(--color-gray-0)',
            color: 'var(--color-gray-700)',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
