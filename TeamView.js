import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Alert, SafeAreaView, FlatList, navigation} from "react-native";
import TeamDao from "./model/TeamDao"
import PlayerDao from "./model/PlayerDao"
import React, { useEffect, useState } from 'react';
import Realm from "realm";



const TeamView = ({ navigation }) => {
  const styles = StyleSheet.create({
    texttype: {fontSize:20 , fontFamily: 'Bungee-Regular', color: '#D9D9D9'},
    profileText: {
      position: 'absolute',
      top: 100,
      left: 170, 
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
 padding: 0,
 paddingHorizontal: 30,
 justifyContent: 'center',
 bottom: 1000
 

   },
button3: {
 //flex: 1,
 alignItems: "center",
 backgroundColor: "transparent",
 padding: 0,
 paddingHorizontal: 30,
 justifyContent: 'center'

 
},
button2:{
         //flex: 1,
    alignItems: "center",
    backgroundColor: "#CA5A37",
    padding: 0,
    paddingHorizontal: 30,
    justifyContent: 'center',
    bottom: 1000
    

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
  const [buttonStyle, setButtonStyle] = useState(true);
  let teamDao = new TeamDao()
  let playerDao = new PlayerDao()
  let curr = teamDao.getTeamToView()
  //let fix = playerDao.setProfileToView(playerDao.getCurrentPlayer().email)
  let team = teamDao.readTeam(curr.teamName)
  let myProf = true

  let changeButton = () =>
  {
    if (curr.teamName != playerDao.getCurrentPlayer().team_id)
    {
      myProf = false

  
    }
    else if (curr.teamName === playerDao.getCurrentPlayer().team_id)
    {
      myProf = true
    }
    return myProf;
  };


  useEffect(() =>{
  changeButton();

});
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
    <Text style={[styles.texttype, {fontSize: 15}]}>Team: {team.teamName}</Text>
    <Text style={[styles.texttype, {fontSize: 15}]}>Manager: {team.managerName}</Text>
    <Text style={[styles.texttype, {fontSize: 15}]}>Record: {team.record}</Text>
   </View>
   <View style={styles.profileText}>
        <Text style={[styles.texttype, {fontSize: 14}]}>Average Points:</Text>
        <Text style = {[styles.texttype, {fontSize:10}]}>{team.avgPoints}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Average Blocks:</Text>
        <Text style = {[styles.texttype, {fontSize:10}]}>{team.avgBlocks}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Average Steals:</Text>
        <Text style = {[styles.texttype, {fontSize:10}]}>{team.avgSteals}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Average Assists:</Text>
        <Text style = {[styles.texttype, {fontSize:10}]}>{team.assists}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Free Throw Percent:</Text>
        <Text style = {[styles.texttype, {fontSize:10}]}>{team.freethrowPrecent}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Shot Percent:</Text>
        <Text style = {[styles.texttype, {fontSize:10}]}>{team.shotPercent}</Text>


        
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
            onPress={() => navigation.navigate('TeamEdit')}
            style={[styles.button2, {top:0}]}>
        <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}> Update Team </Text>
        </TouchableOpacity>
        </View> 

        <View style={{position: 'absolute', top: 650, left: 200, right: 20, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            //onPress={() => console.log("button pressed!")} 
            // update user 
           // onPress={() => navigation.navigate('Request')}
            style={changeButton() ? styles.button2 : styles.button1}
            onPress={ () => {navigation.navigate('Request')}}>
        <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}> Send Requests </Text>
        </TouchableOpacity>
        </View> 
        </View> 
        
   )


      
};
export default TeamView
