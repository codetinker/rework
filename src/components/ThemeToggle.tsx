import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export function useTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return { isDark, toggleTheme };
}

export function ThemeToggleLink() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
    >
      {isDark ? (
        <>
          <Moon className="h-3.5 w-3.5 text-primary" />
          Dark
        </>
      ) : (
        <>
          <Sun className="h-3.5 w-3.5 text-primary" />
          Light
        </>
      )}
    </button>
  );
}