import React, { useState } from 'react';
import { Text, View, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Alert} from "react-native";
import TeamDao from './model/TeamDao.js'
import PlayerDao from './model/PlayerDao.js'
import StandingsDao from './model/StandingsDao'
import SeasonsDao from './model/SeasonDao'

const CreateTeam = ({ navigation }) => {
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
        button: {
            alignItems: "center",
            backgroundColor: "#171414",
            padding: 15
            
        }
      });

  let teamDao = new TeamDao()
  let playerDao = new PlayerDao()
  let standingsDao = new StandingsDao()
  let seasonDao = new SeasonsDao()
  let [teamname, setTeamName] = useState('');

  let register_team = () => {
    console.log(teamname);

    if (!teamname) {
      alert('Please fill team name');
      return
    }
    curr = playerDao.getCurrentPlayer()
    team = teamDao.createTeam(teamname, curr.email)
    standingsDao.updateStandings(seasonDao.getSeasonToView().id, teamname, "0-0-0")
    playerDao.setManager(curr.email, true)
    teamDao.updateManager(teamname, curr.email)
    teamDao.addPlayer(teamname, curr.email)
    if(curr.email.localeCompare("admin") === 0)
    {
    Alert.alert(
      'Success',
      'Team Registered Successfully',
      [
        {
          text: 'Ok',
          onPress: () => navigation.navigate('AdminPage'),
        },
      ],
      { cancelable: false }
    );
    }
    else{
      Alert.alert(
        'Success',
        'Team Registered Successfully',
        [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('Home'),
          },
        ],
        { cancelable: false }
      );
    }
    
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
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 500, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize:35 , fontFamily: 'Bungee-Regular', color: '#D9D9D9'}}>Create Team</Text>
        </View>
        <View style={{position: 'absolute', top: 0, left: 0, right: 270, bottom: 250, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize:20 , fontFamily: 'monospace', color: '#D9D9D9'}}>Team Name</Text>
        </View>
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 90, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput 
          style = {styles.input}
          textAlign={'center'}
          placeholder="Team Name" 
          onChangeText={
            (teamname) => setTeamName(teamname)
          }/>
        </View>
        <View style={{position: 'absolute', top: 50, left: 0, right: 270, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        </View>
        <View style={{position: 'absolute', top: 450, left: 200, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            onPress={register_team}
            style={styles.button}>
    
        <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}>Create</Text>
        </TouchableOpacity>
  
        </View>
      </View>
    
   );

}
export default CreateTeam
