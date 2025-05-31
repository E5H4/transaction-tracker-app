import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loadDarkModePreference, saveDarkModePreference } from './DarkModeStorage'; // Import functions from DarkModeStorage.js

const SettingsScreen = ({ isDarkMode, toggleDarkMode }) => {
  const navigation = useNavigation(); // Access navigation prop
  const [localDarkMode, setLocalDarkMode] = useState(isDarkMode);

  useEffect(() => {
    setLocalDarkMode(isDarkMode);
  }, [isDarkMode]);

  const toggleAndSaveDarkMode = async () => {
    const updatedDarkMode = !localDarkMode;
    setLocalDarkMode(updatedDarkMode);
    await saveDarkModePreference(updatedDarkMode);
    toggleDarkMode(); // Trigger update in parent component (App.js)
  };

  useEffect(() => {
    // Change header style based on dark mode
    navigation.setOptions({
      headerStyle: localDarkMode ? styles.darkModeHeader : styles.lightModeHeader,
      headerTintColor: localDarkMode ? '#fff' : '#000',
    });
  }, [localDarkMode]);

  return (
    <View style={[styles.container, localDarkMode && styles.darkModeContainer]}>
      <TouchableOpacity style={styles.button} onPress={toggleAndSaveDarkMode}>
        <Text style={styles.buttonText}>{localDarkMode ? 'Toggle Light Mode' : 'Toggle Dark Mode'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  darkModeContainer: {
    backgroundColor: '#121212',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lightModeHeader: {
    backgroundColor: '#f9f9f9', // Light mode header background color
  },
  darkModeHeader: {
    backgroundColor: '#424242', // Dark mode header background color
  },
});

export default SettingsScreen;
