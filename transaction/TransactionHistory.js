import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const TransactionHistory = ({ data }) => {
  return (
    <View style={styles.transactionHistoryContainer}>
      <Text style={styles.transactionHistoryTitle}>Transaction History:</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text>{item.name || 'Unnamed Transaction'}</Text>
            <Text>${item.amount.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({
  transactionHistoryContainer: {
    marginTop: 20,
    width: '100%',
  },
  transactionHistoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
});
