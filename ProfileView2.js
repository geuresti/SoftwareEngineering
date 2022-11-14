import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Alert, SafeAreaView, FlatList, navigation} from "react-native";
import PlayerDao from "./model/PlayerDao.js"
import React, { useEffect, useState } from 'react';
import NotificationDao from "./model/NotificationDao.js"
//import Mybutton from './pages/components/Mybutton';
//import Mytext from './pages/components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';
import Realm from "realm";
import dbModel from './dbModel';

const ProfileView = ({ navigation }) => {
  const styles = StyleSheet.create({
    texttype: {fontSize:17 , fontFamily: 'Bungee-Regular', color: '#D9D9D9'},
    profileText: {
      position: 'absolute',
      top: 170,
      left: 170, 
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

  let playerDao = new PlayerDao()
  let curr = playerDao.getProfileToView()
  playerDao.setProfileToView(playerDao.getCurrentPlayer().email)
  let player = playerDao.readPlayer(curr.email)
  console.log("curr is:", curr)
  console.log("player is:", player )
  // let updatedPlayer = playerDao.updatePlayer()
  // let playerDelete = playerDao.deletePlayer(curr.deletePlayer)
  let [userEmail, setUserEmail] = useState('');
  let [f_new, setFirstName] = useState('');
  let [l_new, setLastName] = useState('');
  let [id_new, setId]  = useState('');
  let [h_new, setHeight] = useState('');
  let [w_new, setWeight] = useState('');
  let [p_new, setPosition] = useState('');
  let [e_new, setExperience] = useState('');
  let [m_new, setManager] = useState('');
  let [points_new, setPoints] = useState('');
  let [blocks_new, setBlocks] = useState('');
  let [steals_new, setSteaals] = useState('');
  let [a_new, setAssists] = useState('');
  let [f_throw_per, setFrees] = useState('');
  let [s_new_percent, setPercent] = useState('')
  
  console.log(player.isManager + "is status");

  var notifDao = new NotificationDao()

  let changeButton = () =>
  {
    if (curr.email != playerDao.getCurrentPlayer().email)
    {
      myProf = false
      console.log("false")
      console.log(curr.email, playerDao.getCurrentPlayer().email)

  
    }
    else if (curr.email === playerDao.getCurrentPlayer().email)
    {
      myProf = true
      console.log("true")
    }
    return myProf;
  };


  useEffect(() =>{
  changeButton();

})

let recruitPlayerToTeam = () => {

            notifContent = playerDao.getCurrentPlayer().email + " would like to recruit you!";
            console.log(playerDao.getCurrentPlayer().email, curr.email)
            notifDao.createNotification(playerDao.getCurrentPlayer().email, curr.email, notifContent);
  
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
          };
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
    <Text style={[styles.texttype, {fontSize: 25}]}>{player.email}</Text>
    <Text style={[styles.texttype, {fontSize: 15, bottom:30}]}>Team: {player.team_id}</Text>
   </View>
   <View style={styles.profileText}>
        <Text style={styles.texttype}>First name: {player.firstname} </Text>
        <Text style={styles.texttype}>Last Name: {player.last_name}</Text>
        <Text style={[styles.texttype, {fontSize: 10}]}>Height: {player.height}  Weight: {player.weight} lbs</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Experience Level: </Text>
        <Text style={[styles.texttype, {fontSize: 10}]}>{player.experience}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Position:</Text>
        <Text style={[styles.texttype, {fontSize: 10}]}>{player.position}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Is Manager:{player.isManager}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Average Points: {player.avgPoints}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Average Blocks: {player.avgBlocks}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Average Steals: {player.avgSteals}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Average Assists: {player.assists}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Free Throw Percent: {player.freethrowPrecent}</Text>
        <Text style={[styles.texttype, {fontSize: 14}]}>Shot Percent: {player.shotPercent}</Text>
        


        
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
        <Text style={{color: "white", fontSize: 28, fontFamily: 'Bungee-Regular'}}> Profile </Text>
        </TouchableOpacity>


  
        </View>
  
      
  

        <View style={{position: 'absolute', top: 650, left: 200, right: 20, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            //onPress={() => console.log("button pressed!")} 
            // update user 
            onPress={() => navigation.navigate('ProfileEdit')}
            style={changeButton() ? styles.button2 : styles.button2Inv}>
        <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}> Update Player </Text>
        </TouchableOpacity>
        </View> 

        <View style={{position: 'absolute', top: 650, left: 0, right: 150, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            onPress={() => console.log("button pressed!")} 
            // update user 
            //onPress={() => navigation.navigate('ProfileEdit')}
            style={styles.button1}>
        <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}> Log Out </Text>
        </TouchableOpacity>
        </View> 

        <View style={{position: 'absolute', top: 650, left: 200, right: 20, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            //onPress={() => console.log("button pressed!")} 
            // update user 
            onPress={() => recruitPlayerToTeam()}
            style={changeButton() ? styles.button2Inv : styles.button2}>
        <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}> Send Requests </Text>
        </TouchableOpacity>
        </View> 
        </View> 
        
   )


      
};
export default ProfileView
