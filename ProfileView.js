import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Alert, SafeAreaView, FlatList, navigation} from "react-native";
import PlayerDao from "./model/PlayerDao.js"
import React, { useEffect, useState } from 'react';
//import Mybutton from './pages/components/Mybutton';
//import Mytext from './pages/components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';
import Realm from "realm";
import dbModel from './dbModel';

const ProfileView = ({ navigation }) => {
  const styles = StyleSheet.create({
    texttype: {fontSize:25 , fontFamily: 'Bungee-Regular', color: '#D9D9D9'},
    profileText: {
      position: 'absolute',
      top: 190,
      left: 150, 
      right: 0,
      bottom: 0,
      justifyContent: 'flex-start',
      },
    profileTextNames: {
        position: 'absolute',
        top: 103,
        left: 10, 
        right: 0,
        bottom: 500,
        justifyContent: 'flex-start',
      },
      button2:{
         //flex: 1,
    alignItems: "center",
    backgroundColor: "#CA5A37",
    padding: 0,
    paddingHorizontal: 30,
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

  let playerDao = new PlayerDao()
  let curr = playerDao.getCurrentPlayer()
  let player = playerDao.readPlayer(curr.email)
  // let updatedPlayer = playerDao.updatePlayer()
  // let playerDelete = playerDao.deletePlayer(curr.deletePlayer)
  

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
   <View style={{ position: 'absolute', top: 200, left: 50, height: 30, width: 30, resizeMode: 'stretch', alignItems:'center'}}>
   <Image
     source={require('./headshot3.png')}></Image>
   </View>
   <View style={styles.profileTextNames}>
    <Text style={[styles.texttype, {fontSize: 30}]}>{player.email}</Text>
    <Text style={[styles.texttype, {fontSize: 20, bottom:30}]}>{player.team_id}</Text>
   </View>
   <View style={styles.profileText}>
        <Text style={styles.texttype}>{player.first_name} {player.last_name}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Height: {player.height}  Weight: {player.weight} lbs</Text>
        <Text style={[styles.texttype, {fontSize: 18}]}>Experience Level: </Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>{player.experience}</Text>
        <Text style={[styles.texttype, {fontSize: 18}]}>Position:</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>{player.position}</Text>
        <Text style={[styles.texttype, {fontSize: 18}]}>Is Manager:</Text>
        <Text style={[styles.texttype, {fontSize:18}]}>{player.isManager}</Text>
        <Text style={[styles.texttype, {fontSize: 18}]}>Average Points:</Text>
        <Text style = {[styles.texttype, {fontSize:18}]}>{player.avgPoints}</Text>
        <Text style={[styles.texttype, {fontSize: 18}]}>Average Blocks:</Text>
        <Text style = {[styles.texttype, {fontSize:18}]}>{player.avgBlocks}</Text>
        <Text style={[styles.texttype, {fontSize: 18}]}>Average Steals:</Text>
        <Text style = {[styles.texttype, {fontSize:18}]}>{player.avgSteals}</Text>
        <Text style={[styles.texttype, {fontSize: 18}]}>Average Assists:</Text>
        <Text style = {[styles.texttype, {fontSize:18}]}>{player.assists}</Text>
        <Text style={[styles.texttype, {fontSize: 18}]}>Free Throw Percent:</Text>
        <Text style = {[styles.texttype, {fontSize:18}]}>{player.freethrowPrecent}</Text>
        <Text style={[styles.texttype, {fontSize: 18}]}>Shot Percent:</Text>
        <Text style = {[styles.texttype, {fontSize:18}]}>{player.shotPercent}</Text>


        
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
  
      
  

        <View style={{position: 'absolute', top: 650, left: 200, right: 20, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            //onPress={() => console.log("button pressed!")} 
            // update user 
            onPress={() => navigation.navigate('ProfileEdit')}
            style={styles.button2}>
        <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}> Update Player </Text>
        </TouchableOpacity>
        </View> 
        </View> 
        
   )


      
};
export default ProfileView
