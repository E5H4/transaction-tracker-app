// RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { registerUser } from './database';

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    registerUser(fullName, email, password, (userId, error) => {
      if (error) {
        alert('Registration failed. Please try again.');
      } else {
        alert('Registration successful!');
        navigation.navigate('Login');
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please fill in the Blanks</Text>
      <TextInput
        style={styles.input}
        placeholder='Full Name'
        onChangeText={(text) => setFullName(text)}
        value={fullName}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder='E-mail'
        onChangeText={(text) => setEmail(text)}
        value={email}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder='Confirm Password'
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginVertical: 5,
    padding: 10,
    width: '80%',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  footerLink: {
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default RegisterScreen;
