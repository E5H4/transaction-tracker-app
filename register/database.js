// Database.js
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('transactions.db');

export const setupDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, fullName TEXT, email TEXT, password TEXT);'
    );
  });
};

export const registerUser = (fullName, email, password, callback) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)',
        [fullName, email, password],
        (_, result) => {
          callback(result.insertId);
        }
      );
    },
    error => {
      console.log('Error registering user:', error);
      callback(null, error);
    }
  );
};

export const loginUser = (email, password, callback) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
        (_, { rows }) => {
          callback(rows._array.length > 0, rows._array[0]);
        }
      );
    },
    error => {
      console.log('Error logging in user:', error);
      callback(false, null, error);
    }
  );
};
