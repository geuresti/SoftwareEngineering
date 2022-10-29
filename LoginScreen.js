import React, { useState } from 'react';
import { Text, View, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Alert} from "react-native";
import { openDatabase } from 'react-native-sqlite-storage';
import dbModel from './dbModel';

var db = openDatabase({ name: 'UserDatabase.db' });

const Login = ({ navigation }) => {
  dao = new dbModel()


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
    /*
      useEffect(() => {
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
      }, []);*/

  let [userEmail, setUserEmail] = useState('');
  let [userPassword, setUserPassword] = useState('');

  let register_user = () => {
    //console.log(userEmail, userPassword);

    if (!userEmail) {
      alert('Please fill email');
      return;
    }
    if (userPassword.length < 7) {
      alert('Password must be at least 8 characters');
      return;
    }

    dao.createUser(userEmail, userPassword)
    Alert.alert(
      'Success',
      'You are Registered Successfully',
      [
        {
          text: 'Ok',
          onPress: () => navigation.navigate('AdminPage'),
        },
      ],
      { cancelable: false }
    );
    
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
          }
          />
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
          }
          />
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
export default Login;
