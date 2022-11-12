
import React, {useState} from "react";
import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Alert, navigation} from "react-native";
import { block } from "react-native-reanimated";
import TeamDao from './model/TeamDao.js'


const TeamEdit = ({ navigation }) => {


  const styles = StyleSheet.create({
    texttype: {fontSize:25 , fontFamily: 'Bungee-Regular', color: '#D9D9D9'},
    profileText: {
      position: 'absolute',
      top: 30,
      left: 20, 
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
  button3: {
    //flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 0,
    paddingHorizontal: 30,
    justifyContent: 'center'

    
},
input: {
    borderColor: "gray",
    color: "black",
    backgroundColor: "white",
    width: "90%",
    borderWidth: 2,
    borderRadius: 7,
    padding:3,
  },
  button2: {
    //flex: 1,
    alignItems: "center",
    backgroundColor: "#CA5A37",
    padding: 5,
    paddingHorizontal: 16,
    justifyContent: 'center'

    
},
  });
  

  let teamDao = new TeamDao()
  let curr = teamDao.getTeamToView()
  let team = teamDao.readTeam(curr.teamName)




  let [teamName, setTeamName]  = useState('');
  let [record, setRecord] = useState('');
  let [points_new, setPoints] = useState('');
  let [blocks_new, setBlocks] = useState('');
  let [steals_new, setSteals] = useState('');
  let [a_new, setAssists] = useState('');
  let [f_throw_per, setFrees] = useState('');
  let [s_new_percent, setPercent] = useState('')
  
  let updateMethod = () => {
    teamDao.updateTeam(teamName, team.teamManager, team.players, record, points_new, blocks_new, steals_new, a_new, f_throw_per, s_new_percent)
    Alert.alert(
      'Success',
      'Profile Updated',
      [
        {
          text: 'Ok',
          onPress: () => navigation.navigate('TeamView'),
        },
      ],
      { cancelable: false }
    );
  }
  let placeholders = (attr, item) => {
    if(item)
      return item
    else return attr
  }
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

    <View style={{position: 'absolute', top: -470, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder={placeholders("Team Name", team.teamName)}
          onChangeText={
            (teamName) => setTeamName(teamName)
          }
          />

    </View>

    <View style={{position: 'absolute', top: -390, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder={placeholders("Record", team.record)} 
          onChangeText={
            (record) => setRecord(record)
          }
          />
      </View>

        <View style={{position: 'absolute', top: 170, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder={placeholders("Average Points", team.avgPoints)}
          onChangeText={
            (points_new) => setPoints(points_new)
          }
          />
        </View>
        <View style={{position: 'absolute', top: 250, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder={placeholders("Average Blocks", team.avgBlocks)}
           onChangeText={
            (blocks_new) => setBlocks(blocks_new)
          }  
          />
        </View>
        <View style={{position: 'absolute', top: 330, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder={placeholders("Average Steals", team.avgSteals)} 
          onChangeText={
            (steals_new) => setSteals(steals_new)
          } 
          />
        </View>
        <View style={{position: 'absolute', top: 410, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder={placeholders("Assists", team.assists)}
          onChangeText={
            (a_new) => setAssists(a_new)
          }
          />
        </View>
        <View style={{position: 'absolute', top: 495, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "numeric"
          textAlign={'center'}
          placeholder={placeholders("Free Throw %", team.freethrowPercent)}
          value={Number}
          onChangeText={
            (f_throw_per) => setFrees(f_throw_per )
          } 
          />
        </View>
        <View style={{position: 'absolute', top: 580, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} 
          textAlign={'center'}
          placeholder={placeholders("Shot Accuracy", team.shotPercent)}
           onChangeText={
            (s_new_percent) => setPercent(s_new_percent)
          } 
          />
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
            
            onPress={() =>Alert.alert("profile")}
            style={styles.button3}>
        <Text style={{color: "transparent", fontSize: 28, fontFamily: 'Bungee-Regular'}}> </Text>
        </TouchableOpacity>
        </View>
        <View style={{position: 'absolute', top: 650, left: 0, right: 180, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            //submit changes button
            //onPress={() => console.log("button pressed!")} 
            onPress={updateMethod}
            style={styles.button2}>
        <Text style={{color: "white", fontSize: 14, fontFamily: 'Bungee-Regular'}}> Submit Changes </Text>
        </TouchableOpacity>
        
        </View>
  </View>
   );
}

export default TeamEdit
