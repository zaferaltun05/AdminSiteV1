import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ROLES = ['GOD','HEAD_ADMIN','ADMIN','TRIAL_ADMIN','HEAD_MOD','MOD','TRIAL_MOD','SENIOR_STAFF','STAFF','TRIALL_STAFF','OWNER','MODERATOR'];

function Roles() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    const res = await axios.get('/api/roles');
    setUsers(res.data);
  };

  const handleRoleChange = async (discord_id, newRole) => {
    setLoading(true);
    await axios.post('/api/roles/set', { discord_id, role: newRole });
    await fetchUsers();
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>Kullanıcı Yetkileri</h2>
      <div className="card">
        <table style={{ width: '100%', color: 'var(--text-light)', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--card-bg)' }}>
              <th style={{ padding: 8, textAlign: 'left' }}>Discord ID</th>
              <th style={{ padding: 8 }}>Kullanıcı Adı</th>
              <th style={{ padding: 8 }}>Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.discord_id} style={{ borderBottom: '1px solid var(--card-bg)' }}>
                <td style={{ padding: 8 }}>{u.discord_id}</td>
                <td style={{ padding: 8 }}>{u.username}</td>
                <td style={{ padding: 8 }}>
                  <select
                    value={u.role}
                    disabled={loading}
                    onChange={e => handleRoleChange(u.discord_id, e.target.value)}
                    style={{ background: 'var(--input-bg)', color: 'var(--text-light)', borderRadius: 6, padding: 6 }}
                  >
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Roles;
