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
        top: 130,
        left: 30, 
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
      padding: 5,
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

  let playerDao = new PlayerDao()
  let currPlayer = playerDao.getProfileToView()
  if(playerDao.getCurrentPlayer()){
    playerDao.setProfileToView(playerDao.getCurrentPlayer().email)
  }
  let changeButton = () =>
{
  if((curr) && currPlayer.email.localeCompare("admin") === 0){
  return(
    <TouchableOpacity
    //onPress={() => console.log("button pressed!")} 
    // update user 
    onPress={() => navigation.navigate('MatchEdit')}
    style={[styles.button2, {top:0}]}>
<Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}> Update Match </Text>
</TouchableOpacity>
  )
}
}

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
        <Text style = {[styles.texttype, {fontSize:30, left: 60,justifyContent:'center'}]}>{curr ? curr.home_team:""} vs {curr ? curr.away_team:""}</Text>
        <Text style={{color: "#CA5A37", fontSize: 25, bottom: 30, alignContent:'center'}}>   ____________________________</Text>
        <Text style={[styles.texttype, {fontSize: 14,bottom: 25, left: 90}]}>Id:{curr ? curr.match_id:""}             Time:{curr ? curr.game_time:""}</Text>
        <Text style={[styles.texttype, {fontSize: 17}]}></Text>
        <Text style = {[styles.texttype, {fontSize:21, left: 40}]}> Home</Text>
        <Text style = {[styles.texttype, {fontSize:21, bottom: 55,left: 240}]}>Away</Text>
        <Text style={{color: "#B62727", fontSize: 17, bottom: 80, alignContent:'center'}}>_____________________________________________</Text>
        <Text style = {[styles.texttype, {fontSize:15, bottom: 45, left: 10}]}>Home Score:{curr ? curr.home_team_score:""}</Text>
        <Text style={[styles.texttype, {fontSize:15, bottom: 85, left: 210}]}>Away Score {curr ? curr.away_team_score:""}</Text>
        <Text style = {[styles.texttype, {fontSize:15, bottom: 85, left: 10}]}>Home Blocks {curr ? curr.h_team_blocks:""}</Text>
        <Text style = {[styles.texttype, {fontSize:15, bottom: 125, left: 210}]}>Away Blocks {curr ? curr.a_team_blocks:""}</Text>
        <Text style={[styles.texttype, {fontSize:15, bottom: 125, left: 10}]}>Home Steals: {curr ? curr.h_team_steals:""}</Text>
        <Text style={[styles.texttype, {fontSize:15, bottom: 165, left: 210}]}>Away Steals: {curr ? curr.a_team_steals:""}</Text>
        <Text style={[styles.texttype, {fontSize:15, bottom: 165, left: 10}]}>Home Assists: {curr ? curr.h_team_assists:""}</Text>
        <Text style={[styles.texttype, {fontSize:15, bottom: 205, left: 210}]}>Away Assists: {curr ? curr.a_team_assists:""}</Text>
        <Text style={[styles.texttype, {fontSize:15, bottom: 205, left: 10}]}>Home Frees: {curr ? curr.h_team_frees:""}</Text>
        <Text style={[styles.texttype, {fontSize:15, bottom: 245, left: 210}]}>Away Frees: {curr ? curr.a_team_frees:""}</Text>
        <Text style={[styles.texttype, {fontSize:15, bottom: 245, left: 10}]}>Home Shot: {curr ? curr.h_team_shot_percent:""} %</Text>
        <Text style={[styles.texttype, {fontSize:15, bottom: 285, left: 210}]}>Away Shot: {curr ? curr.a_team_shot_percent:""} %</Text>
        
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
          {changeButton()}
        </View> 
        </View> 
        
        
   )


      
};
export default MatchView
