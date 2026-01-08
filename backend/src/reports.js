import express from 'express';
import pool from './db.js';

const router = express.Router();

// Tüm raporları getir
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM reports ORDER BY created_at DESC');
  res.json(rows);
});

// Rapor oluştur
router.post('/', async (req, res) => {
  const { player_id, message } = req.body;
  await pool.query('INSERT INTO reports (player_id, message) VALUES (?, ?)', [player_id, message]);
  res.json({ success: true });
});

// Raporu güncelle (admin yanıtı ve durum)
router.post('/respond', async (req, res) => {
  const { id, admin, response, status } = req.body;
  await pool.query('UPDATE reports SET admin = ?, response = ?, status = ?, updated_at = NOW() WHERE id = ?', [admin, response, status, id]);
  res.json({ success: true });
});

export default router;
