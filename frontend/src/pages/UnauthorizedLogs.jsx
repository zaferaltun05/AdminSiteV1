import React, { useEffect, useState } from 'react';
import { Card, Typography, Box, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

export default function UnauthorizedLogs() {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    fetch('/api/unauthorized/list', { credentials: 'include' })
      .then(r => r.json())
      .then(setLogs);
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Yetkisiz Erişim Logları</Typography>
      <Card sx={{ p: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>IP</TableCell>
              <TableCell>Kullanıcı Tarayıcı</TableCell>
              <TableCell>İstek Yolu</TableCell>
              <TableCell>Sebep</TableCell>
              <TableCell>Tarih</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map(l => (
              <TableRow key={l.id}>
                <TableCell>{l.id}</TableCell>
                <TableCell>{l.ip}</TableCell>
                <TableCell>{l.user_agent}</TableCell>
                <TableCell>{l.path}</TableCell>
                <TableCell>{l.reason}</TableCell>
                <TableCell>{new Date(l.created_at).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Box>
  );
}
