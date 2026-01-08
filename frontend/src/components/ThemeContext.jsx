import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const defaultTheme = {
  mode: 'dark',
  accent: '#e53935'
};

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? JSON.parse(saved) : defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
    document.documentElement.setAttribute('data-theme', theme.mode);
    document.documentElement.style.setProperty('--accent', theme.accent);
  }, [theme]);

  const setMode = mode => setTheme(t => ({ ...t, mode }));
  const setAccent = accent => setTheme(t => ({ ...t, accent }));

  return (
    <ThemeContext.Provider value={{ theme, setMode, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}
