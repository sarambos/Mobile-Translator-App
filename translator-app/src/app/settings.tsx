import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useThemeContext } from '../contexts/themeContext';

export default function SettingsScreen() {
  const {theme, toggleMode} = useThemeContext();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.label} >Dark theme</Text>
      <Switch
        value={theme.mode === 'dark'}
        onValueChange={toggleMode}
      />
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
        justifyContent: 'center',
      },
      label: {
        fontSize: 18,
        color: theme.text.color,
        marginBottom: 12,
      }
    })
  )
};
