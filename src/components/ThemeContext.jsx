// ThemeContext.jsx - Manages custom theme colors for the application
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../lib/api';

const ThemeContext = createContext(null);

// Default theme colors
const DEFAULT_THEME = {
  primaryColor: '#3B82F6', // Blue
  secondaryColor: '#10B981', // Green/Emerald
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Try to load from localStorage first
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('biportal-theme');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          return DEFAULT_THEME;
        }
      }
    }
    return DEFAULT_THEME;
  });
  
  const [loading, setLoading] = useState(false);

  // Apply theme colors to CSS variables
  const applyTheme = useCallback((themeColors) => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      
      // Set primary color and its variants
      root.style.setProperty('--theme-primary', themeColors.primaryColor);
      root.style.setProperty('--theme-primary-light', adjustColor(themeColors.primaryColor, 40));
      root.style.setProperty('--theme-primary-dark', adjustColor(themeColors.primaryColor, -20));
      root.style.setProperty('--theme-primary-rgb', hexToRgb(themeColors.primaryColor));
      
      // Set secondary color and its variants
      root.style.setProperty('--theme-secondary', themeColors.secondaryColor);
      root.style.setProperty('--theme-secondary-light', adjustColor(themeColors.secondaryColor, 40));
      root.style.setProperty('--theme-secondary-dark', adjustColor(themeColors.secondaryColor, -20));
      root.style.setProperty('--theme-secondary-rgb', hexToRgb(themeColors.secondaryColor));
    }
  }, []);

  // Load theme from backend on mount
  useEffect(() => {
    const loadThemeFromBackend = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      try {
        const response = await api.get('/theme');
        if (response.data?.theme) {
          const backendTheme = {
            primaryColor: response.data.theme.primaryColor || DEFAULT_THEME.primaryColor,
            secondaryColor: response.data.theme.secondaryColor || DEFAULT_THEME.secondaryColor,
          };
          setTheme(backendTheme);
          localStorage.setItem('biportal-theme', JSON.stringify(backendTheme));
          applyTheme(backendTheme);
        }
      } catch (error) {
        // If backend fails, use localStorage or default
        console.log('Using local theme settings');
        applyTheme(theme);
      }
    };

    loadThemeFromBackend();
  }, []);

  // Apply theme whenever it changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  // Update theme colors
  const updateTheme = useCallback(async (newColors) => {
    const updatedTheme = { ...theme, ...newColors };
    
    // Update locally first for immediate feedback
    setTheme(updatedTheme);
    localStorage.setItem('biportal-theme', JSON.stringify(updatedTheme));
    applyTheme(updatedTheme);

    // Then sync to backend
    setLoading(true);
    try {
      await api.put('/theme/change', {
        primaryColor: updatedTheme.primaryColor,
        secondaryColor: updatedTheme.secondaryColor,
      });
      return { success: true };
    } catch (error) {
      console.error('Failed to save theme to backend:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [theme, applyTheme]);

  // Reset to default theme
  const resetTheme = useCallback(async () => {
    setTheme(DEFAULT_THEME);
    localStorage.setItem('biportal-theme', JSON.stringify(DEFAULT_THEME));
    applyTheme(DEFAULT_THEME);

    setLoading(true);
    try {
      await api.put('/theme/change', DEFAULT_THEME);
      return { success: true };
    } catch (error) {
      console.error('Failed to reset theme:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [applyTheme]);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      updateTheme, 
      resetTheme, 
      loading,
      DEFAULT_THEME 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Helper function to adjust color brightness
function adjustColor(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
}

// Helper function to convert hex to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result 
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '59, 130, 246';
}

export default ThemeContext;
