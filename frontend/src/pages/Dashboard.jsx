import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StatCard({ title, value, color }) {
  return (
    <div className="card" style={{ borderLeft: `6px solid ${color}`, minWidth: 180, marginRight: 24 }}>
      <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>{title}</div>
      <div style={{ fontSize: 32, fontWeight: 600 }}>{value}</div>
    </div>
  );
}


function Dashboard() {
  const [stats, setStats] = useState([
    { title: 'Online Oyuncular', value: 0, color: 'var(--success)' },
    { title: 'Bugün Giren Oyuncular', value: 0, color: 'var(--danger)' },
    { title: 'Toplam Kayıtlı Oyuncu', value: 0, color: 'var(--info)' },
    { title: 'Toplam Ekip', value: 0, color: 'var(--warning)' },
    { title: 'Toplam Admin', value: 0, color: 'var(--danger)' },
    { title: 'Toplam Event', value: 0, color: 'var(--purple)' },
  ]);

  const fetchStats = async () => {
    try {
      // API'den gerçek verileri çek
      const online = await axios.get('/api/online');
      const players = await axios.get('/api/players');
      // Dummy: admin/ekip/event sayısı sabit
      setStats([
        { title: 'Online Oyuncular', value: online.data.length, color: '#4caf50' },
        { title: 'Bugün Giren Oyuncular', value: players.data.filter(p => p.last_login && new Date(p.last_login) > Date.now() - 86400000).length, color: '#e53935' },
        { title: 'Toplam Kayıtlı Oyuncu', value: players.data.length, color: '#2196f3' },
        { title: 'Toplam Ekip', value: 8, color: '#ff9800' },
        { title: 'Toplam Admin', value: 4, color: '#e53935' },
        { title: 'Toplam Event', value: 15, color: '#9c27b0' },
      ]);
    } catch {}
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 24 }}>Dashboard</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginBottom: 32 }}>
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>
      <div className="card" style={{ minHeight: 320 }}>
        <div style={{ fontWeight: 600, marginBottom: 12 }}>Anlık Oyuncu Sayısı (Grafik)</div>
        <div style={{ height: 220, background: 'var(--input-bg)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
          {/* Grafik placeholder */}
          Grafik buraya gelecek
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
