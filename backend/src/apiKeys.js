import express from 'express';
import db from './db.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// API anahtarı oluşturma (sadece superadmin)
router.post('/create', async (req, res) => {
  if (!req.user || req.user.role !== 'superadmin') {
    return res.status(403).json({ error: 'Yetki yok' });
  }
  const key = uuidv4();
  try {
    await db.query('INSERT INTO api_keys (key, created_by) VALUES (?, ?)', [key, req.user.id]);
    res.json({ key });
  } catch (err) {
    res.status(500).json({ error: 'Anahtar oluşturulamadı.' });
  }
});

// API anahtarlarını listele (sadece superadmin)
router.get('/list', async (req, res) => {
  if (!req.user || req.user.role !== 'superadmin') {
    return res.status(403).json({ error: 'Yetki yok' });
  }
  try {
    const [rows] = await db.query('SELECT id, key, created_at, created_by, revoked FROM api_keys');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Anahtarlar alınamadı.' });
  }
});

// API anahtarı iptal et (revoke)
router.post('/revoke', async (req, res) => {
  if (!req.user || req.user.role !== 'superadmin') {
    return res.status(403).json({ error: 'Yetki yok' });
  }
  const { id } = req.body;
  try {
    await db.query('UPDATE api_keys SET revoked=1 WHERE id=?', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Anahtar iptal edilemedi.' });
  }
});

export default router;
