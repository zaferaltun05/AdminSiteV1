import React, { useEffect, useState } from 'react';
import { Card, Grid, Typography, Box } from '@mui/material';
import { Bar, Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';

const fetcher = (url) => fetch(url, { credentials: 'include' }).then(r => r.json());

export default function Analytics() {
  const [summary, setSummary] = useState(null);
  const [punishments, setPunishments] = useState([]);
  const [activity, setActivity] = useState({ playerActivity: [], adminActivity: [] });

  useEffect(() => {
    fetcher('/api/analytics/summary').then(setSummary);
    fetcher('/api/analytics/punishments-distribution').then(setPunishments);
    fetcher('/api/analytics/activity').then(setActivity);
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Gelişmiş İstatistikler & Analizler</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Toplam Oyuncu</Typography>
            <Typography variant="h4">{summary?.playerCount ?? '-'}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Toplam Admin</Typography>
            <Typography variant="h4">{summary?.adminCount ?? '-'}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Toplam Ceza</Typography>
            <Typography variant="h4">{summary?.punishmentCount ?? '-'}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Toplam Rapor</Typography>
            <Typography variant="h4">{summary?.reportCount ?? '-'}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Ceza Türlerine Göre Dağılım</Typography>
            <Pie
              data={{
                labels: punishments.map(p => p.type),
                datasets: [{
                  data: punishments.map(p => p.count),
                  backgroundColor: [
                    '#e57373', '#64b5f6', '#81c784', '#ffd54f', '#ba68c8', '#4db6ac', '#ff8a65'
                  ]
                }]
              }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Son 30 Gün Oyuncu Katılımı</Typography>
            <Line
              data={{
                labels: activity.playerActivity.map(a => a.date),
                datasets: [{
                  label: 'Oyuncu Katılımı',
                  data: activity.playerActivity.map(a => a.count),
                  borderColor: '#64b5f6',
                  backgroundColor: 'rgba(100,181,246,0.2)',
                  tension: 0.3
                }]
              }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Son 30 Gün Admin Aktivitesi</Typography>
            <Bar
              data={{
                labels: activity.adminActivity.map(a => a.date),
                datasets: [{
                  label: 'Admin Aktivitesi',
                  data: activity.adminActivity.map(a => a.count),
                  backgroundColor: '#ba68c8'
                }]
              }}
              options={{
                plugins: { legend: { display: false } },
                responsive: true,
                scales: { x: { beginAtZero: true }, y: { beginAtZero: true } }
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
