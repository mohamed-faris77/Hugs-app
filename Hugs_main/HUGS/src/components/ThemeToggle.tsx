import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="p-2 rounded-full bg-opacity-20 hover:bg-opacity-30 transition-colors"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-yellow-400" />
      ) : (
        <Moon className="h-5 w-5 text-gray-100" />
      )}
    </motion.button>
  );
}