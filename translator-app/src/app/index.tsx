import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
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

  const handleContentSizeChange = (event: { nativeEvent: { contentSize: { height: React.SetStateAction<number>; }; }; }) => {
    setInputHeight(event.nativeEvent.contentSize.height);
  };

  const handlePlayAudio = async () => {
    if (audioBlob) {
      try {
        await playAudio(audioBlob);
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.startingLanguage}>
        <LanguageSelector onLanguageChange={setSourceLanguage} />
      </View>
      <View>
        <TextInput
          style={[styles.input, { height: Math.max(40, inputHeight) }]}
          editable
          multiline
          placeholder='Enter text to translate.'
          onChangeText={text => onChangeText(text)}
          value={text}
          onContentSizeChange={handleContentSizeChange}
        />
      </View>
      <View style={styles.translatedLanguage}>
        <LanguageSelector onLanguageChange={setTargetLanguage} />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setTranslate(true)}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Translate</Text>
      </TouchableOpacity>
      <View style={styles.output}>
        <Request
          query={text}
          source={sourceLanguage}
          target={targetLanguage}
          doTranslate={doTranslate}
          onTranslate={() => setTranslate(false)}
          onAudioFetched={setAudioBlob} />
          {isLanguageSupportedByTTS(targetLanguage) && audioBlob && (
            <TouchableOpacity 
              style={styles.icon}
              onPress={handlePlayAudio}
            >
              <MaterialCommunityIcons style={styles.icon} name="bullhorn" />
            </TouchableOpacity>
          )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const getStyles = (theme: any) => {
  return (
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.container.backgroundColor,
        alignItems: 'center',
        justifyContent: 'flex-start'
      },
      startingLanguage: {
        backgroundColor: theme.container.backgroundColor,
        marginTop: 50,
        padding: 10,
      },
      translatedLanguage: {
        backgroundColor: theme.container.backgroundColor,
        padding: 10,
      },
      input: {
        width: 300,
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: theme.input.backgroundColor,
        borderColor: theme.input.borderColor,
        color: theme.input.color
      },
      output: {
        padding: 20,
        borderRadius: 5,
        borderWidth: 1,
        width: 300,
        backgroundColor: theme.input.backgroundColor,
        borderColor: theme.input.borderColor,
        color: theme.input.color
      },
      button: {
        width: 100,
        height: 50,
        marginBottom: 30,
        borderRadius: 10,
        backgroundColor: theme.button.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center'
      },
      buttonText: {
        color: theme.button.textColor,
        fontWeight: '600'
      },
      icon: {
        color: theme.icon.mutedColor,
        fontSize: 16,
        alignItems: 'flex-end'
      }
  })
)};