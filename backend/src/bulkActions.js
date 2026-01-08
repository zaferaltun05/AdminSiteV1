import express from 'express';
import pool from './db.js';

const router = express.Router();

// Toplu kick/ban işlemi
const ALLOWED_ACTIONS = ['KICK','BAN','JAIL','WARN','KILL','CLOTHES'];
router.post('/', async (req, res) => {
  const { player_ids, type, reason, admin } = req.body;
  if (!ALLOWED_ACTIONS.includes(type)) return res.status(400).json({ message: 'Geçersiz işlem' });
  for (const id of player_ids) {
    if(['KICK','BAN','JAIL','WARN'].includes(type)) {
      await pool.query('INSERT INTO punishments (player_id, type, reason, admin) VALUES (?, ?, ?, ?)', [id, type, reason, admin]);
    }
    // Burada FiveM entegrasyonu ile sunucuya komut gönderilebilir (ör: KILL, CLOTHES)
  }
  res.json({ success: true });
});

export default router;
