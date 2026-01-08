import express from 'express';
import pool from './db.js';

const router = express.Router();

// Tüm oyuncuları getir
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM players');
  res.json(rows);
});

// Online oyuncuları getir
router.get('/online', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM players WHERE online = 1');
  res.json(rows);
});

// Oyuncu detay
router.get('/:id', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM players WHERE id = ?', [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ message: 'Oyuncu bulunamadı' });
  res.json(rows[0]);
});

export default router;
