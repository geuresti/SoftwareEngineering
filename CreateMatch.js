import React, { useEffect, useState } from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Button, Alert, SafeAreaView, FlatList} from "react-native";
import MatchDao from './model/MatchDao.js'
import TeamDao from './model/TeamDao.js'


const CreateMatch = ({ navigation }) => {
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
        //flex: 1,
        alignItems: "center",
        backgroundColor: "#171414",
        padding: 15
        
    }
});

  let matchDao = new MatchDao()
  let teamDao = new TeamDao()
  const allTeams = teamDao.readAllTeams();
  const allMatchs = matchDao.readAllMatches();

  let [match_id, setMatchId] = useState(''); 
  let [teamName, setTeamName] = useState('');

  this.state = {
    FlatList: allTeams,
    FlatList: allMatchs
  }; 

  let listViewItemSeparator = () => {
    return (
      <View
        style={{ height: 0.2, width: '100%', backgroundColor: '#171414' }}
      />
    );
  };

  let create_match = () => {
    console.log(match_id);
    // teamDao.createTeam(teamname, curr.email)
    matchDao.createMatch(match_id)
    
    Alert.alert(
      'Success',
      'Match Registered Successfully',
      [
        {
          text: 'Ok',
          onPress: () => navigation.navigate('AdminPage'),
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
      <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 500, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize:35 , fontFamily: 'Bungee-Regular', color: '#D9D9D9'}}>Create Match</Text>
      </View>
      <View style={{position: 'absolute', top: 0, left: 0, right: 270, bottom: 250, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize:20 , fontFamily: 'monospace', color: '#D9D9D9'}}>Match Number</Text>
      </View>
      <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 90, justifyContent: 'center', alignItems: 'center'}}>
      <TextInput 
        style = {styles.input}
        textAlign={'center'}
        placeholder="Match Id" 
        onChangeText={
          (match_id) => setMatchId(match_id)
        }/>
      </View>
      <View style={{position: 'absolute', top: 50, left: 0, right: 270, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
      </View>
      <View style={{position: 'absolute', top: 450, left: 200, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
          //onPress={() => console.log("button pressed!")} 
          onPress={create_match}
          style={styles.button}>
  
      <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}>Create</Text>
      </TouchableOpacity>

      </View>
    </View>
  
 );
      }
export default CreateMatch