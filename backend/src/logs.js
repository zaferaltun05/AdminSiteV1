import express from 'express';
import pool from './db.js';

const router = express.Router();

// Tüm logları getir
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM logs ORDER BY created_at DESC LIMIT 200');
  res.json(rows);
});

// Filtreli loglar
router.get('/filter', async (req, res) => {
  const { admin, date } = req.query;
  let sql = 'SELECT * FROM logs WHERE 1=1';
  const params = [];
  if (admin) {
    sql += ' AND admin = ?';
    params.push(admin);
  }
  if (date) {
    sql += ' AND DATE(created_at) = ?';
    params.push(date);
  }
  sql += ' ORDER BY created_at DESC LIMIT 200';
  const [rows] = await pool.query(sql, params);
  res.json(rows);
});

export default router;
