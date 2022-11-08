import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Button, Alert, SafeAreaView, FlatList} from "react-native";
import Realm from "realm";
import PlayerDao from "./model/PlayerDao.js"
import Player from './model/PlayerDao.js';

const realm = new Realm({path: 'logins.realm',
schema:[
    {
    name: "User",
    properties: {
        username: "string",
        pass: "string",
    },
    primaryKey: "username",


    },
],

});
const realm2 = new Realm({path: 'team.realm',
schema:[
    {
    name: "Team",
    properties: {
        teamName: "string",
        //teamManager: "string",
        teamids: "string",
    },
    primaryKey: "teamName",


    },
],
schemaVersion:4
});


const LoginScreen = ({ navigation }) => {



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
  var playerDao = new PlayerDao()

  let [userEmail, setUserEmail] = useState('');
  let [userPassword, setUserPassword] = useState('');

  /*
  const addTask = () => {
    realm.write(() => {
        task1 = realm.create("Task", {
            username: userEmail,
            pass: userPassword,
        });
    });
    
};
*/

  let register_user = () => {
    //console.log(userEmail, userPassword);

    if (!userEmail) {
      alert('Please fill email');
      return;
    }
    if (userPassword.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }

    
    realm.write(() => {
        let user = realm.create("User", {username: userEmail, pass: userPassword});
      })

    
    playerDao.createPlayer(userEmail)
    playerDao.setCurrentPlayer(userEmail)
    Alert.alert(
      'Success',
      'You are Registered Successfully',
      [
        {
          text: 'Ok',
          onPress: () => navigation.navigate('AdminPage')
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

};

export default LoginScreen;
