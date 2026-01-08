
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  // Kullanıcı rolünü localStorage veya context'ten alın (örnek: localStorage)
  const role = localStorage.getItem('role') || 'MODERATOR';
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">La’Viesta RP</div>
      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
        <NavLink to="/players" className={({ isActive }) => isActive ? 'active' : ''}>Oyuncular</NavLink>
        <NavLink to="/online" className={({ isActive }) => isActive ? 'active' : ''}>Online Oyuncular</NavLink>
        <div className="sidebar-dropdown">
          <span>Komutlar</span>
          <div className="sidebar-dropdown-content">
            <NavLink to="/commands" className={({ isActive }) => isActive ? 'active' : ''}>Komutlar</NavLink>
          </div>
        </div>
        <NavLink to="/logs" className={({ isActive }) => isActive ? 'active' : ''}>Loglar</NavLink>
        <NavLink to="/roles" className={({ isActive }) => isActive ? 'active' : ''}>Yetki Yönetimi</NavLink>
        <NavLink to="/analytics" className={({ isActive }) => isActive ? 'active' : ''}>İstatistikler</NavLink>
        {(role === 'superadmin' || role === 'admin') && (
          <>
            {role === 'superadmin' && <NavLink to="/api-keys" className={({ isActive }) => isActive ? 'active' : ''}>API Anahtarları</NavLink>}
            {role === 'superadmin' && <NavLink to="/backup" className={({ isActive }) => isActive ? 'active' : ''}>Yedekleme</NavLink>}
            <NavLink to="/unauthorized-logs" className={({ isActive }) => isActive ? 'active' : ''}>Yetkisiz Erişim Logları</NavLink>
            {role === 'superadmin' && <NavLink to="/maintenance" className={({ isActive }) => isActive ? 'active' : ''}>Bakım Modu</NavLink>}
          </>
        )}
      </nav>
      <div className="sidebar-user">
        {/* Giriş yapan admin bilgisi ve rol etiketi */}
        <div className="user-name">Admin</div>
        <div className="user-role">{role}</div>
      </div>
    </aside>
  );
}

export default Sidebar;
