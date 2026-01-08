import express from 'express';
import { exec } from 'child_process';

const router = express.Router();

// Sunucu başlat
router.post('/start', (req, res) => {
  exec('systemctl start fivem', (err) => {
    if (err) return res.status(500).json({ message: 'Başlatılamadı' });
    res.json({ success: true });
  });
});

// Sunucu durdur
router.post('/stop', (req, res) => {
  exec('systemctl stop fivem', (err) => {
    if (err) return res.status(500).json({ message: 'Durdurulamadı' });
    res.json({ success: true });
  });
});

// Sunucu durumu
router.get('/status', (req, res) => {
  exec('systemctl is-active fivem', (err, stdout) => {
    if (err) return res.json({ status: 'unknown' });
    res.json({ status: stdout.trim() });
  });
});

// Kaynak kullanımı (örnek: CPU/RAM)
router.get('/resources', (req, res) => {
  exec('ps -C FXServer -o %cpu,%mem', (err, stdout) => {
    if (err) return res.json({ cpu: 0, mem: 0 });
    const lines = stdout.split('\n');
    if (lines.length < 2) return res.json({ cpu: 0, mem: 0 });
    const [cpu, mem] = lines[1].trim().split(/\s+/);
    res.json({ cpu: parseFloat(cpu), mem: parseFloat(mem) });
  });
});

export default router;
