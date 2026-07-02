import React, { useEffect, useState } from "react";
import { Language } from "../data/languages";
import RNPickerSelect from 'react-native-picker-select';
import { View, StyleSheet } from "react-native";
import { useThemeContext } from "../contexts/themeContext";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Constants from "expo-constants";

type Props = {
    onLanguageChange?: (languageCode: string) => void;
};

export default function LanguageSelector({ onLanguageChange }: Props) {
    const { theme } = useThemeContext();
    const styles = getStyles(theme);
    const picker = getPickerStyles(theme);
    const [languages, setLanguages] = useState<Language[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('');
    const url = () => {
        const hostUri = Constants.expoConfig?.hostUri;
        if (hostUri) {
            const host = hostUri.split(':')[0];
            return `http://${host}:5001`;
        }
        return 'http://localhost:5001';
    };
    
    useEffect(() => {
        const fetchLanguages = async () => {
            const fetchedLangs = await getSupportedLanguages();
            setLanguages(fetchedLangs);
        }
        fetchLanguages();
    }, []);

    async function getSupportedLanguages(): Promise<Language[]> {
        try {
            const response = await fetch(`${url()}/languages`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error - status: ${response.status}`);
            }

            const languages: Language[] = await response.json();
            return languages;

        } catch (error) {
            console.error("Could not fetch languages:", error);
            return [];
        }
    }

    return (
        <View style={styles.container}>
            <RNPickerSelect
                style={picker}
                onValueChange={(code) => {
                    setSelectedLanguage(code);
                    onLanguageChange?.(code);
                }}
                items={languages.map((lang) => ({
                    label: lang.name,
                    value: lang.code
                }))}
                placeholder={{ label: 'Select language', value: null }}
                value={selectedLanguage}
                useNativeAndroidPickerStyle={false}
                Icon={() => <MaterialCommunityIcons style={styles.icon} name='chevron-down' />}
            />
        </View>
    )
}

const getStyles = (theme: any) => {
    return (
        StyleSheet.create({
            container: {
                justifyContent: 'center',
                width: 200,
            },
            icon: {
                color: theme.text.color,
                fontSize: 24,
                paddingTop: 9
            }
        })
    )
};

const getPickerStyles = (theme: any) => ({
    viewContainer: {
        backgroundColor: theme.input.backgroundColor,
    },
    iconContainer: {
        paddingRight: 10,
    },
    placeholder: {
        color: theme.input.color
    },
    inputIOS: {
        backgroundColor: theme.input.backgroundColor,
        padding: 10,
        color: theme.input.color,
    },
    inputAndroid: {
        backgroundColor: theme.input.backgroundColor,
        padding: 10,
        color: theme.input.color,
    },
});