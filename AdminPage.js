import React, { useEffect, useState } from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Button, Alert, SafeAreaView, FlatList} from "react-native";
import Player from './model/PlayerDao';

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
    padding: 30,
    paddingHorizontal: 18,
    justifyContent: 'center',
    top:20,
    right:40

    
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
            <View style={{position: 'absolute', top: 0, left: 10, right: 0, bottom: 200, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('CreateTeam')} 
              customClick={() => navigation.navigate('CreateTeam')}
            style={[styles.button1,{paddingHorizontal: 70}]}>
            <Text style={{color: "#FFFFFF", fontSize: 30, fontFamily: 'Bungee-Regular'}}>LIVE SCORING</Text>
            </TouchableOpacity>
        </View>

        <View style={{position: 'absolute', top: 0, left: 10, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            onPress={() => navigation.navigate('TeamList')} 
        
            customClick={() => navigation.navigate('TeamList')}
            style={styles.button2}>
        <Text style={{color: "#FFFFFF", fontSize: 28, fontFamily: 'Bungee-Regular'}}>BROWSE TEAMS</Text>
        </TouchableOpacity>
        </View>
        <View style={{position: 'absolute', top: 200, left: 10, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            onPress={() => navigation.navigate('UserList')} 
            customClick={() => navigation.navigate('UserList')}
            style={styles.button1}>
        <Text style={{color: "#FFFFFF", fontSize: 28, fontFamily: 'Bungee-Regular'}}>    BROWSE USERS    </Text>
        </TouchableOpacity>
        </View>

        <View style={{position: 'absolute', top: 400, left: 10, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            onPress={() => navigation.navigate('NotificationManager')} 
            customClick={() => navigation.navigate('NotificationManager')}
            style={styles.button2}>
        <Text style={{color: "#FFFFFF", fontSize: 28, fontFamily: 'Bungee-Regular'}}>BROWSE NOTIFS</Text>
        </TouchableOpacity>
        </View>

        <View style={{position: 'absolute', top: 600, left: 10, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            onPress={() => navigation.navigate('PlayerList')} 
            customClick={() => navigation.navigate('PlayerList')}
            style={styles.button1}>
        <Text style={{color: "#FFFFFF", fontSize: 28, fontFamily: 'Bungee-Regular'}}>  BROWSE PLAYERS  </Text>
        </TouchableOpacity>
        </View>
        <View style={{position: 'absolute', top: 0, left: 240, right: 0, bottom: 680, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            //inbox button, transparent
            //onPress={() => console.log("button pressed!")} 
            onPress={() => navigation.navigate('Inbox', {data:[]})} 
            style={styles.button3}>
        <Text style={{color: "white", fontSize: 28, fontFamily: 'Bungee-Regular'}}> Msgs</Text>
        </TouchableOpacity>
        </View>

        <View style={{position: 'absolute', top: 0, left: 405, right: 0, bottom: 680, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            //profile button, transparent
            //onPress={() => console.log("button pressed!")} 
            onPress={() => navigation.navigate('ProfileView2')} 
            //customClick={() => navigation.navigate('ProfileView')}
            style={styles.button3}>
        <Text style={{color: "white", fontSize: 30, fontFamily: 'Bungee-Regular'}}> Profile </Text>
        </TouchableOpacity>
        </View>
    </View>
    //<Login />

   );
}
export default AdminPage

