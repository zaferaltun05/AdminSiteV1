import Maintenance from './pages/Maintenance';
import UnauthorizedLogs from './pages/UnauthorizedLogs';
import Backup from './pages/Backup';
import ApiKeys from './pages/ApiKeys';
import BulkActions from './pages/BulkActions';
import Reports from './pages/Reports';
import ServerControl from './pages/ServerControl';
import AdminActivity from './pages/AdminActivity';
import Analytics from './pages/Analytics';
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Players from './pages/Players';
import Roles from './pages/Roles';
import OnlinePlayers from './pages/OnlinePlayers';
import Commands from './pages/Commands';
import Logs from './pages/Logs';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { getToken } from './utils/auth';

function PrivateRoute({ children }) {
  const token = getToken();
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  const token = getToken();
  if (window.location.pathname === '/login') {
    return <Login />;
  }
  return (
    <div className="app-root">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/players" element={<PrivateRoute><Players /></PrivateRoute>} />
          <Route path="/online" element={<PrivateRoute><OnlinePlayers /></PrivateRoute>} />
          <Route path="/commands" element={<PrivateRoute><Commands /></PrivateRoute>} />
          <Route path="/logs" element={<PrivateRoute><Logs /></PrivateRoute>} />
          <Route path="/roles" element={<PrivateRoute><Roles /></PrivateRoute>} />
          <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
          <Route path="/api-keys" element={<PrivateRoute><ApiKeys /></PrivateRoute>} />
          <Route path="/backup" element={<PrivateRoute><Backup /></PrivateRoute>} />
          <Route path="/unauthorized-logs" element={<PrivateRoute><UnauthorizedLogs /></PrivateRoute>} />
          <Route path="/maintenance" element={<PrivateRoute><Maintenance /></PrivateRoute>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
