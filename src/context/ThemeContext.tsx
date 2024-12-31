import React, { useEffect, useState } from "react"
import { ConfigProvider} from 'antd';

type ThemeProviderState = {
    children : React.ReactNode;
}

const defaultState = {
    dark: false,
    toggleDark: () => {},
}

const ThemeContext = React.createContext(defaultState);

// Getting dark mode information from OS!
// You need macOS Mojave + Safari Technology Preview Release 68 to test this currently.
const supportsDarkMode = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches === true;
}

const ThemeProvider = ({children} : ThemeProviderState) => {
    const [dark, setDark] = useState<boolean>(false);

    const toggleDark = () => {
        localStorage.setItem("dark", JSON.stringify(!dark));
        setDark(!dark);
    }

    useEffect(() => {
        // Getting dark mode value from localStorage!
        const lsDark = JSON.parse(localStorage.getItem("dark") as string)
        if (lsDark) {
            setDark(lsDark)
        } else if (supportsDarkMode()) {
            setDark(true)
        }
    },[])

    const antdThemeConfig:any = {
        token: {
            // Seed Token
            colorPrimary: '#149494',

            // Alias Token
            colorBorder: '#149494',
        },
        components: {
            Tag: {
                colorBorder: '#149494',
                colorText: '#149494',
            },
        },
    }

    return (
        <ThemeContext.Provider
                value={{
                    dark : dark,
                    toggleDark,
                }}>
            <ConfigProvider theme={antdThemeConfig}>{children}</ConfigProvider>
        </ThemeContext.Provider>
    )
}

export default ThemeContext

export { ThemeProvider }