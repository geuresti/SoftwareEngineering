import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Button, Alert, SafeAreaView, FlatList} from "react-native";
import Realm from "realm";
import PlayerDao from "./model/PlayerDao.js"
import UserDao from "./model/UserDao.js"

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
  var userDao = new UserDao()
  let [userEmail, setUserEmail] = useState('');
  let [userPassword, setUserPassword] = useState('');

  let login_user = () => {
    let loggedUser = userDao.authenticateUser(userEmail, userPassword)
    if(loggedUser && !(userEmail.localeCompare("admin") === 0)){
      playerDao.setCurrentPlayer(userEmail)
      playerDao.setProfileToView(userEmail)
      Alert.alert(
        'Success',
        'You have logged in successfully',
        [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('Home'),
          },
        ],
        { cancelable: false }
      );
    }
    else if(loggedUser && userEmail.localeCompare("admin") === 0){
      playerDao.setCurrentPlayer(userEmail)
      playerDao.setProfileToView(userEmail)
      Alert.alert(
        'Success',
        'You have logged in successfully',
        [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('AdminPage'),
          },
        ],
        { cancelable: false }
      );
    }
    else{

      Alert.alert(
        'Log in info does not exist',
        [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('LoginScreen'),
          },
        ],
        { cancelable: false }
      );

    }
  }

  let register_user = () => {
    let checkUser = userDao.readUser(userEmail)
    if (!userEmail) {
      alert('Please fill email');
      return;
    }

    if(checkUser){
      alert('Username already exists')
      return;
    }

    if (userPassword.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }
    

    userDao.createUser(userEmail, userPassword)
    playerDao.createPlayer(userEmail)
    if (!(userEmail.localeCompare("admin") === 0))
    {
    playerDao.setCurrentPlayer(userEmail)
    playerDao.setProfileToView(userEmail)
    Alert.alert(
      'Success',
      'You are Registered Successfully',
      [

        {
          text: 'Ok',
          onPress: () => navigation.navigate('Home')
            },
            
        
      ],
      { cancelable: false }
    );
    }
    else if (userEmail.localeCompare("admin") === 0)
    {
    playerDao.setCurrentPlayer(userEmail)
    playerDao.setProfileToView(userEmail)
    alert(
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
    }
    
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

        <View style={{position: 'absolute', top: 450, left: 0, right: 200, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        
        <TouchableOpacity
            onPress={login_user}
            style={styles.button}>
        <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}>Login</Text>
        </TouchableOpacity>
        </View>
          
        <View style={{position: 'absolute', top: 450, left: 200, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            onPress={register_user}
            style={styles.button}>
        <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}>Register</Text>
        </TouchableOpacity>
            </View>
    
        
        </View>

    
        );

};

export default LoginScreen;
