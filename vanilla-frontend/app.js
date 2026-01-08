// Basit router ve sayfa yükleyici
const app = document.getElementById('app');

function renderLogin() {
  app.innerHTML = `
    <div class="card" style="max-width:340px;margin:80px auto;text-align:center;">
      <img src='https://cdn.jsdelivr.net/gh/discord/discord-api-docs/docs/assets/logo.svg' alt='Discord' style='width:64px;margin-bottom:18px;'>
      <h2 style='color:#5865F2;'>Discord ile Giriş</h2>
      <p>Yetkili panele erişmek için Discord hesabınız ile giriş yapın.</p>
      <button class="button" id="discordLoginBtn">Discord ile Giriş Yap</button>
      <div id="loginError" style="color:#e53935;margin-top:12px;"></div>
    </div>
  `;
  document.getElementById('discordLoginBtn').onclick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = 'http://localhost:5000/api/discord/login';
  };
}

function renderDashboard() {
  app.innerHTML = `
    <div class="sidebar">
      <div class="sidebar-title">La' Viesta RP<br><span style='font-size:13px;'>Admin Panel</span></div>
      <ul class="sidebar-menu">
        <li>Dashboard</li>
        <li>Oyuncular</li>
        <li>Online Oyuncular</li>
        <li>Komutlar</li>
        <li>Loglar</li>
      </ul>
      <div class="sidebar-user">
        <div class="user-avatar">ZA</div>
        <div class="user-info">Zafer<br><span style='color:#5865F2;font-size:12px;'>GOD</span></div>
      </div>
    </div>
    <div class="main-content">
      <div class="topbar">
        <div class="topbar-title">Dashboard</div>
        <div class="topbar-user">Sistem Aktif <span style='color:#43b581;font-weight:bold;'>●</span> &nbsp; Zafer <span style='color:#5865F2;'>GOD</span> <button class="button" id="logoutBtn" style="margin-left:16px;">Çıkış</button></div>
      </div>
      <div class="dashboard-grid">
        <div class="dashboard-card">
          <div class="dashboard-card-title">Online Oyuncular</div>
          <div class="dashboard-card-value">0</div>
          <div class="dashboard-card-desc">Anlık güncelleniyor</div>
        </div>
        <div class="dashboard-card">
          <div class="dashboard-card-title">Bugün Giren</div>
          <div class="dashboard-card-value">421</div>
          <div class="dashboard-card-desc">Son 24 saat</div>
        </div>
        <div class="dashboard-card">
          <div class="dashboard-card-title">Toplam Oyuncu</div>
          <div class="dashboard-card-value">1211</div>
          <div class="dashboard-card-desc">Kayıtlı üye sayısı</div>
        </div>
      </div>
      <div class="dashboard-row">
        <div class="dashboard-graph">
          <div class="dashboard-graph-title">Anlık Oyuncu Sayısı</div>
          <div class="dashboard-graph-desc">Son 24 saatin anlık peak değerleri</div>
          <div class="dashboard-graph-placeholder">[ Grafik buraya gelecek ]</div>
        </div>
        <div class="dashboard-stats">
          <div class="dashboard-stats-title">Sistem İstatistikleri</div>
          <div class="dashboard-stats-list">
            <div>Toplam Ekip <span class="dashboard-stats-value">61</span></div>
            <div>Toplam Admin <span class="dashboard-stats-value">41</span></div>
            <div>Toplam Event <span class="dashboard-stats-value">0</span></div>
          </div>
        </div>
      </div>
    </div>
    <style>
      body { background: #18191a; color: #f3f3f3; }
      .sidebar { position:fixed;left:0;top:0;width:200px;height:100vh;background:#23272f;display:flex;flex-direction:column;justify-content:space-between; }
      .sidebar-title { font-size:20px;font-weight:bold;padding:24px 0 0 24px; }
      .sidebar-menu { list-style:none;padding:0 0 0 24px;margin:32px 0; }
      .sidebar-menu li { margin-bottom:18px;cursor:pointer;font-size:16px; }
      .sidebar-user { display:flex;align-items:center;padding:24px; }
      .user-avatar { width:40px;height:40px;background:#5865F2;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:18px;margin-right:12px; }
      .user-info { font-size:15px; }
      .main-content { margin-left:200px;padding:24px; }
      .topbar { display:flex;justify-content:space-between;align-items:center;margin-bottom:24px; }
      .topbar-title { font-size:24px;font-weight:bold; }
      .topbar-user { font-size:16px; }
      .dashboard-grid { display:flex;gap:24px;margin-bottom:24px; }
      .dashboard-card { background:#23272f;border-radius:12px;padding:24px;flex:1; }
      .dashboard-card-title { font-size:16px;color:#aaa;margin-bottom:8px; }
      .dashboard-card-value { font-size:32px;font-weight:bold;margin-bottom:8px; }
      .dashboard-card-desc { font-size:13px;color:#888; }
      .dashboard-row { display:flex;gap:24px; }
      .dashboard-graph { background:#23272f;border-radius:12px;padding:24px;flex:2; }
      .dashboard-graph-title { font-size:16px;color:#aaa;margin-bottom:8px; }
      .dashboard-graph-desc { font-size:13px;color:#888;margin-bottom:12px; }
      .dashboard-graph-placeholder { background:#18191a;border-radius:8px;height:180px;display:flex;align-items:center;justify-content:center;color:#5865F2;font-size:18px; }
      .dashboard-stats { background:#23272f;border-radius:12px;padding:24px;flex:1; }
      .dashboard-stats-title { font-size:16px;color:#aaa;margin-bottom:8px; }
      .dashboard-stats-list { font-size:15px; }
      .dashboard-stats-value { float:right;color:#43b581;font-weight:bold; }
      @media (max-width:900px) { .main-content { margin-left:0;padding:8px; } .sidebar { position:static;width:100%;height:auto;flex-direction:row; } .dashboard-grid, .dashboard-row { flex-direction:column;gap:12px; } }
    </style>
  `;
  document.getElementById('logoutBtn').onclick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    location.reload();
  };
}

function checkAuth() {
  const token = localStorage.getItem('token');
  if (!token) {
    renderLogin();
  } else {
    renderDashboard();
  }
}


window.onload = function() {
  // Eğer /login?token=... path'indeysek, token'ı al ve kaydet
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  // role parametresi ne gelirse gelsin, GOD olarak ayarla
  if (token) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', 'GOD');
    window.history.replaceState({}, document.title, '/');
    checkAuth();
  } else {
    checkAuth();
  }
};
