import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Request from '../components/request';
import LanguageSelector from '../components/languageSelector';
import { useThemeContext } from '../contexts/themeContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { playAudio } from '../lib/playAudio';
import { isLanguageSupportedByTTS } from '../lib/supportedTTSLanguages';

export default function HomeScreen() {
  const {theme} = useThemeContext();
  const styles = getStyles(theme);
  const [text, onChangeText] = useState('');
  const [inputHeight, setInputHeight] = useState(40);
  const [sourceLanguage, setSourceLanguage] = useState<string | null>(null);
  const [targetLanguage, setTargetLanguage] = useState<string | null>(null);
  const [doTranslate, setTranslate] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const canTranslate = text.trim().length > 0 && sourceLanguage !== null && targetLanguage != null;
  const [audioPlaying, setAudioPlaying] = useState(false);
  const canSwapLanguages = sourceLanguage !== null && targetLanguage !== null;

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setAudioBlob(null); // Clear audio when languages are swapped
  }

  const handlePlayAudio = async () => {
    if (audioBlob) {
      try {
        setAudioPlaying(true);
        await playAudio(audioBlob);
      } catch (error) {
        console.error('Error playing audio:', error);
      } finally {
        setAudioPlaying(false);
      }
    }
  };
  
  return (
    <ScrollView 
      style={styles.screen}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>Translate Text Instantly</Text>
      <Text style={styles.subheading}>Choose two languages, enter text, and listen to the translated result.</Text>
      <View style={styles.card}>
        <LanguageSelector label="From" selectedLanguage={sourceLanguage} onLanguageChange={setSourceLanguage} />
        <Text style={styles.inputLabel}>Text to translate</Text>
        <TextInput
          style={[styles.input, { height: Math.max(40, inputHeight) }]}
          editable
          multiline
          placeholder='Enter text to translate.'
          onChangeText={text => onChangeText(text)}
          value={text}
          onContentSizeChange={(event) => setInputHeight(event.nativeEvent.contentSize.height)}
        />
        <TouchableOpacity 
          style={[styles.swapButton, !canSwapLanguages && styles.disabledButton]} 
          onPress={() => canSwapLanguages && swapLanguages()}
          disabled={!canSwapLanguages}
        >
          <MaterialCommunityIcons
            name="swap-vertical"
            size={24}
            color={theme.button.textColor}
          />
          <Text style={styles.swapText}>Swap Languages</Text>
        </TouchableOpacity>
        <LanguageSelector label="To" selectedLanguage={targetLanguage} onLanguageChange={setTargetLanguage} />
        <TouchableOpacity
          style={[styles.translateButton, !canTranslate && styles.disabledButton]}
          onPress={() => canTranslate && setTranslate(true)}
          disabled={!canTranslate}
          accessibilityRole="button"
        >
          <Text style={styles.translateButtonText}>Translate</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.outputCard}>
        <View style={styles.outputHeader}>
          <Text style={styles.outputTitle}>Translation</Text>
          {isLanguageSupportedByTTS(targetLanguage) && audioBlob && (
            <TouchableOpacity 
              onPress={handlePlayAudio} 
              style={[styles.audioButton, audioPlaying && styles.disabledButton]}
              disabled={audioPlaying}
            >
              <MaterialCommunityIcons
              name="volume-high"
              size={22}
              color={theme.button.textColor}
              />
            </TouchableOpacity>
          )}
        </View>
        <Request
          query={text}
          source={sourceLanguage}
          target={targetLanguage}
          doTranslate={doTranslate}
          onTranslate={() => setTranslate(false)}
          onAudioFetched={setAudioBlob} />
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const getStyles = (theme: any) => {
  return (
    StyleSheet.create({
      screen: {
        flex: 1,
        backgroundColor: theme.container.backgroundColor
      },
      container: {
        padding: 24,
        paddingBottom: 40
      },
      heading: {
        color: theme.text.color,
        fontSize: 26,
        fontWeight: "700",
        marginTop: 12,
        marginBottom: 8
      },
      subheading: {
        color: theme.icon.mutedColor,
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 24
      },
      card: {
        backgroundColor: theme.input.backgroundColor,
        borderColor: theme.input.borderColor,
        borderWidth: 1,
        borderRadius: 18,
        padding: 18,
        marginBottom: 20
      },
      inputLabel: {
        color: theme.text.color,
        fontWeight: "600",
        marginTop: 18,
        marginBottom: 8
      },
      input: {
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 12,
        padding: 14,
        backgroundColor: theme.input.backgroundColor,
        borderColor: theme.input.borderColor,
        color: theme.input.color,
        textAlignVertical: "top",
        fontSize: 16
      },
      swapButton: {
        backgroundColor: theme.button.backgroundColor,
        borderRadius: 999,
        paddingVertical:10,
        paddingHorizontal: 14,
        marginVertical: 18,
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        gap: 6
      },
      swapText: {
        color: theme.button.textColor,
        fontWeight: "600"
      },
      translateButton: {
        backgroundColor: theme.button.backgroundColor,
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: "center",
        marginTop: 22
      },
      disabledButton: {
        opacity: 0.45
      },
      translateButtonText: {
        color: theme.button.textColor,
        fontWeight: "700",
        fontSize: 16
      },
      outputCard: {
        padding: 18,
        borderRadius: 18,
        borderWidth: 1,
        backgroundColor: theme.input.backgroundColor,
        borderColor: theme.input.borderColor,
        color: theme.input.color,
        minHeight: 140
      },
      outputHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12
      },
      outputTitle: {
        color: theme.text.color,
        fontWeight: "700",
        fontSize: 18
      },
      audioButton: {
        backgroundColor: theme.button.backgroundColor,
        borderRadius: 999,
        padding: 8
      }
  })
)};