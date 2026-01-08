// Dashboard istatistiklerini API'den çek ve göster
async function loadStats() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location = 'index.html';
    return;
  }
  try {
    const res = await fetch('http://localhost:5000/api/stats', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('API hatası');
    const stats = await res.json();
    const statsDiv = document.getElementById('stats');
    statsDiv.innerHTML = '';
    stats.forEach(s => {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.minWidth = '180px';
      card.innerHTML = `<div style='color:#aaa;font-size:14px;'>${s.title}</div><div style='font-size:32px;font-weight:600;'>${s.value}</div>`;
      statsDiv.appendChild(card);
    });
  } catch (e) {
    alert('Dashboard verileri yüklenemedi!');
  }
}
window.onload = loadStats;
