import express from 'express';

const router = express.Router();

const COMMANDS = [
  { name: '/kick', desc: 'Oyuncuyu sunucudan atar', roles: ['ADMIN', 'OWNER'] },
  { name: '/ban', desc: 'Oyuncuyu banlar', roles: ['ADMIN', 'OWNER'] },
  { name: '/jail', desc: 'Oyuncuyu jail atar', roles: ['MODERATOR', 'ADMIN', 'OWNER'] },
  { name: '/warn', desc: 'Oyuncuya uyarı verir', roles: ['MODERATOR', 'ADMIN', 'OWNER'] },
  { name: '/ahelp', desc: 'Admin yardım komutu', roles: ['MODERATOR', 'ADMIN', 'OWNER'] }
];

router.get('/', (req, res) => {
  res.json(COMMANDS);
});

export default router;
