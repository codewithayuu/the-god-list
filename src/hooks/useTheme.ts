'use client';

import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check localStorage or system preference
    const saved = localStorage.getItem('conqueror_theme') as Theme | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.className = saved;
    } else {
      // Default to dark
      setTheme('dark');
      document.documentElement.className = 'dark';
    }
    setIsLoaded(true);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('conqueror_theme', newTheme);
      document.documentElement.className = newTheme;
      return newTheme;
    });
  };

  return { theme, toggleTheme, isLoaded };
}
