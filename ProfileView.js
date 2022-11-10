import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Alert, SafeAreaView, FlatList, navigation} from "react-native";
import PlayerDao from "./model/PlayerDao.js"
import React, { useEffect, useState } from 'react';
import Realm from "realm";



const ProfileView = ({ navigation }) => {
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
  const [buttonStyle, setButtonStyle] = useState(true);
  let playerDao = new PlayerDao()
  let curr = playerDao.getProfileToView()
  //let me = playerDao.getCurrentPlayer()
  let player = playerDao.readPlayer(curr.email)
  let myProf = true
  // let updatedPlayer = playerDao.updatePlayer()
  // let playerDelete = playerDao.deletePlayer(curr.deletePlayer)
  
  let changeButton = () =>
  {
    if (curr.email != playerDao.getCurrentPlayer().email)
    {
      console.log("meow")
      myProf = false
      console.log(myProf)
      //buttonStyle1 = () => this.setButtonStyle(!buttonStyle)
  
    }
    else if (curr.email === playerDao.getCurrentPlayer().email)
    {
      console.log("bark")
      myProf = true
      console.log(myProf)
     // buttonStyle1 = () => this.setButtonStyle(buttonStyle)
    }
    return myProf;
  };


  useEffect(() =>{
  changeButton();

});

  console.log("final form", myProf);

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
    <Text style={[styles.texttype, {fontSize: 20}]}>{player.email}</Text>
    <Text style={[styles.texttype, {fontSize: 15, bottom:30}]}>{player.team_id}</Text>
   </View>
   <View style={styles.profileText}>
        <Text style={styles.texttype}>{player.first_name} {player.last_name}</Text>
        <Text style={[styles.texttype, {fontSize: 10}]}>Height: {player.height}  Weight: {player.weight} lbs</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Experience Level: </Text>
        <Text style={[styles.texttype, {fontSize: 10}]}>{player.experience}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Position:</Text>
        <Text style={[styles.texttype, {fontSize: 10}]}>{player.position}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Is Manager:</Text>
        <Text style={[styles.texttype, {fontSize:10}]}>{player.isManager}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Average Points:</Text>
        <Text style = {[styles.texttype, {fontSize:10}]}>{player.avgPoints}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Average Blocks:</Text>
        <Text style = {[styles.texttype, {fontSize:10}]}>{player.avgBlocks}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Average Steals:</Text>
        <Text style = {[styles.texttype, {fontSize:10}]}>{player.avgSteals}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Average Assists:</Text>
        <Text style = {[styles.texttype, {fontSize:10}]}>{player.assists}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Free Throw Percent:</Text>
        <Text style = {[styles.texttype, {fontSize:10}]}>{player.freethrowPrecent}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Shot Percent:</Text>
        <Text style = {[styles.texttype, {fontSize:10}]}>{player.shotPercent}</Text>


        
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

        <View style={{position: 'absolute', top: 650, left: 200, right: 20, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            //onPress={() => console.log("button pressed!")} 
            // update user 
           // onPress={() => navigation.navigate('Request')}
            style={changeButton() ? styles.button2 : styles.button1}
            onPress = {() => navigation.navigate('Request')}>
        <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}> Send Requests </Text>
        </TouchableOpacity>
        </View> 
        </View> 
        
   )


      
};
export default ProfileView
