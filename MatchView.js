import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Alert, SafeAreaView, FlatList, navigation} from "react-native";
import TeamDao from "./model/TeamDao"
import PlayerDao from "./model/PlayerDao"
import React, { useEffect, useState } from 'react';
import Realm from "realm";
import MatchDao from './model/MatchDao'



const MatchView = ({ navigation }) => {
    const styles = StyleSheet.create({
      texttype: {fontSize:17 , fontFamily: 'Bungee-Regular', color: '#D9D9D9'},
      profileText: {
        position: 'absolute',
        top: 170,
        left: 100, 
        right: 0,
        bottom: 0,
        justifyContent: 'flex-start',
        },
  
        button1: {
          //flex: 1,
          alignItems: "center",
          backgroundColor: "#B62727",
          padding: 5,
          paddingHorizontal: 50,
          justifyContent: 'center'    
      },
  
      profileTextNames: {
          position: 'absolute',
          top: 103,
          left: 0, 
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
  
        button2Inv:{
          //flex: 1,
     alignItems: "center",
     backgroundColor: "transparent",
     padding: 0,
     paddingHorizontal: 30,
     justifyContent: 'center',
     top:500
     
  
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
  
    
 



  // let updatedPlayer = playerDao.updatePlayer()
  // let playerDelete = playerDao.deletePlayer(curr.deletePlayer)
  // let teamDao = new TeamDao()
  // let curr = teamDao.getTeamToView()
  // let team = teamDao.readTeam(curr.teamName)
  let matchDao = new MatchDao()
  let curr = matchDao.getMatchToView()
  //let match =  matchDao.readMatch(curr.match_id)

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
   
  
   <View style={styles.profileText}>
        <Text style={[styles.texttype, {fontSize: 14}]}>Match id:{curr.match_id}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Time:{curr.game_time}</Text>
        <Text style = {[styles.texttype, {fontSize:10}]}>Home Team Score:{curr.home_team_score}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Away Team Score {curr.away_team_score}</Text>
        <Text style = {[styles.texttype, {fontSize:10}]}>Home Team Blocks {curr.h_team_blocks}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Home Team Steals: {curr.h_team_steals}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Home Team Assists: {curr.h_team_assists}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Home Team Frees: {curr.h_team_frees}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Home Team Shot: {curr.h_team_shot_percent}</Text>
        <Text style = {[styles.texttype, {fontSize:10}]}>Away Team Blocks {curr.a_team_blocks}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Away Team Steals: {curr.a_team_steals}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Away Team Assists: {curr.a_team_assists}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Away Team Frees: {curr.a_team_frees}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Away Team Shot %: {curr.a_team_shot_percent}</Text>
        
        </View>
        <View style={{position: 'absolute', top: 0, left: 240, right: 0, bottom: 680, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            //inbox button, transparent
            //onPress={() => console.log("button pressed!")} 
            onPress={() => navigation.navigate('Inbox')} 
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
  
      
  

        <View style={{position: 'absolute', top: 650, left: 200, right: 20, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            //onPress={() => console.log("button pressed!")} 
            // update user 
            onPress={() => navigation.navigate('MatchEdit')}
            style={[styles.button2, {top:0}]}>
        <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}> Update Match </Text>
        </TouchableOpacity>
        </View> 
        </View> 
        
        
   )


      
};
export default MatchView
