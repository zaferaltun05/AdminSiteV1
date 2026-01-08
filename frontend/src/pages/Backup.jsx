import React, { useState } from 'react';
import { Card, Button, Typography, Box, TextField } from '@mui/material';

export default function Backup() {
  const [downloading, setDownloading] = useState(false);
  const [sql, setSql] = useState('');
  const [restoring, setRestoring] = useState(false);
  const [result, setResult] = useState(null);

  const handleBackup = async () => {
    setDownloading(true);
    const res = await fetch('/api/backup/backup', { credentials: 'include' });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'backup.sql';
    a.click();
    window.URL.revokeObjectURL(url);
    setDownloading(false);
  };

  const handleRestore = async () => {
    setRestoring(true);
    const res = await fetch('/api/backup/restore', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ sql })
    });
    const data = await res.json();
    setResult(data.success ? 'Geri yükleme başarılı.' : (data.error || 'Hata!'));
    setRestoring(false);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Yedekleme & Geri Yükleme</Typography>
      <Card sx={{ p: 2, mb: 2 }}>
        <Button variant="contained" onClick={handleBackup} disabled={downloading}>
          {downloading ? 'Yedek Alınıyor...' : 'Veritabanı Yedeğini İndir'}
        </Button>
      </Card>
      <Card sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>Yedekten Geri Yükle</Typography>
        <TextField
          label="SQL Komutları"
          multiline
          minRows={6}
          value={sql}
          onChange={e => setSql(e.target.value)}
          fullWidth
          variant="outlined"
        />
        <Button variant="contained" color="warning" onClick={handleRestore} disabled={restoring || !sql} sx={{ mt: 2 }}>
          {restoring ? 'Yükleniyor...' : 'Geri Yükle'}
        </Button>
        {result && <Typography sx={{ mt: 2 }}>{result}</Typography>}
      </Card>
    </Box>
  );
}
