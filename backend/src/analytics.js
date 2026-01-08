import express from 'express';
import db from './db.js';

const router = express.Router();

// Genel istatistikler
router.get('/summary', async (req, res) => {
  try {
    const [playerCount] = await db.query('SELECT COUNT(*) as count FROM players');
    const [adminCount] = await db.query('SELECT COUNT(*) as count FROM users WHERE role IN ("admin", "superadmin")');
    const [punishmentCount] = await db.query('SELECT COUNT(*) as count FROM punishments');
    const [reportCount] = await db.query('SELECT COUNT(*) as count FROM reports');
    res.json({
      playerCount: playerCount[0].count,
      adminCount: adminCount[0].count,
      punishmentCount: punishmentCount[0].count,
      reportCount: reportCount[0].count
    });
  } catch (err) {
    res.status(500).json({ error: 'İstatistikler alınamadı.' });
  }
});

// Ceza türlerine göre dağılım
router.get('/punishments-distribution', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT type, COUNT(*) as count FROM punishments GROUP BY type');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Ceza dağılımı alınamadı.' });
  }
});

// Günlük oyuncu ve admin aktiviteleri
router.get('/activity', async (req, res) => {
  try {
    const [playerActivity] = await db.query('SELECT DATE(joined_at) as date, COUNT(*) as count FROM players GROUP BY DATE(joined_at) ORDER BY date DESC LIMIT 30');
    const [adminActivity] = await db.query('SELECT DATE(timestamp) as date, COUNT(*) as count FROM admin_activity GROUP BY DATE(timestamp) ORDER BY date DESC LIMIT 30');
    res.json({ playerActivity, adminActivity });
  } catch (err) {
    res.status(500).json({ error: 'Aktivite verileri alınamadı.' });
  }
});

export default router;
