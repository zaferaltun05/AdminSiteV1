import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNotification } from '../components/NotificationContext';

const STATUS = {
  OPEN: 'Açık',
  IN_PROGRESS: 'İşlemde',
  CLOSED: 'Kapalı'
};

function Reports() {
  const [reports, setReports] = useState([]);
  const [response, setResponse] = useState('');
  const [selected, setSelected] = useState(null);
  const notify = useNotification();

  const fetchReports = async () => {
    const res = await axios.get('/api/reports');
    setReports(res.data);
  };

  const handleRespond = async (report) => {
    await axios.post('/api/reports/respond', {
      id: report.id,
      admin: 'admin', // Giriş yapan admin adı ile değiştirilebilir
      response,
      status: 'CLOSED'
    });
    setResponse('');
    setSelected(null);
    fetchReports();
    notify('Rapor kapatıldı', 'success');
  };

  useEffect(() => {
    fetchReports();
    const interval = setInterval(fetchReports, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>Rapor/Şikayet Yönetimi</h2>
      <div className="card">
        <table style={{ width: '100%', color: '#fff', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#23272f' }}>
              <th style={{ padding: 8 }}>Oyuncu ID</th>
              <th style={{ padding: 8 }}>Mesaj</th>
              <th style={{ padding: 8 }}>Durum</th>
              <th style={{ padding: 8 }}>Admin</th>
              <th style={{ padding: 8 }}>Yanıt</th>
              <th style={{ padding: 8 }}>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(r => (
              <tr key={r.id} style={{ borderBottom: '1px solid #23272f' }}>
                <td style={{ padding: 8 }}>{r.player_id}</td>
                <td style={{ padding: 8 }}>{r.message}</td>
                <td style={{ padding: 8 }}>{STATUS[r.status]}</td>
                <td style={{ padding: 8 }}>{r.admin || '-'}</td>
                <td style={{ padding: 8 }}>{r.response || '-'}</td>
                <td style={{ padding: 8 }}>
                  {r.status !== 'CLOSED' && (
                    <button onClick={() => setSelected(r)} style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', fontWeight: 600, cursor: 'pointer' }}>
                      Yanıtla/Kapat
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selected && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setSelected(null)}>
          <div style={{ background: '#23272f', borderRadius: 12, padding: 32, minWidth: 340, maxWidth: 480 }} onClick={e => e.stopPropagation()}>
            <h3 style={{ marginBottom: 18 }}>Rapor Yanıtla/Kapat</h3>
            <div style={{ marginBottom: 12 }}><b>Oyuncu ID:</b> {selected.player_id}</div>
            <div style={{ marginBottom: 12 }}><b>Mesaj:</b> {selected.message}</div>
            <textarea value={response} onChange={e => setResponse(e.target.value)} placeholder="Yanıt yaz..." style={{ width: '100%', minHeight: 60, background: '#18191a', color: '#fff', borderRadius: 6, border: 'none', marginBottom: 12, padding: 8 }} />
            <button onClick={() => handleRespond(selected)} style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, marginRight: 8 }}>Yanıtla & Kapat</button>
            <button onClick={() => setSelected(null)} style={{ background: '#23272f', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600 }}>İptal</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reports;
