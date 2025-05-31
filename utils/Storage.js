import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTransactionData = async (data) => {
  try {
    await AsyncStorage.setItem('transactionData', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving transaction data:', error);
  }
};

export const getTransactionData = async () => {
  try {
    const data = await AsyncStorage.getItem('transactionData');
    return data;
  } catch (error) {
    console.error('Error getting transaction data:', error);
    return null;
  }
};

export const clearTransactionData = async () => {
  try {
    await AsyncStorage.removeItem('transactionData');
  } catch (error) {
    console.error('Error clearing transaction data:', error);
  }
};
