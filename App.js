import React, { useEffect, useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './login/LoginScreen';
import RegisterScreen from './register/RegisterScreen';
import TransactionApp from './transaction/TransactionApp';
import { setupDatabase } from './register/database';
import SettingsScreen from './settings/SettingsScreen';

const Stack = createStackNavigator();

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const loadDarkModePreference = useCallback(async () => {
    try {
      const darkModePreference = await AsyncStorage.getItem('darkModePreference');
      setIsDarkMode(darkModePreference === 'true');
    } catch (error) {
      console.error('Error loading dark mode preference:', error);
    }
  }, []);

  const toggleDarkMode = async () => {
    const newDarkModeState = !isDarkMode;
    setIsDarkMode(newDarkModeState);
    try {
      await AsyncStorage.setItem('darkModePreference', newDarkModeState.toString());
    } catch (error) {
      console.error('Error saving dark mode preference:', error);
    }
  };

  useEffect(() => {
    setupDatabase();
    loadDarkModePreference();
  }, [loadDarkModePreference]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login">
          {(props) => (
            <LoginScreen {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          )}
        </Stack.Screen>

        <Stack.Screen name="Register">
          {(props) => (
            <RegisterScreen {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          )}
        </Stack.Screen>

        <Stack.Screen name="TransactionApp">
          {(props) => (
            <TransactionApp {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          )}
        </Stack.Screen>

        <Stack.Screen name="Settings">
          {(props) => (
            <SettingsScreen {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>


//    <NavigationContainer>
//  <Stack.Navigator initialRouteName="Login">
//    <Stack.Screen name="Login">
//      {(props) => (
//        <LoginScreen {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
//      )}
//    </Stack.Screen>
//    <Stack.Screen name="TransactionApp">
//      {(props) => (
//        <TransactionApp {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
//      )}
//    </Stack.Screen>
//    <Stack.Screen name="Settings">
//      {(props) => (
//        <SettingsScreen {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
//      )}
//    </Stack.Screen>
//  </Stack.Navigator>
//</NavigationContainer>

  );
};

export default App;
