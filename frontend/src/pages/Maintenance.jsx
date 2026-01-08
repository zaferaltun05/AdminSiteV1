import React, { useEffect, useState } from 'react';
import { Card, Button, Typography, Box, Switch, TextField } from '@mui/material';

export default function Maintenance() {
  const [enabled, setEnabled] = useState(false);
  const [message, setMessage] = useState('Bakımdayız.');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch('/api/maintenance/status').then(r => r.json()).then(d => {
      setEnabled(!!d.enabled);
      setMessage(d.message || 'Bakımdayız.');
    });
  }, []);

  const handleSave = async () => {
    setLoading(true);
    const res = await fetch('/api/maintenance/set', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ enabled, message })
    });
    const data = await res.json();
    setResult(data.success ? 'Güncellendi.' : (data.error || 'Hata!'));
    setLoading(false);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Otomatik Bakım Modu</Typography>
      <Card sx={{ p: 2, mb: 2 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography>Bakıma Al</Typography>
          <Switch checked={enabled} onChange={e => setEnabled(e.target.checked)} />
        </Box>
        <TextField
          label="Bakım Mesajı"
          value={message}
          onChange={e => setMessage(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        />
        <Button variant="contained" onClick={handleSave} disabled={loading} sx={{ mt: 2 }}>
          {loading ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
        {result && <Typography sx={{ mt: 2 }}>{result}</Typography>}
      </Card>
    </Box>
  );
}
