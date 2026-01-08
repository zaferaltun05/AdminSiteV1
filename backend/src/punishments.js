import express from 'express';
import pool from './db.js';

const router = express.Router();

// Belirli oyuncunun ceza geçmişi
router.get('/:player_id', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM punishments WHERE player_id = ? ORDER BY created_at DESC', [req.params.player_id]);
  res.json(rows);
});

// Ceza ekle
router.post('/', async (req, res) => {
  const { player_id, type, reason, admin } = req.body;
  if (!['KICK','BAN','JAIL','WARN','NOTE'].includes(type)) return res.status(400).json({ message: 'Geçersiz ceza tipi' });
  await pool.query('INSERT INTO punishments (player_id, type, reason, admin) VALUES (?, ?, ?, ?)', [player_id, type, reason, admin]);
  res.json({ success: true });
});

export default router;
