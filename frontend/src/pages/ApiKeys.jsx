import React, { useEffect, useState } from 'react';
import { Card, Button, Table, TableHead, TableRow, TableCell, TableBody, Typography, Box } from '@mui/material';

export default function ApiKeys() {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newKey, setNewKey] = useState(null);

  const fetchKeys = async () => {
    setLoading(true);
    const res = await fetch('/api/api-keys/list', { credentials: 'include' });
    const data = await res.json();
    setKeys(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  const handleCreate = async () => {
    setLoading(true);
    const res = await fetch('/api/api-keys/create', { method: 'POST', credentials: 'include' });
    const data = await res.json();
    if (data.key) setNewKey(data.key);
    fetchKeys();
    setLoading(false);
  };

  const handleRevoke = async (id) => {
    setLoading(true);
    await fetch('/api/api-keys/revoke', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ id })
    });
    fetchKeys();
    setLoading(false);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>API Anahtarı Yönetimi</Typography>
      <Card sx={{ p: 2, mb: 2 }}>
        <Button variant="contained" onClick={handleCreate} disabled={loading}>Yeni API Anahtarı Oluştur</Button>
        {newKey && (
          <Box mt={2}>
            <Typography color="success.main">Yeni Anahtar: <b>{newKey}</b></Typography>
          </Box>
        )}
      </Card>
      <Card sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>Mevcut Anahtarlar</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Anahtar</TableCell>
              <TableCell>Oluşturulma</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell>İşlem</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {keys.map(k => (
              <TableRow key={k.id}>
                <TableCell>{k.id}</TableCell>
                <TableCell>{k.key}</TableCell>
                <TableCell>{new Date(k.created_at).toLocaleString()}</TableCell>
                <TableCell>{k.revoked ? 'İptal' : 'Aktif'}</TableCell>
                <TableCell>
                  {!k.revoked && <Button color="error" onClick={() => handleRevoke(k.id)} disabled={loading}>İptal Et</Button>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Box>
  );
}
