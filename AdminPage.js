import React, { useEffect, useState } from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Button, Alert, SafeAreaView, FlatList} from "react-native";
//import Mybutton from './pages/components/Mybutton';
//import Mytext from './pages/components/Mytext';


const AdminPage = ({ navigation }) => {
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
    button1: {
        //flex: 1,
        alignItems: "center",
        backgroundColor: "#B62727",
        padding: 5,
        paddingHorizontal: 50,
        justifyContent: 'center'    
    },
    button2: {
      //flex: 1,
      alignItems: "center",
      backgroundColor: "#CA5A37",
      padding: 5,
      paddingHorizontal: 70,
      justifyContent: 'center'

      
  },
  button3: {
    //flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 0,
    paddingHorizontal: 30,
    justifyContent: 'center'

    
}
  });
   return (
    
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
         <ImageBackground
          style={{
            //resizeMode: "center",
            height: '100%',
            width: '100%'
          }}
          source={require("./profilebg.png")}
        />


        
            <Text style={{position: 'absolute', top: 100, left: 60, right: 0, bottom: 300, color: "#FFFFFF", fontSize: 40, fontFamily: 'Bungee-Regular'}}>ADMIN PAGE</Text> 
            <View style={{position: 'absolute', top: 0, left: 10, right: 0, bottom: 110, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
            //onPress={() => console.log("button pressed!")} 
            onPress={() =>Alert.alert("live scoring")}
            style={[styles.button1,{paddingHorizontal: 70}]}>
            <Text style={{color: "#FFFFFF", fontSize: 30, fontFamily: 'Bungee-Regular'}}>LIVE SCORING</Text>
            </TouchableOpacity>
        </View>

        <View style={{position: 'absolute', top: 100, left: 10, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            onPress={() => navigation.navigate('TeamList')} 
        
            customClick={() => navigation.navigate('TeamList')}
            style={styles.button2}>
        <Text style={{color: "#FFFFFF", fontSize: 28, fontFamily: 'Bungee-Regular'}}>BROWSE TEAMS</Text>
        </TouchableOpacity>
        </View>
        <View style={{position: 'absolute', top: 300, left: 10, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            onPress={() => navigation.navigate('UserList')} 
            customClick={() => navigation.navigate('UserList')}
            style={styles.button1}>
        <Text style={{color: "#FFFFFF", fontSize: 28, fontFamily: 'Bungee-Regular'}}>BROWSE PLAYERS</Text>
        </TouchableOpacity>
        </View>
        <View style={{position: 'absolute', top: 0, left: 240, right: 0, bottom: 680, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            //inbox button, transparent
            //onPress={() => console.log("button pressed!")} 
            onPress={() =>Alert.alert("inbox")}
            style={styles.button3}>
        <Text style={{color: "transparent", fontSize: 28, fontFamily: 'Bungee-Regular'}}> </Text>
        </TouchableOpacity>
        </View>

        <View style={{position: 'absolute', top: 0, left: 380, right: 0, bottom: 680, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            //profile button, transparent
            //onPress={() => console.log("button pressed!")} 
            onPress={() =>Alert.alert("profile")}
            style={styles.button3}>
        <Text style={{color: "transparent", fontSize: 28, fontFamily: 'Bungee-Regular'}}> </Text>
        </TouchableOpacity>
  
        </View>
    </View>
    //<Login />

   );
}
export default AdminPage
