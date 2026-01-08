import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNotification } from '../components/NotificationContext';

function BulkActions() {
  const [players, setPlayers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [type, setType] = useState('KICK');
  const [reason, setReason] = useState('');
  const notify = useNotification();

  const fetchPlayers = async () => {
    const res = await axios.get('/api/players');
    setPlayers(res.data);
  };

  const handleSelect = (id) => {
    setSelected(sel => sel.includes(id) ? sel.filter(s => s !== id) : [...sel, id]);
  };

  const handleBulk = async () => {
    if (selected.length === 0) return notify('Oyuncu seçin', 'error');
    await axios.post('/api/bulk-actions', {
      player_ids: selected,
      type,
      reason,
      admin: 'admin' // Giriş yapan admin adı ile değiştirilebilir
    });
    setSelected([]);
    setReason('');
    notify('Toplu işlem uygulandı', 'success');
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>Toplu İşlemler (Kick/Ban)</h2>
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 12 }}>
          <select value={type} onChange={e => setType(e.target.value)} style={{ marginRight: 12, padding: 6, borderRadius: 6 }}>
            <option value="KICK">Kick</option>
            <option value="BAN">Ban</option>
          </select>
          <input value={reason} onChange={e => setReason(e.target.value)} placeholder="Sebep" style={{ padding: 6, borderRadius: 6, width: 200, marginRight: 12 }} />
          <button onClick={handleBulk} style={{ background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600 }}>Uygula</button>
        </div>
        <table style={{ width: '100%', color: '#fff', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#23272f' }}>
              <th></th>
              <th style={{ padding: 8 }}>Oyuncu Adı</th>
              <th style={{ padding: 8 }}>Steam/FiveM ID</th>
              <th style={{ padding: 8 }}>Durum</th>
            </tr>
          </thead>
          <tbody>
            {players.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #23272f' }}>
                <td style={{ padding: 8 }}>
                  <input type="checkbox" checked={selected.includes(p.id)} onChange={() => handleSelect(p.id)} />
                </td>
                <td style={{ padding: 8 }}>{p.name}</td>
                <td style={{ padding: 8 }}>{p.steam_id || p.fivem_id}</td>
                <td style={{ padding: 8 }}>
                  <span style={{ color: p.online ? '#4caf50' : '#e53935', fontWeight: 600 }}>
                    {p.online ? 'Online' : 'Offline'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BulkActions;
