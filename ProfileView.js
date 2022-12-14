import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Alert, SafeAreaView, FlatList, navigation} from "react-native";
import PlayerDao from "./model/PlayerDao.js"
import React, { useEffect, useState } from 'react';
import NotificationDao from "./model/NotificationDao.js"



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
  let player
  if(playerDao.getCurrentPlayer()){
    playerDao.setProfileToView(playerDao.getCurrentPlayer().email)
  }
  if(curr){
    player = playerDao.readPlayer(curr.email)
  }

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

  var notifDao = new NotificationDao()

  let changeButton = () =>
  {
    let myProf
    if ((curr) && curr.email != playerDao.getCurrentPlayer().email)
    {
      myProf = false

    }
    else if ((curr) && curr.email === playerDao.getCurrentPlayer().email)
    {
      myProf = true
      console.log("true")
    }
    return myProf;
  };


  useEffect(() =>{
  changeButton();

})

let logOut = () => {
  playerDao.setCurrentPlayer("")
  Alert.alert(
    'Logging Out',
    '...going back to log in screen',
    [
      {
        text: 'Ok',
        onPress: () => navigation.navigate('LoginScreen'),
      },
    ],
    { cancelable: false }
  );
}

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
                  onPress: () => navigation.navigate('ProfileView'),
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
    <Text style={[styles.texttype, {fontSize: 25}]}>{player ? player.email:""}</Text>
    <Text style={[styles.texttype, {fontSize: 15, bottom:30}]}>Team: {player ? player.team_id:""}</Text>
   </View>
   <View style={styles.profileText}>
        <Text style={[styles.texttype, {left:75,fontSize: 15}]}> </Text>
        <Text style={[styles.texttype, {left:35,bottom: 14,fontSize: 20}]}>{player ? player.first_name:""} {player ? player.last_name:""}</Text>
        <Text style={{color: 'white', left:30,bottom: 40,fontSize: 20}}>_________________</Text>
        <Text style={[styles.texttype, {left: 10,bottom:30, fontSize: 13}]}>Height: {player ? player.height:""}  Weight: {player ? player.weight:""} lbs</Text>
        <Text style={[styles.texttype, {left: 30,bottom:30, fontSize: 15}]}>Experience Level: </Text>
        <Text style={[styles.texttype, {justifyContent: 'center',textAlign: 'center', left: 0,bottom:30, fontSize: 13}]}>{player ? player.experience:""}</Text>
        <Text style={[styles.texttype, {left: 65,bottom:30, fontSize: 15}]}>Position:</Text>
        <Text style={[styles.texttype, {justifyContent: 'center',textAlign: 'center', left: 0,bottom:30, fontSize: 13}]}>{player ? player.position:""}</Text>
        <Text style={[styles.texttype, {right: 125, bottom: 90, fontSize: 16}]}>Stats</Text>
        <Text style={{color: 'white',right: 160, bottom: 110, fontSize: 14}}>___________________</Text>
        <Text style={[styles.texttype, {right: 160, bottom: 100,fontSize: 13}]}>Average Points: {player ? player.avgPoints:""}</Text>
        <Text style={[styles.texttype, {right: 160, bottom: 100,fontSize: 13}]}>Average Blocks: {player ? player.avgBlocks:""}</Text>
        <Text style={[styles.texttype, {right: 160, bottom: 100,fontSize: 13}]}>Average Steals: {player ? player.avgSteals:""}</Text>
        <Text style={[styles.texttype, {right: 160, bottom: 100,fontSize: 13}]}>Average Assists: {player ? player.assists:""}</Text>
        <Text style={[styles.texttype, {right: 160, bottom: 100,fontSize: 13}]}>Free Throw Percent: {player ? player.freethrowPercent:""}</Text>
        <Text style={[styles.texttype, {right: 160, bottom: 100,fontSize: 13}]}>Shot Percent: {player ? player.shotPercent:""}</Text>
        


        
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
            onPress={() => navigation.navigate('ProfileView')} 
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
            onPress={logOut} 
            // update user 
            //onPress={() => navigation.navigate('ProfileEdit')}
            style={changeButton() ? styles.button1 : styles.button2Inv}>
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
