import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Alert, SafeAreaView, FlatList, navigation} from "react-native";
import TeamDao from "./model/TeamDao"
import PlayerDao from "./model/PlayerDao"
import React, { useEffect, useState } from 'react';
import Realm from "realm";
import MatchDao from './model/MatchDao'
import SeasonDao from './model/SeasonDao'
import StandingsDao from "./model/StandingsDao"


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
        players: {
          position: 'absolute',
          left: 90, 
          right: 0,
          bottom: 0,
          top: 470,
          //flex: 1,
          marginTop: 20,
          marginBottom: 100,
          justifyContent: 'flex-end',
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
  let seasonDao = new SeasonDao()
  let standingsDao = new StandingsDao()
  let curr = seasonDao.getSeasonToView()

  let db
  let standings_list
  if(curr){
    db = curr.matches
    standings_list = standingsDao.getStandingsDisplay(curr.id)
  }
  let listViewItemSeparator = () => {
    return (
      <View
        style={{ height: 0.2, width: '100%' }}
      />
    );
  };

  let listItemView = (item) => {
    return (
    <View
        key={item.name}
        style={{ marginTop: 0, marginBottom: 12, bottom: 1,padding: 0, borderRadius: 1 }}>
  
  <Text style={[styles.texttype, {fontSize: 15, }]}>Match {item}: {matchDao.readMatch(item).home_team} vs. {matchDao.readMatch(item).away_team}</Text>
    </View>
    
      );
      
    };
    let standingsView = (item) => {
      return (
      <View
          key={item.name}
          style={{ marginTop: 0, marginBottom: 12, bottom: 1,padding: 0, borderRadius: 1 }}>
    
    <View>
            <Text style={[styles.texttype, {fontSize: 22, textAlign: 'center'}]}>Team Name: {item[0]}</Text>
            <Text style={[styles.texttype, {fontSize: 13, textAlign: 'center'}]}>Wins: {item[1]} Ties: {item[2]} Loses: {item[3]} Points {item[4]}</Text>
            </View>
      </View>
      
        );
        
      };
  let matchDao = new MatchDao()

  let playerDao = new PlayerDao()
  let currPlayer = playerDao.getProfileToView()
  if(playerDao.getCurrentPlayer()){
    playerDao.setProfileToView(playerDao.getCurrentPlayer().email)
  }
  
  //let match =  matchDao.readMatch(curr.match_id)

  this.state = {
    FlatListItems: db, 
    FlatListItems2: standings_list
  };
  

let changeButton = () =>
{
  if((currPlayer) && currPlayer.email.localeCompare("admin") === 0){
  return(
<TouchableOpacity
//onPress={() => console.log("button pressed!")} 
// update user 
onPress={() => navigation.navigate('SeasonEdit')}
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
   
  
   <View style={[styles.profileText, {position: 'absolute'}]}>
        <Text style = {[styles.texttype, {fontSize:30, left: 60,justifyContent:'center'}]}>    Season: {curr ? curr.id:""}</Text>
        <Text style={{color: "#CA5A37", fontSize: 25, bottom: 30, alignContent:'center'}}>   ____________________________</Text>
        <Text style={[styles.texttype, {fontSize: 17}]}></Text>
        
        </View>

        <SafeAreaView  style={styles.players}>
          <FlatList
            data={curr ? curr.matches.filter(function(e) { return e !== "" }): ""} 
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => listItemView(item)}
          />
          </SafeAreaView >
          <Text style={{position: 'absolute', color: "#B62727", fontSize: 25, bottom: 230, alignContent:'center'}}>   ____________________________</Text>
        <SafeAreaView  style={[styles.players, {top: 200, left: 20, marginBottom: 250}]}>
        <FlatList
            data={standings_list ? standings_list: ""} 
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => standingsView(item)}
            
          />
        </SafeAreaView >
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
            onPress={() => navigation.navigate('ProfileView')} 
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
