import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { ConfigProvider } from 'antd';

type ThemeProviderState = {
    children : React.ReactNode;
}

const defaultState = {
  dark: false,
  toggleDark: () => {},
};

const ThemeContext = React.createContext(defaultState);

// Getting dark mode information from OS!
// You need macOS Mojave + Safari Technology Preview Release 68 to test this currently.
const supportsDarkMode = () => window.matchMedia('(prefers-color-scheme: dark)').matches === true;

const ThemeProvider = ({ children } : ThemeProviderState) => {
  const [dark, setDark] = useState<boolean>(false);

  const toggleDark = () => {
    localStorage.setItem('dark', JSON.stringify(!dark));
    setDark(!dark);
  };

  useEffect(() => {
    // Getting dark mode value from localStorage!
    const lsDark = JSON.parse(localStorage.getItem('dark') as string);
    if (lsDark) {
      setDark(lsDark);
    } else if (supportsDarkMode()) {
      setDark(true);
    }
  }, []);

  const antdThemeConfig:any = {
    token: {
      // default
      colorBorder: '#149494',
      colorText: '#149494',

      colorPrimary: '#149494',
      colorPrimaryActive: '#117e7e',

      colorPrimaryBorder: '#149494',
      colorPrimaryBorderHover: '#17aaaa',

      colorPrimaryText: '#149494',
      colorPrimaryTextActive: '#117e7e',
      colorPrimaryTextHover: '17aaaa',

      colorPrimaryBg: '#f7fefe',
      colorPrimaryBgHover: '#e6fcfc',
    },
  };

  const value = useMemo(() => ({ dark, toggleDark }), [dark, toggleDark]);

  return (
    <ThemeContext.Provider
      value={value}
    >
      <ConfigProvider theme={antdThemeConfig}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return themeContext;
};

export default ThemeContext;

export { ThemeProvider };
