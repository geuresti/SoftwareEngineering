import React, { useEffect, useState } from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Button, Alert, SafeAreaView, FlatList} from "react-native";

import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

db.transaction(function (txn) {
  txn.executeSql(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='user_table'",
    [],
    function (tx, res) {
      console.log('item:', res.rows.length);
      if (res.rows.length == 0) {
        txn.executeSql('DROP TABLE IF EXISTS user_table', []);
        txn.executeSql(
          'CREATE TABLE IF NOT EXISTS user_table(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_email VARCHAR(20), user_password VARCHAR(20))',
          []
        );
      }
    }
  );
});

  db.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='team_table'",
      [],
      function (tx, res) {
        console.log('item:', res.rows.length);
        if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS team_table', []);
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS team_table(team_id INTEGER PRIMARY KEY AUTOINCREMENT, team_name VARCHAR(50))',
            []
          );
        }
      }
    );
  });

  export default class dbModel{
    
    createUser(userEmail, userPassword){
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO user_table(user_email, user_password) VALUES (?,?)',
          [userEmail, userPassword],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
          }
        );
      });
    }

    updateUser(userID, userEmail, userPassword){
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE user_table set user_email=?, user_password=? where user_id=?',
          [userEmail, userPassword, userID],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
          }
        );
      });
    };
    

    deleteUser(userID){
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM  user_table where user_id=?',
          [userID],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            
          }
        );
      });

    }

    createTeam(teamname){
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO team_table(team_name) VALUES (?)',
          [teamname],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
          }
        );
      });
    }

    updateTeam(teamID, teamname){
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE team_table set team_name=? where team_id=?',
          [teamname, teamID],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
          }
        );
      });
    };
    

    deleteTeam(teamID){
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM  team_table where team_id=?',
          [teamID],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            
          }
        );
      });

    }
  }

  
    

