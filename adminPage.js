import React from "react";
import Login from "./login.js";
import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Button, Alert} from "react-native";


export default function App(){
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
      paddingHorizontal: 32,
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


        <View style={{position: 'absolute', top: 0, left: 10, right: 0, bottom: 190, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: "#FFFFFF", fontSize: 30, fontFamily: 'Bungee-Regular', bottom: 0}}>ADMIN PAGE</Text>
        <TouchableOpacity
            //onPress={() => console.log("button pressed!")} 
            onPress={() =>Alert.alert("live scoring")}
            style={styles.button1}>
        <Text style={{color: "#FFFFFF", fontSize: 30, fontFamily: 'Bungee-Regular'}}>LIVE SCORING</Text>
        </TouchableOpacity>
  
        </View>
        <View style={{position: 'absolute', top: 100, left: 10, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            //onPress={() => console.log("button pressed!")} 
            onPress={() =>Alert.alert("players")}
            style={styles.button2}>
        <Text style={{color: "#FFFFFF", fontSize: 28, fontFamily: 'Bungee-Regular'}}>BROwSE PLAYERS</Text>
        </TouchableOpacity>
        </View>
        <View style={{position: 'absolute', top: 300, left: 10, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            //onPress={() => console.log("button pressed!")} 
            onPress={() =>Alert.alert("teams")}
            style={styles.button1}>
        <Text style={{color: "#FFFFFF", fontSize: 28, fontFamily: 'Bungee-Regular'}}>BROwSE TEAMS</Text>
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