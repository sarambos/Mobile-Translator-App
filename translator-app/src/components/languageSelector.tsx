import React, { useEffect, useState } from "react";
import { Language } from "../data/languages";
import RNPickerSelect from 'react-native-picker-select';
import { View, StyleSheet, Text, Alert } from "react-native";
import { useThemeContext } from "../contexts/themeContext";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { getLibreTranslateUrl } from "../lib/apiConfig";

type Props = {
    label: string;
    selectedLanguage: string | null;
    onLanguageChange: (languageCode: string) => void;
};

export default function LanguageSelector({ label, selectedLanguage, onLanguageChange }: Props) {
    const { theme } = useThemeContext();
    const styles = getStyles(theme);
    const picker = getPickerStyles(theme);
    const [languages, setLanguages] = useState<Language[]>([]);
    
    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await fetch(`${getLibreTranslateUrl()}/languages`);
                const languages: Language[] = await response.json();
                setLanguages(languages);
            } catch (error: any) {
                // console.error("Could not fetch languages:", error);
                Alert.alert(
                    'Fetch Error',
                    error.message || 'Failed to fetch languages. Please try again.',
                    [{ text: "OK", onPress: () => console.log("Alert dismissed") }]
                );
            }
        };
        fetchLanguages();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <RNPickerSelect
                style={picker}
                onValueChange={onLanguageChange}
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
            label: {
                color: theme.text.color,
                fontWeight: "600",
                marginBottom: 8
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