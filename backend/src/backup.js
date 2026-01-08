import express from 'express';
import db from './db.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Yedek al (tüm veritabanı dump)
router.get('/backup', async (req, res) => {
  if (!req.user || req.user.role !== 'superadmin') {
    return res.status(403).json({ error: 'Yetki yok' });
  }
  try {
    // Sadece örnek: dump komutu çalıştırmak için
    const dumpFile = path.join(process.cwd(), 'backup', `backup_${Date.now()}.sql`);
    await db.query('FLUSH TABLES WITH READ LOCK');
    // Gerçek ortamda mysqldump veya benzeri kullanılmalı
    // Burada sadece örnek bir tablo dump'ı
    const [tables] = await db.query('SHOW TABLES');
    let sql = '';
    for (const t of tables) {
      const table = Object.values(t)[0];
      const [rows] = await db.query(`SELECT * FROM \`${table}\``);
      sql += `-- Dump for table ${table}\n`;
      rows.forEach(row => {
        const cols = Object.keys(row).map(k => '`' + k + '`').join(',');
        const vals = Object.values(row).map(v => v === null ? 'NULL' : `'${v}'`).join(',');
        sql += `INSERT INTO \`${table}\` (${cols}) VALUES (${vals});\n`;
      });
    }
    fs.mkdirSync(path.dirname(dumpFile), { recursive: true });
    fs.writeFileSync(dumpFile, sql);
    res.download(dumpFile, err => {
      fs.unlinkSync(dumpFile);
    });
  } catch (err) {
    res.status(500).json({ error: 'Yedek alınamadı.' });
  }
});

// Yedekten geri yükle
router.post('/restore', async (req, res) => {
  if (!req.user || req.user.role !== 'superadmin') {
    return res.status(403).json({ error: 'Yetki yok' });
  }
  // Basit örnek: SQL dosyasını çalıştırmak
  try {
    const { sql } = req.body;
    if (!sql) return res.status(400).json({ error: 'SQL eksik' });
    await db.query(sql);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Geri yükleme başarısız.' });
  }
});

export default router;
