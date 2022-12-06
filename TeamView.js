import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Alert, SafeAreaView, FlatList, navigation} from "react-native";
import TeamDao from "./model/TeamDao"
import PlayerDao from "./model/PlayerDao"
import React, { useEffect, useState } from 'react';
import Realm from "realm";
import NotificationDao from './model/NotificationDao'



const TeamView = ({ navigation }) => {
  const styles = StyleSheet.create({
    texttype: {fontSize:20 , fontFamily: 'Bungee-Regular', color: '#D9D9D9'},
    profileText: {
      position: 'absolute',
      top: 180,
      left: 190, 
      right: 0,
      bottom: 0,
      justifyContent: 'flex-start',
      },
    profileTextNames: {
        position: 'absolute',
        top: 300,
        left: 10, 
        right: 0,
        bottom: 0,
        justifyContent: 'flex-start',
      },
      players: {
        position: 'absolute',
        left: 200, 
        right: 0,
        bottom: 0,
        top: 180,
        //flex: 1,
        marginTop: 20,
        marginBottom: 100,
        justifyContent: 'flex-end',
      },
      button1: {
        //flex: 1,
        alignItems: "center",
        backgroundColor: "#B62727",
        padding: 5,
        paddingHorizontal: 50,
        justifyContent: 'center'    
    },
    button2:{
      //flex: 1,
 alignItems: "center",
 backgroundColor: "#CA5A37",
 padding: 5,
 paddingHorizontal: 50,
 justifyContent: 'center',
 bottom: 1000
 

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

    
},
button2:{
         //flex: 1,
    alignItems: "center",
    backgroundColor: "#CA5A37",
    padding: 15,
    paddingHorizontal: 30,
    justifyContent: 'center',
    bottom: 1000
    

      },


  });
  const [buttonStyle, setButtonStyle] = useState(true);
  let teamDao = new TeamDao()
  let playerDao = new PlayerDao()
  let curr = teamDao.getTeamToView()
  let team
  if(curr){
    team = teamDao.readTeam(curr.teamName)
  }
  let db;
  if(team){
    db = team.players.name;
  }
  this.state = { 
    FlatListItems: db,
  };

  let listViewItemSeparator = () => {
    return (
      <View
        style={{ height: 0, width: '100%', backgroundColor: '#171414' }}
      />
    );
  };
  
  let listItemView = (item) => {
    console.log(item, "hi")
    return (
    <View
        key={item.name}
        style={{ backgroundColor: '#383434',marginTop: 0, marginBottom: 12, bottom: 1,padding: 0, borderRadius: 1 }}>
  
    <Text style={[styles.texttype, {fontSize: 14, left: 10}]}>Player:  {item}</Text>
    </View>
    
      );
      
    };


  let changeButton = () =>
  {
    if ((curr) && !(curr.players.indexOf(playerDao.getCurrentPlayer().email) >= 0))
    {
      return(
        <TouchableOpacity
          style={styles.button1}
          onPress={ () => requestJoin()}>
          <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}> Request to Join </Text>
        </TouchableOpacity>
      )
    }
    else if ((curr) && curr.teamManager === playerDao.getCurrentPlayer().email)
    {
      return (
        <TouchableOpacity
            onPress={() => navigation.navigate('TeamEdit')}
            style={[styles.button2, {top:0}]}>
          <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}> Update Team </Text>
        </TouchableOpacity>
      )
    }
    else
      return (
        <TouchableOpacity
          style={styles.button1}
          onPress={() => {leaveTeam(); navigation.navigate('TeamList')}}>
          <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}> Leave Team </Text>
        </TouchableOpacity>
      )
  };

  let changePromotionButton = () =>
  {
    if((curr) && curr.teamManager != playerDao.getCurrentPlayer().email){
      let temp = curr.players
      if(temp.indexOf(playerDao.getCurrentPlayer().email) >= 0){
        return (
          <TouchableOpacity
            style={styles.button1}
            onPress={ () => requestPromotion()}>
            <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}> Request Promotion </Text>
          </TouchableOpacity>
        )
    }
  }
    return null
  };


  useEffect(() =>{
  changeButton();

});

var notifDao = new NotificationDao()
let requestJoin = () => {

  notifContent = playerDao.getCurrentPlayer().email + " would like to join your team!";
  notifDao.createNotification(playerDao.getCurrentPlayer().email, curr.teamManager, notifContent);

  Alert.alert(
    'Success',
    'Notification Successfully Created',
    [
      {
        text: 'Ok',
        onPress: () => navigation.navigate('Request'),
      },
    ],
    { cancelable: false }
  );
}
    
  let requestPromotion = () => {
    notifContent = playerDao.getCurrentPlayer().email + " would like to be promoted to manager";
    notifDao.createNotification(playerDao.getCurrentPlayer().email, curr.teamManager, notifContent)

    Alert.alert(
      'Success',
      'Notification Successfully Created',
      [
        {
          text: 'Ok',
          onPress: () => navigation.navigate('TeamView'),
        },
      ],
      { cancelable: false }
    );
  }        
  
  let leaveTeam = () => {
    playerDao.updatePlayerTeam(playerDao.getCurrentPlayer().email, "")
    teamDao.removePlayer(curr.teamName, playerDao.getCurrentPlayer().email)
  }
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
    <Text style={[styles.texttype, {fontSize: 30, bottom: 200}]}>Team: {team ? team.teamName:""}</Text>
    <Text style={[styles.texttype, {fontSize: 19, bottom: 230, left: 250}]}>ROSTER</Text>
    <Text style={[styles.texttype, {fontSize: 15, bottom: 270, left: 5}]}>Record: {team ? team.record:""}</Text>
   </View>
   <View style={styles.profileText}>
        <Text style={[styles.texttype, {right: 180, top: 180, fontSize: 15}]}>Manager: {team ? team.teamManager:""}</Text>
        <Text style={{color: 'white', right: 180, top: 160, fontSize: 15}}>___________________</Text>
        <Text style={[styles.texttype, {right: 180, top: 170, fontSize: 13}]}>Average Points: {team ? team.avgPoints:""}</Text>
        <Text style={[styles.texttype, {right: 180, top: 170,fontSize: 13}]}>Average Blocks: {team ? team.avgBlocks:""}</Text>
        <Text style={[styles.texttype, {right: 180, top: 170,fontSize: 13}]}>Average Steals: {team ? team.avgSteals:""}</Text>
        <Text style={[styles.texttype, {right: 180, top: 170,fontSize: 13}]}>Average Assists: {team ? team.assists:""}</Text>
        <Text style={[styles.texttype, {right: 180, top: 170,fontSize: 13}]}>Free Throw Percent: {team ? team.freethrowPrecent:""}</Text>
        <Text style={[styles.texttype, {right: 180, top: 170,fontSize: 13}]}>Shot Percent: {team ? team.shotPercent:""}</Text>
        </View>

        <SafeAreaView style={styles.players}>
          <FlatList
            data={team ? team.players.filter(function(e) { return e !== "" }):""} 
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => listItemView(item)}
          />
          </SafeAreaView>
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
            onPress={() => navigation.navigate('ProfileView')} 
            style={styles.button3}>
        <Text style={{color: "white", fontSize: 30, fontFamily: 'Bungee-Regular'}}> Profile </Text>
        </TouchableOpacity>
        </View>

        <View style={{position: 'absolute', top: 650, left: 200, right: 20, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
          {changeButton()}
        </View> 

        <View style={{position: 'absolute', top: 650, left: 20, right: 200, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
          {changePromotionButton()}
        </View> 
        </View> 
        
   )


      
};
export default TeamView
