import React from "react";
import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Button, Alert, SafeAreaView, FlatList} from "react-native";
import FormStyle from "../Form.style";
import { useState } from 'react';
import Realm from "realm";
//import LoginScreenAuth from "./view/screen/LoginScreenAuth"; 

/*realm = LoginRealm;  */

realm = new Realm({path: 'logins.realm',
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
const email = "someone@example.com";
const password = "Pa55w0rd";
// LoginScreenAuth.loginEmailPassword(email, password)

export default function LoginScreen({navigation}){
    let [userEmail, setUserEmail] = useState('');
    let [userPassword, setUserPassword] = useState('');
    let register_user = () => {
        if (!userEmail) {
            alert('Please fill email');
            return;
          }
          /* the email password authentication provides users the ability to log in to app w/ email address and password */
          if (userEmail !="hemannering1@loyola.edu" || userPassword != "password1234") {
            alert('Not correct user, please try again');
            return;
          }
          if (userPassword.length < 8) {
            alert('Password must be at least 8 characters');
            return;
          }
          
        let user;
        
    realm.write(() => {
        user = realm.create("User", {username: userEmail, pass: userPassword});
      })

    Alert.alert(
      'Success',
      'You are Registered Successfully',
      [
        {
          text: 'Ok',
          onPress: () => navigation.navigate(AdminPage),
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
              style = {FormStyle.input} keyboardType="email-address"
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
              style ={FormStyle.input} keyboardType="default"
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
              style={FormStyle.button}>
          <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}>Login</Text>
          </TouchableOpacity>
      
          </View>
          </View>
  
      
          );
    }