import React, {useState, useEffect, navigation, Component} from "react";
import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Button, Alert, SafeAreaView, FlatList} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

var SQLite = require('react-native-sqlite-storage')
let db = SQLite.openDatabase({name: 'test.db', createFromLocation : "~example.db", location: 'Library'})
SQLite.enablePromise(true);



export default function Players(){

    const styles = StyleSheet.create({
        textheader: {
          color: '#111',
          fontSize: 12,
          fontWeight: '700',
      
        },
        textbottom: {
          color: '#111',
          fontSize: 18,
        },
      });

    useEffect(() => {
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
                [],
                function (tx, res) {
                    console.log('item:', res.rows.length);
                if (res.rows.length == 0) {
                    txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                    txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_email VARCHAR(20), user_password VARCHAR(20))',
                  []
                );
              }
            }
          );
        });
      }, []);
      
    let [flatListItems, setFlatListItems] = useState([]);

    useEffect(() => {
        db.transaction((tx) =>{
            tx.executeSql(
                'SELECT * FROM table_user',
                [],
                (tx, results) => {
                    var temp = [];
                for (let i = 0; i < results.rows.length; ++i)
                    temp.push(results.rows.item(i));
                    setFlatListItems(temp);
              }
            );
          });
    }, []);
        
      
    let listItemView = (item) => {
        return (
        <View
            key={item.user_id}
            style={{ backgroundColor: '#EEE', marginTop: 20, padding: 30, borderRadius: 10 }}>
        <Text style={styles.textheader}>Id</Text>
        <Text style={styles.textbottom}>{item.user_id}</Text>
      
        <Text style={styles.textheader}>Email</Text>
        <Text style={styles.textbottom}>{item.user_email}</Text>
      
        <Text style={styles.textheader}>Password</Text>
        <Text style={styles.textbottom}>{item.user_password}</Text>
      
      
        </View>
          );
        };
      
        return (
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'green' }}>
              <View style={{ flex: 1 }}>
                <FlatList
                  style={{ marginTop: 30 }}
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                  data={flatListItems}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => listItemView(item)}
                />
              </View>
            </View>
          </SafeAreaView>
        );
      };
      
