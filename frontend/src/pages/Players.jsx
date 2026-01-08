import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNotification } from '../components/NotificationContext';

function Players() {
  const [players, setPlayers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [punishments, setPunishments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const notify = useNotification();

  const fetchPlayers = async () => {
    try {
      const res = await axios.get('/api/players');
      setPlayers(res.data);
    } catch {}
  };

  const openPunishments = async (player) => {
    setSelected(player);
    setShowModal(true);
    try {
      const res = await axios.get(`/api/punishments/${player.id}`);
      setPunishments(res.data);
    } catch {
      notify('Ceza geçmişi alınamadı', 'error');
    }
  };

  useEffect(() => {
    fetchPlayers();
    const interval = setInterval(fetchPlayers, 10000);
    return () => clearInterval(interval);
  }, []);

  // Filtreleme
  const filtered = players.filter(p =>
    (!search || p.name.toLowerCase().includes(search.toLowerCase()) || (p.steam_id && p.steam_id.includes(search)) || (p.fivem_id && p.fivem_id.includes(search))) &&
    (!status || (status === 'online' ? p.online : !p.online))
  );

  return (
    <div style={{ padding: 24 }}>
      <h2>Oyuncular</h2>
      <div style={{ marginBottom: 16, display: 'flex', gap: 12 }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="İsim veya ID ara..." style={{ padding: 8, borderRadius: 6, border: 'none', background: '#18191a', color: '#fff', minWidth: 220 }} />
        <select value={status} onChange={e => setStatus(e.target.value)} style={{ padding: 8, borderRadius: 6, border: 'none', background: '#18191a', color: '#fff' }}>
          <option value="">Tümü</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
      </div>
      <div className="card">
        <table style={{ width: '100%', color: '#fff', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#23272f' }}>
              <th style={{ padding: 8, textAlign: 'left' }}>Oyuncu Adı</th>
              <th style={{ padding: 8 }}>Steam/FiveM ID</th>
              <th style={{ padding: 8 }}>Son Giriş</th>
              <th style={{ padding: 8 }}>Durum</th>
              <th style={{ padding: 8 }}>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #23272f' }}>
                <td style={{ padding: 8 }}>{p.name}</td>
                <td style={{ padding: 8 }}>{p.steam_id || p.fivem_id}</td>
                <td style={{ padding: 8 }}>{p.last_login ? new Date(p.last_login).toLocaleString() : '-'}</td>
                <td style={{ padding: 8 }}>
                  <span style={{ color: p.online ? '#4caf50' : '#e53935', fontWeight: 600 }}>
                    {p.online ? 'Online' : 'Offline'}
                  </span>
                </td>
                <td style={{ padding: 8 }}>
                  <button onClick={() => openPunishments(p)} style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', fontWeight: 600, cursor: 'pointer' }}>
                    Ceza Geçmişi
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && selected && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowModal(false)}>
          <div style={{ background: '#23272f', borderRadius: 12, padding: 32, minWidth: 340, maxWidth: 480 }} onClick={e => e.stopPropagation()}>
            <h3 style={{ marginBottom: 18 }}>{selected.name} - Ceza Geçmişi</h3>
            {punishments.length === 0 ? (
              <div style={{ color: '#aaa' }}>Ceza kaydı yok.</div>
            ) : (
              <table style={{ width: '100%', color: '#fff', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ padding: 6 }}>Tip</th>
                    <th style={{ padding: 6 }}>Sebep</th>
                    <th style={{ padding: 6 }}>Admin</th>
                    <th style={{ padding: 6 }}>Tarih</th>
                  </tr>
                </thead>
                <tbody>
                  {punishments.map(pu => (
                    <tr key={pu.id}>
                      <td style={{ padding: 6 }}>{pu.type}</td>
                      <td style={{ padding: 6 }}>{pu.reason}</td>
                      <td style={{ padding: 6 }}>{pu.admin}</td>
                      <td style={{ padding: 6 }}>{new Date(pu.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <button onClick={() => setShowModal(false)} style={{ marginTop: 18, background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }}>Kapat</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Players;
