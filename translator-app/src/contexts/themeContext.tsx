import React, { createContext, useContext, useState, useMemo } from 'react'

type ThemeMode = 'light' | 'dark'

type Theme = {
	mode: ThemeMode,
    container: {
        backgroundColor: string,
    },
    text: {
        color: string,
    },
    subTitle: {
        color: string,
    },
    icon: {
        mutedColor: string,
    },
    input:{
        borderColor: string,
        backgroundColor: string,
        color: string,
    },
    button: {
        backgroundColor: string,
        textColor: string,
    },
	switch: {
        trackColor: string,
        thumbColor: string,
    },
}

const makeLightTheme = (): Theme => ({
    mode: 'light',
    container: {
        backgroundColor: '#ffffff',
    },
    text: {
        color: '#000000',
    },
    subTitle: {
        color: '#000000',
    },
    icon: {
        mutedColor: '#888888',
    },
    input:{
        borderColor: '#000000',
        backgroundColor: '#ffffff',
        color: '#000000',
    },
    button: {
        backgroundColor: 'mediumpurple',
        textColor: '#000000',
    },
	switch: {
        trackColor: '#222222',
        thumbColor: '#ff9800',
    },
})

const makeDarkTheme = (): Theme => ({
    mode: 'dark',
    container: {
        backgroundColor: '#121212',
    },
    text: {
        color: '#ffffff',
    },
    subTitle: {
        color: '#ffffff',
    },
    icon: {
        mutedColor: '#666666',
    },
    input:{
        borderColor: '#ffffff',
        backgroundColor: '#121212',
        color: '#ffffff',
    },
    button: {
        backgroundColor: 'mediumpurple',
        textColor: '#ffffff',
    },
	switch: {
        trackColor: '#444444',
        thumbColor: '#0000ff',
    },
})

type ThemeContextValue = {
	mode: ThemeMode
	theme: Theme
	setMode: (m: ThemeMode) => void
	toggleMode: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [mode, setMode] = useState<ThemeMode>('light');

	const toggleMode = () => setMode(mode => (mode === 'light' ? 'dark' : 'light'));

	const theme = useMemo(() => (mode === 'light' ? makeLightTheme() : makeDarkTheme()), [mode]);

	const value = useMemo(() => ({ mode, theme, setMode, toggleMode }), [mode, theme]);
	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useThemeContext = () => {
	const themeContext = useContext(ThemeContext)
	if (!themeContext) throw new Error('useThemeContext must be used within ThemeProvider')
	return themeContext
}

export default ThemeProvider