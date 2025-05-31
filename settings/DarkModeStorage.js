// DarkModeStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveDarkModePreference = async (isDarkMode) => {
  try {
    await AsyncStorage.setItem('darkModePreference', JSON.stringify(isDarkMode));
  } catch (error) {
    console.error('Error saving dark mode preference:', error);
  }
};

export const loadDarkModePreference = async () => {
  try {
    const darkModePreference = await AsyncStorage.getItem('darkModePreference');
    return darkModePreference !== null ? JSON.parse(darkModePreference) : false;
  } catch (error) {
    console.error('Error loading dark mode preference:', error);
    return false;
  }
};
