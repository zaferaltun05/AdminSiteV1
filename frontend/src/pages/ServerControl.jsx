import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNotification } from '../components/NotificationContext';

function ServerControl() {
  const [status, setStatus] = useState('unknown');
  const [resources, setResources] = useState({ cpu: 0, mem: 0 });
  const notify = useNotification();

  const fetchStatus = async () => {
    const res = await axios.get('/api/server/status');
    setStatus(res.data.status);
  };
  const fetchResources = async () => {
    const res = await axios.get('/api/server/resources');
    setResources(res.data);
  };

  const handleStart = async () => {
    await axios.post('/api/server/start');
    notify('Sunucu başlatıldı', 'success');
    fetchStatus();
  };
  const handleStop = async () => {
    await axios.post('/api/server/stop');
    notify('Sunucu durduruldu', 'success');
    fetchStatus();
  };

  useEffect(() => {
    fetchStatus();
    fetchResources();
    const interval = setInterval(() => {
      fetchStatus();
      fetchResources();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>Sunucu Yönetimi</h2>
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 12 }}>
          <b>Durum:</b> <span style={{ color: status === 'active' ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}>{status}</span>
        </div>
        <button onClick={handleStart} style={{ background: 'var(--success)', color: 'var(--text-light)', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, marginRight: 12 }}>Başlat</button>
        <button onClick={handleStop} style={{ background: 'var(--danger)', color: 'var(--text-light)', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600 }}>Durdur</button>
      </div>
      <div className="card">
        <div><b>CPU Kullanımı:</b> {resources.cpu}%</div>
        <div><b>RAM Kullanımı:</b> {resources.mem}%</div>
      </div>
    </div>
  );
}

export default ServerControl;
