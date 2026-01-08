import express from 'express';
import db from './db.js';

const router = express.Router();

// Bakım modunu aç/kapat (sadece superadmin)
router.post('/set', async (req, res) => {
  if (!req.user || req.user.role !== 'superadmin') {
    return res.status(403).json({ error: 'Yetki yok' });
  }
  const { enabled, message } = req.body;
  try {
    await db.query('REPLACE INTO maintenance (id, enabled, message) VALUES (1, ?, ?)', [enabled ? 1 : 0, message || 'Bakımdayız.']);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Bakım modu güncellenemedi.' });
  }
});

// Bakım modu durumu
router.get('/status', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT enabled, message FROM maintenance WHERE id=1');
    if (rows.length === 0) return res.json({ enabled: false, message: '' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Bakım modu durumu alınamadı.' });
  }
});

export default router;
