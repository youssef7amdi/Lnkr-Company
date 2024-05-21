import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import SearchPatient from './pages/SearchPatient';
import Settings from './pages/Settings';
import Contracts from './pages/Contracts';
import Visits from './pages/Visits';
import MonthlyReports from './pages/MonthlyReports';
import Dues from './pages/Dues';
import Payments from './pages/Payments';
import PageNotFound from './pages/PageNotFound';

import AppLayout from './ui/AppLayout';
import PatientRecord from './features/patients/PatientRecord';
import SettingLayout from './features/settings/SettingLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patient">
            <Route index element={<Navigate replace to="search" />} />
            <Route path="search" element={<SearchPatient />} />
            <Route path=":id" element={<PatientRecord />} />
          </Route>
          <Route path="contracts" element={<Contracts />} />
          <Route path="settings" element={<Settings />}>
            <Route path=":settingCategory" element={<SettingLayout />} />
          </Route>
          <Route path="visits" element={<Visits />} />
          <Route path="monthly-reports" element={<MonthlyReports />} />
          <Route path="dues" element={<Dues />} />
          <Route path="payments" element={<Payments />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
