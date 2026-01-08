// Kullanıcıları API'den çek ve tabloya yaz
async function loadUsers() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location = 'index.html';
    return;
  }
  try {
    const res = await fetch('http://localhost:5000/api/users', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('API hatası');
    const users = await res.json();
    const tbody = document.querySelector('#usersTable tbody');
    tbody.innerHTML = '';
    users.forEach(u => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${u.id}</td>
        <td>${u.username}</td>
        <td>${u.role}</td>
        <td><button class="button" onclick="alert('Düzenle: ${u.username}')">Düzenle</button></td>
      `;
      tbody.appendChild(tr);
    });
  } catch (e) {
    alert('Kullanıcılar yüklenemedi!');
  }
}
window.onload = loadUsers;
