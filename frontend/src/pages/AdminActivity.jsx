import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminActivity() {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    const res = await axios.get('/api/admin-activity');
    setLogs(res.data);
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>Admin Aktiviteleri</h2>
      <div className="card">
        <table style={{ width: '100%', color: '#fff', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#23272f' }}>
              <th style={{ padding: 8 }}>Admin</th>
              <th style={{ padding: 8 }}>İşlem</th>
              <th style={{ padding: 8 }}>Detay</th>
              <th style={{ padding: 8 }}>Tarih</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id} style={{ borderBottom: '1px solid #23272f' }}>
                <td style={{ padding: 8 }}>{log.admin}</td>
                <td style={{ padding: 8 }}>{log.action}</td>
                <td style={{ padding: 8 }}>{log.details}</td>
                <td style={{ padding: 8 }}>{new Date(log.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminActivity;
