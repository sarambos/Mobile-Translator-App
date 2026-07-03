import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { translateText } from '../lib/translate'
import { fetchAudioFromTTS } from '../lib/fetchAudio';
import { useThemeContext } from '../contexts/themeContext';
import { getLibreTranslateUrl } from '../lib/apiConfig';

type Props = {
    query: string,
    source: string | null,
    target: string | null,
    doTranslate?: boolean,
    onTranslate?: () => void,
    onAudioFetched?: (blob: Blob) => void
};

export default function Request({query, source, target, doTranslate = false, onTranslate, onAudioFetched}: Props) {
    const [translated, setTranslated] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const {theme} = useThemeContext();
    const styles = getStyles(theme);
    
        useEffect(() => {
            let mounted = true;
            const translate = async () => {
                if (!doTranslate || !query || query.trim() === '' || !source || !target) {
                    setLoading(false);
                    setError(null);
                    return;
                }
                setLoading(true);
                setError(null);
                try {
                    const t = await translateText({ q: query, source, target, apiUrl: getLibreTranslateUrl()});
                    if (!mounted) return;
                    if (typeof t === 'string') setTranslated(t);
                    else setTranslated(JSON.stringify(t));
                    
                    try {
                        const translatedText = typeof t === 'string' ? t : JSON.stringify(t);
                        const audioBlob = await fetchAudioFromTTS({ 
                            text: translatedText, 
                            language: target,
                        });
                        if (mounted && onAudioFetched) {
                            onAudioFetched(audioBlob);
                        }
                    } catch (audioError) {
                        // console.error('Failed to fetch audio:', audioError);
                        Alert.alert(
                            'Audio Fetch Error',
                            'Failed to fetch audio for the translated text. Please try again.',
                            [{ text: "OK", onPress: () => console.log("Alert dismissed") }]
                        );
                    };
                } catch (err: any) {
                    if (!mounted) return;
                    setError(String(err));
                } finally {
                    if (!mounted) return;
                    setLoading(false);
                    onTranslate?.();
                }
            };
    
            translate();
            return () => { mounted = false; };
        }, [doTranslate, query, source, target]);

    if (loading) {
        return (
            <View>
                <Text style={styles.text}>Translating...</Text>
                <ActivityIndicator size="small" color={theme.text.color} />
            </View>
        );
    }

    if (error) {
        return (
            <View>
                <Text style={{ color: "red" }}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View>
            <Text style={styles.text}>{translated || 'Translation will appear here'}</Text>
        </View>
    );
}

const getStyles = (theme: any) => {
    return (
        StyleSheet.create({
            text: {
                color: theme.input.color
            }
        })
    )
}