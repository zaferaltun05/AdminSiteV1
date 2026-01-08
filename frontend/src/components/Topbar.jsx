
import React from 'react';
import { useTheme } from './ThemeContext';
import { removeToken } from '../utils/auth';

function Topbar() {
  const { theme, setMode, setAccent } = useTheme();
  const handleLogout = () => {
    removeToken();
    window.location.href = '/login';
  };
  return (
    <header className="topbar">
      <div className="topbar-user">
        <span className="user-name">Admin</span>
        <span className="user-role">MODERATOR</span>
      </div>
      <div className="topbar-status">
        <span className="status-dot" /> Sistem Aktif
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <select value={theme.mode} onChange={e => setMode(e.target.value)} style={{ background: '#18191a', color: '#fff', borderRadius: 6, border: 'none', padding: 6 }}>
          <option value="dark">Koyu</option>
          <option value="light">Açık</option>
        </select>
        <input type="color" value={theme.accent} onChange={e => setAccent(e.target.value)} style={{ width: 32, height: 32, border: 'none', background: 'none', cursor: 'pointer' }} title="Vurgu Rengi" />
        <button className="logout-btn" onClick={handleLogout}>Çıkış</button>
      </div>
    </header>
  );
}

export default Topbar;
