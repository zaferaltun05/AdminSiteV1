// Logları API'den çek ve tabloya yaz
async function loadLogs() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location = 'index.html';
    return;
  }
  try {
    const res = await fetch('http://localhost:5000/api/logs', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('API hatası');
    const logs = await res.json();
    const tbody = document.querySelector('#logsTable tbody');
    tbody.innerHTML = '';
    logs.forEach(l => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${l.id}</td>
        <td>${new Date(l.date).toLocaleString()}</td>
        <td>${l.event}</td>
        <td>${l.username}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (e) {
    alert('Loglar yüklenemedi!');
  }
}
window.onload = loadLogs;
