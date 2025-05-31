import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { loadDarkModePreference, saveDarkModePreference } from '../settings/DarkModeStorage';

const TransactionApp = ({ isDarkMode, toggleDarkMode }) => {
  const navigation = useNavigation();
  const [balance, setBalance] = useState(0);
  const [transactionAmount, setTransactionAmount] = useState('');
  const [transactionName, setTransactionName] = useState('');
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    loadTransactionHistory();
  }, [isDarkMode]);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: isDarkMode ? styles.darkModeHeader : styles.lightModeHeader,
      headerTintColor: isDarkMode ? '#fff' : '#000',
    });
  }, [isDarkMode]);

  const loadTransactionHistory = async () => {
    try {
      const storedTransactionData = await AsyncStorage.getItem("transactionData");
      if (storedTransactionData !== null) {
        const storedData = JSON.parse(storedTransactionData);
        setTransactionHistory(storedData);
        const totalBalance = storedData.reduce((acc, transaction) => acc + transaction.amount, 0);
        setBalance(totalBalance);
      }
    } catch (error) {
      console.error("Error loading transaction history:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const transaction = parseFloat(transactionAmount);
     //debug
      console.log('Submitting transaction:', { name: transactionName, amount: transaction });

      const updatedBalance = balance + transaction;

      // Display alert if the balance will be negative
      if (updatedBalance < 0) {
        alert("Transaction amount exceeds current balance. Balance will be negative.");
      }

      // Proceed with the transaction
      setBalance(updatedBalance);
      const updatedHistory = [...transactionHistory, { name: transactionName, amount: transaction }];
      setTransactionHistory(updatedHistory);
      await AsyncStorage.setItem("transactionData", JSON.stringify(updatedHistory));
      setTransactionAmount('');
      setTransactionName('');
    } catch (error) {
      console.error("Error handling transaction:", error);
    }
  };
  

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem("transactionData");
      setTransactionHistory([]);
      setBalance(0);
    } catch (error) {
      console.error("Error clearing transaction history:", error);
    }
  };

  const navigateToSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkModeContainer : null]}>
      <TouchableOpacity onPress={navigateToSettings} style={styles.settingsButton}>
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
      <View style={styles.balanceContainer}>
        <Text style={[styles.balanceLabel, isDarkMode ? styles.darkModeText : null]}>Balance:</Text>
        <Text style={[styles.balanceValue, { color: balance >= 0 ? 'green' : 'red' }]}>
          {balance.toFixed(2)}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={transactionName}
          onChangeText={setTransactionName}
          placeholder="Transaction Name"
          style={[styles.input, isDarkMode ? styles.darkModeInput : null]}
          placeholderTextColor={isDarkMode ? '#999999' : '#666666'}
          color={isDarkMode ? '#ffffff' : '#000000'}
        />
        <TextInput
          value={transactionAmount}
          onChangeText={setTransactionAmount}
          placeholder="Transaction Amount"
          keyboardType="numeric"
          style={[styles.input, isDarkMode ? styles.darkModeInput : null]}
          placeholderTextColor={isDarkMode ? '#999999' : '#666666'}
          color={isDarkMode ? '#ffffff' : '#000000'}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSubmit} style={[styles.button, styles.submitButton]}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={clearHistory} style={[styles.button, styles.clearButton]}>
          <Text style={styles.buttonText}>Clear History</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.historyContainer}>
        <Text style={[styles.historyLabel, isDarkMode ? styles.darkModeText : null]}>Transaction History:</Text>
        {transactionHistory.map((transaction, index) => (
          <View key={index} style={styles.transactionItem}>
            <Text style={[styles.transactionName, isDarkMode ? styles.darkModeText : null]}>
              {transaction.name || 'Unnamed Transaction'}
            </Text>
                <Text style={[styles.transactionAmount, { color: transaction.amount >= 0 ? 'green' : 'red' }]}>
                 ${transaction.amount != null ? transaction.amount.toFixed(2) : '0.00'}
                </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkModeContainer: {
    backgroundColor: '#121212',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 18,
    marginRight: 10,
    color: 'black',
  },
  balanceValue: {
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    backgroundColor: 'lightblue',
  },
  clearButton: {
    backgroundColor: 'lightcoral',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  historyContainer: {
    alignItems: 'center',
  },
  historyLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 5,
  },
  transactionName: {
    fontSize: 16,
    color: 'black',
  },
  transactionAmount: {
    fontSize: 16,
  },
  settingsButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  },
  darkModeText: {
    color: 'white',
  },
  darkModeInput: {
    backgroundColor: '#333333',
    color: 'white',
  },
  lightModeHeader: {
    backgroundColor: '#f9f9f9',
  },
  darkModeHeader: {
    backgroundColor: '#424242',
  },
});

export default TransactionApp;
