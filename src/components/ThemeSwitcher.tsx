import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-24 left-4 z-50"
    >
      <Button
        onClick={toggleTheme}
        size="lg"
        className={cn(
          "w-14 h-14 rounded-full shadow-lg border-2 transition-all duration-300",
          "hover:scale-110 active:scale-95",
          theme === 'light' 
            ? "bg-white text-gray-900 border-gray-200 hover:bg-gray-50" 
            : "bg-gray-900 text-white border-gray-700 hover:bg-gray-800"
        )}
      >
        <motion.div
          key={theme}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {theme === 'light' ? (
            <Moon className="w-6 h-6" />
          ) : (
            <Sun className="w-6 h-6" />
          )}
        </motion.div>
      </Button>
    </motion.div>
  );
}