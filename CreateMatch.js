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

  let [awayTeam, setAwayTeam] = useState(''); 
  let [homeTeam, setHomeTeam] = useState('');
  let [time, setTime] = useState('');


  let create_match = () => {
    // teamDao.createTeam(teamname, curr.email)
    matchDao.createMatch(awayTeam, homeTeam, time)


    
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
        placeholder="Away Team" 
        onChangeText={
          (awayTeam) => setAwayTeam(awayTeam)
        }/>
      </View>

      <View style={{position: 'absolute', top: 100, left: 0, right: 0, bottom: 90, justifyContent: 'center', alignItems: 'center'}}>
      <TextInput 
        style = {styles.input}
        textAlign={'center'}
        placeholder="Home Team" 
        onChangeText={
          (homeTeam) => setHomeTeam(homeTeam)
        }/>
      </View>

      <View style={{position: 'absolute', top: 200, left: 0, right: 0, bottom: 90, justifyContent: 'center', alignItems: 'center'}}>
      <TextInput 
        style = {styles.input}
        textAlign={'center'}
        placeholder="Game Time" 
        onChangeText={
          (time) => setTime(time)
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
