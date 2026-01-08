import express from 'express';
import pool from './db.js';

const router = express.Router();

// Anlık online oyuncular
router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM players WHERE online = 1');
  res.json(rows);
});

export default router;
