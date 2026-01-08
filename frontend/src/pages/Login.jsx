import React, { useEffect, useState } from 'react';
import { setToken } from '../utils/auth';

function Login() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Giriş öncesi localStorage temizliği
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const role = params.get('role');
    const err = params.get('error');

    if (token) {
      setToken(token);
      if (role) {
        localStorage.setItem('role', role);
      }
      window.location.href = '/';
    } else if (err) {
      setError('Discord ile giriş başarısız oldu. Lütfen tekrar deneyin.');
    }
  }, []);

  const handleDiscordLogin = () => {
    setLoading(true);
    // Giriş öncesi localStorage temizliği
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/api/discord/login';
  };

  return (
    <div style={{
      maxWidth: 380,
      margin: '100px auto',
      background: 'var(--card-bg)',
      padding: 40,
      borderRadius: 18,
      boxShadow: '0 4px 24px 0 rgba(88,101,242,0.10)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: '1.5px solid #5865F2',
    }}>
      <img src="https://cdn.jsdelivr.net/gh/discord/discord-api-docs/docs/assets/logo.svg" alt="Discord Logo" style={{ width: 64, marginBottom: 18 }} />
      <h2 style={{ textAlign: 'center', marginBottom: 18, color: '#5865F2', fontWeight: 700, fontSize: 26, letterSpacing: 0.5 }}>Discord ile Giriş</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 18, textAlign: 'center' }}>
        Yetkili panele erişmek için Discord hesabınız ile giriş yapın.
      </p>
      {error && <div style={{ color: 'var(--danger)', marginBottom: 16, fontWeight: 600, textAlign: 'center' }}>{error}</div>}
      <button
        onClick={handleDiscordLogin}
        disabled={loading}
        style={{
          width: '100%',
          background: '#5865F2',
          color: '#fff',
    </div>
  );
}

export default Login;
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          marginBottom: 6,
          transition: 'background 0.2s',
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="12" fill="#fff"/><path d="M17.472 6.218a16.318 16.318 0 0 0-3.885-1.19.07.07 0 0 0-.073.035c-.168.3-.357.691-.488 1.001a15.093 15.093 0 0 0-4.504 0 12.683 12.683 0 0 0-.494-1.001.067.067 0 0 0-.073-.035c-1.33.24-2.6.66-3.885 1.19a.064.064 0 0 0-.03.027C2.066 9.093 1.2 11.87 1.497 14.602a.08.08 0 0 0 .028.055c1.64 1.2 3.23 1.926 4.786 2.41a.077.077 0 0 0 .084-.027c.37-.51.7-1.05.978-1.617a.076.076 0 0 0-.041-.104c-.522-.198-1.017-.441-1.497-.72a.077.077 0 0 1-.008-.127c.101-.076.202-.155.298-.235a.07.07 0 0 1 .071-.01c3.14 1.44 6.53 1.44 9.63 0a.07.07 0 0 1 .072.009c.096.08.197.16.299.236a.077.077 0 0 1-.007.127c-.48.279-.975.522-1.497.72a.076.076 0 0 0-.04.104c.29.566.62 1.107.978 1.617a.076.076 0 0 0 .084.027c1.557-.484 3.147-1.21 4.786-2.41a.077.077 0 0 0 .028-.055c.38-3.18-.63-5.957-2.978-8.357a.06.06 0 0 0-.03-.027ZM8.02 14.318c-.948 0-1.723-.87-1.723-1.938 0-1.067.764-1.937 1.723-1.937 1.002 0 1.76.87 1.736 1.937 0 1.068-.734 1.938-1.736 1.938Zm7.96 0c-.948 0-1.723-.87-1.723-1.938 0-1.067.764-1.937 1.723-1.937 1.002 0 1.76.87 1.736 1.937 0 1.068-.734 1.938-1.736 1.938Z" fill="#5865F2"/></svg>
        {loading ? 'Yönlendiriliyor...' : 'Discord ile Giriş Yap'}
      </button>
