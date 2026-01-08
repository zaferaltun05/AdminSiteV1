import express from 'express';
import db from './db.js';

const router = express.Router();

// Tüm yetkisiz erişim girişimlerini kaydet
router.post('/log', async (req, res) => {
  const { ip, userAgent, path, reason } = req.body;
  try {
    await db.query(
      'INSERT INTO unauthorized_logs (ip, user_agent, path, reason) VALUES (?, ?, ?, ?)',
      [ip, userAgent, path, reason]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Log kaydedilemedi.' });
  }
});

// Son 100 yetkisiz erişim girişimini getir (sadece admin)
router.get('/list', async (req, res) => {
  if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'superadmin')) {
    return res.status(403).json({ error: 'Yetki yok' });
  }
  try {
    const [rows] = await db.query('SELECT * FROM unauthorized_logs ORDER BY created_at DESC LIMIT 100');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Loglar alınamadı.' });
  }
});

export default router;
