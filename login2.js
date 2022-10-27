import React, {Component, useState, useEffect, navigation} from "react";
import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Button, Alert} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

var SQLite = require('react-native-sqlite-storage')
let db = SQLite.openDatabase({name: 'test.db', createFromLocation : "~example.db", location: 'Library'})
SQLite.enablePromise(true);


export default function App({navigation}){
    const styles = StyleSheet.create({
        input: {
          borderColor: "gray",
          color: "black",
          backgroundColor: "white",
          width: "100%",
          borderWidth: 2,
          borderRadius: 10,
          padding: 10,
        },
        button: {
            //flex: 1,
            alignItems: "center",
            backgroundColor: "#171414",
            padding: 15
            
        }
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

    
    let [userEmail, setUserEmail] = useState('');
    let [userPassword, setUserPassword] = useState('');
    let register_user = () => {
        //console.log(userEmail, userPassword);

    db.transaction(function (tx) {
        tx.executeSql(
            'INSERT INTO table_user (user_email, user_password) VALUES (?,?)',
            [userEmail, userPassword],
            (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    Alert.alert(
                    'Success',
                    [
                        {
                            text: 'Ok',
                            onPress:() => navigation.navigate('./allPlayers.js'),
                        },
                    ],
                    { cancelable: false }
                    );
                } else alert('Error with registering');
                }
            );
            });
        };
    
    
   return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
         <ImageBackground
          style={{
            //resizeMode: "center",
            height: '100%',
            width: '100%'
          }}
          source={require("./bg.png")}
        />
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 500, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize:35 , fontFamily: 'Bungee-Regular', color: '#D9D9D9'}}>LOGIN</Text>
        </View>
        <View style={{position: 'absolute', top: 0, left: 0, right: 270, bottom: 250, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize:20 , fontFamily: 'monospace', color: '#D9D9D9'}}>Username</Text>
        </View>
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 90, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput 
          style = {styles.input} keyboardType="email-address"
          textAlign={'center'}
          placeholder="Email" 
          onChangeText={
            (userEmail) => setUserEmail(userEmail)
          }/>
        </View>
        <View style={{position: 'absolute', top: 50, left: 0, right: 270, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize:20 , fontFamily: 'monospace', color: '#D9D9D9'}}>Password</Text>
        </View>
        <View style={{position: 'absolute', top: 200, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          style ={styles.input} keyboardType="default"
          textAlign={'center'}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={
            (userPassword) => setUserPassword(userPassword)
          }/>
        </View>
        <View style={{position: 'absolute', top: 450, left: 200, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            //onPress={() => console.log("button pressed!")} 
            onPress={register_user}
            style={styles.button}>
        <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}>Login</Text>
        </TouchableOpacity>
  
        </View>
      </View>
    
   );

}
