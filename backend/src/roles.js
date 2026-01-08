import express from 'express';
import pool from './db.js';

const router = express.Router();

// Tüm kullanıcıları ve rollerini getir
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT discord_id, username, role FROM users');
  res.json(rows);
});

// Kullanıcı rolünü güncelle
const ALL_ROLES = ['GOD','HEAD_ADMIN','ADMIN','TRIAL_ADMIN','HEAD_MOD','MOD','TRIAL_MOD','SENIOR_STAFF','STAFF','TRIALL_STAFF','OWNER','MODERATOR'];
router.post('/set', async (req, res) => {
  const { discord_id, role } = req.body;
  if (!ALL_ROLES.includes(role)) return res.status(400).json({ message: 'Geçersiz rol' });
  await pool.query('UPDATE users SET role = ? WHERE discord_id = ?', [role, discord_id]);
  res.json({ success: true });
});

export default router;
