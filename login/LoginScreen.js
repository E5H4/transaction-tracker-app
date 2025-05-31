import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { loginUser } from '../register/database';

const LoginScreen = ({ navigation, isDarkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Update header style based on dark mode
    navigation.setOptions({
      headerStyle: isDarkMode ? styles.darkModeHeader : styles.lightModeHeader,
      headerTintColor: isDarkMode ? '#fff' : '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
  }, [isDarkMode]);

  const handleLogin = () => {
    loginUser(email, password, (success, user, error) => {
      if (success) {
        alert('Login successful!');
        navigation.navigate('TransactionApp');
      } else {
        alert('Login failed. Please check your credentials.');
      }
    });
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkModeContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkModeTitle]}>Please Log in or Register</Text>
      <TextInput
        style={[styles.input, isDarkMode && styles.darkModeInput]}
        placeholder='E-mail'
        onChangeText={(text) => setEmail(text)}
        value={email}
        autoCapitalize="none"
        placeholderTextColor={isDarkMode ? '#999999' : '#666666'}
        color={isDarkMode ? '#ffffff' : '#000000'}
      />
      <TextInput
        style={[styles.input, isDarkMode && styles.darkModeInput]}
        placeholder='Password'
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        autoCapitalize="none"
        placeholderTextColor={isDarkMode ? '#999999' : '#666666'}
        color={isDarkMode ? '#ffffff' : '#000000'}
      />
      <TouchableOpacity style={[styles.button, isDarkMode && styles.darkModeButton]} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToRegister}>
        <Text style={[styles.footerLink, isDarkMode && styles.darkModeFooterLink]}>Register</Text>
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
    paddingHorizontal: 20,
  },
  darkModeContainer: {
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'black', // Text color in light mode
  },
  darkModeTitle: {
    color: 'white', // Text color in dark mode
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginVertical: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    color: 'black', // Text color in light mode
  },
  darkModeInput: {
    backgroundColor: '#333333', // Dark gray input background color
    color: 'white', // Dark mode input text color
  },
  button: {
    backgroundColor: 'lightblue',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  darkModeButton: {
    backgroundColor: 'lightblue', // Dark mode button background color
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  footerLink: {
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
  },
  darkModeFooterLink: {
    color: 'lightblue', // Dark mode footer link color
  },
  lightModeHeader: {
    backgroundColor: '#f9f9f9', // Light mode header background color
  },
  darkModeHeader: {
    backgroundColor: '#424242', // Dark mode header background color
  },
});

export default LoginScreen;
