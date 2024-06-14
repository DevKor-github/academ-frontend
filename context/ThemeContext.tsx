"use client";

import { createContext, useLayoutEffect, useState } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'light', setTheme: () => { } });

const Dark = ({ children } : { children : React.ReactNode} ) => {
  
  const [_, setTheme] = useState('dark');

  return (
    <ThemeContext.Provider value={{ theme : 'dark' , setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

const ThemeProvider = ({ children } : { children : React.ReactNode} ) => {
  const [theme, setTheme] = useState('light');

  useLayoutEffect(() => {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const userPrefersDark = localStorage.getItem('theme') === 'dark';

    const updateTheme = () => {
      const userPrefersDark = localStorage.getItem('theme') === 'dark';
      
      if (systemPrefersDark.matches || userPrefersDark) {
        setTheme('dark');
        document.documentElement.classList.add('dark');
      } else {
        setTheme('light');
        document.documentElement.classList.remove('dark');
      }
    };

    updateTheme(); // Initial check
    systemPrefersDark.addEventListener('change', updateTheme); // Listen for changes

    if (systemPrefersDark.matches || userPrefersDark) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme : (theme === 'dark' ? 'dark' : 'light' ), setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext, Dark };