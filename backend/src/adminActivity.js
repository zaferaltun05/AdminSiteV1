import express from 'express';
import pool from './db.js';

const router = express.Router();

// Admin aktivite kaydı ekle
router.post('/', async (req, res) => {
  const { admin, action, details } = req.body;
  await pool.query('INSERT INTO admin_activity (admin, action, details) VALUES (?, ?, ?)', [admin, action, details]);
  res.json({ success: true });
});

// Son admin aktiviteleri getir
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM admin_activity ORDER BY created_at DESC LIMIT 200');
  res.json(rows);
});

export default router;
