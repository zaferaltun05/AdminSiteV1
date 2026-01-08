import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export function useNotification() {
  return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const notify = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(n => [...n, { id, message, type }]);
    setTimeout(() => {
      setNotifications(n => n.filter(notif => notif.id !== id));
    }, 4000);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <div style={{ position: 'fixed', top: 24, right: 24, zIndex: 9999 }}>
        {notifications.map(n => (
          <div key={n.id} style={{
            background: n.type === 'error' ? '#e53935' : n.type === 'success' ? '#4caf50' : '#23272f',
            color: '#fff',
            borderRadius: 8,
            padding: '12px 24px',
            marginBottom: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            fontWeight: 600
          }}>
            {n.message}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}
