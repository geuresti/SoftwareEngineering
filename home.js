import React, { useEffect, useState } from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Button, Alert, SafeAreaView, FlatList} from "react-native";

const Home = ({ navigation }) => {
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
        paddingHorizontal: 1,
        justifyContent: 'center'    
    },
    button2: {
      //flex: 1,
      alignItems: "center",
      backgroundColor: "#CA5A37",
      padding: 5,
      paddingHorizontal: 1,
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
        <View style={{ flex:1, position: 'absolute', top: 120, marginBottom: 20, height: 170, width: 50, resizeMode: 'stretch', alignItems:'center'}}>
        <Image
          style= {{flex: 1}}
          resizeMode="stretch"
          source={require('./basketball.jpg')}></Image>
        </View>

            <View style={{position: 'absolute', top: 0, left: 0, right: 200, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('CreateTeam')} 
              customClick={() => navigation.navigate('CreateTeam')}
            style={[styles.button1]}>
            <Text style={{color: "#FFFFFF", fontSize: 20, fontFamily: 'Bungee-Regular'}}>    CREATE TEAM    </Text>
            </TouchableOpacity>
        </View>

        <View style={{position: 'absolute', top: 200, left: 0, right: 200, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            onPress={() => navigation.navigate('TeamList')} 
        
            customClick={() => navigation.navigate('TeamList')}
            style={styles.button2}>
        <Text style={{color: "#FFFFFF", fontSize: 20, fontFamily: 'Bungee-Regular'}}>   BROWSE TEAMS    </Text>
        </TouchableOpacity>
        </View>


        <View style={{position: 'absolute', top: 400, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            onPress={() => navigation.navigate('Schedule')} 
            customClick={() => navigation.navigate('Schedule')}
            style={[styles.button1, {padding: 1}]}>
        <Text style={{color: "#FFFFFF", fontSize: 25, fontFamily: 'Bungee-Regular'}}>            SCHEDULE             </Text>
        </TouchableOpacity>
        </View>

        <View style={{position: 'absolute', top: 0, left: 200, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            onPress={() => navigation.navigate('PlayerList')} 
            customClick={() => navigation.navigate('PlayerList')}
            style={[styles.button1, {padding: 10}]}>
        <Text style={{color: "#FFFFFF", fontSize: 17, fontFamily: 'Bungee-Regular'}}>  BROWSE PLAYERS  </Text>
        </TouchableOpacity>
        </View>

        <View style={{position: 'absolute', top: 200, left: 200, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            onPress={() => navigation.navigate('SeasonManager')} 
            customClick={() => navigation.navigate('SeasonManager')}
            style={[styles.button2, {padding: 10}]}>
        <Text style={{color: "#FFFFFF", fontSize: 17, fontFamily: 'Bungee-Regular'}}>  BROWSE SEASONS  </Text>
        </TouchableOpacity>
        </View>

        
        <View style={{position: 'absolute', top: 0, left: 240, right: 0, bottom: 680, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            //inbox button, transparent
            //onPress={() => console.log("button pressed!")} 
            onPress={() => navigation.navigate('Inbox', {data:[]})} 
            style={styles.button3}>
        <Text style={{color: "white", fontSize: 14, fontFamily: 'Bungee-Regular'}}> Msgs</Text>
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
export default Home