import React, {useState} from "react";
import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Alert, navigation} from "react-native";
import { block } from "react-native-reanimated";
import MatchDao from './model/MatchDao.js'

const MatchEdit = ({navigation}) => {
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

     // let teamDao = new TeamDao()
      
      // let team = teamDao.readTeam(curr.teamName)
      let matchDao = new MatchDao()
      let curr = matchDao.getMatchToView()
      let match = matchDao.readMatch(curr.match_id) // don't know what to put for parameters 

      let [match_id, setMatchId] = useState('');
      let [home_team_score, setHomeTeamScore] = useState('');
      let [away_team_score, setAwayTeamScore] = useState('');
      let [game_time, setGameTime]  = useState('');
      let [h_team_blocks, setHTBlocks] = useState('');
      let [h_team_steals, setHTSteals] = useState('');
      let [h_team_assists, setHTAssists] = useState('');
      let [h_team_frees, setHTFrees] = useState(''); 
      let [h_team_shot_percent, setHTShot] = useState('');
      let [a_team_blocks, setATBlocks] = useState('');
      let [a_team_steals, setATSteals] = useState('');
      let [a_team_assists, setATAssists] = useState('');
      let [a_team_frees, setATFrees] = useState(''); 
      let [a_team_shot_percent, setATShot] = useState('');
      


      
     

      let updateMatch = () => {
        matchDao.updateMatch(match_id,  parseFloat(home_team_score), parseFloat(away_team_score), game_time, parseFloat(h_team_blocks), parseInt(h_team_steals), parseInt(h_team_assists), parseInt(h_team_frees), parseInt(h_team_shot_percent), parseFloat(a_team_blocks), parseInt(a_team_steals), parseInt(a_team_assists), parseInt(a_team_frees), parseInt(a_team_shot_percent) )
        alert(
            'Success',
            'You have Updated Successfully',
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('MatchView'),
              },
            ],
            { cancelable: false }
          );
      }
      let deleteMatch = () => {
        matchDao.deleteMatch(match_id);
        alert(
            'Success',
            'You have Updated Successfully',
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('LoginScreen'),
              },
            ],
            { cancelable: false }
          );
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
   
   <View style={{position: 'absolute', top: -550, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]}  keyboardType="email-address"
          textAlign={'center'}
          placeholder="Match Id" 
          onChangeText={
            (match_id) => setMatchId(match_id)
            

          
        } 
      
        />
        </View>
        <View style={{position: 'absolute', top: -470, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder="Away Team Score" 
          onChangeText={
            (away_team_score) => setAwayTeamScore(away_team_score)
          }
          />

    </View>

        <View style={{position: 'absolute', top: -390, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder="Home Team Score" 
          onChangeText={
            (home_team_score) => setHomeTeamScore(home_team_score)
          }
          />

    </View>

   


    <View style={{position: 'absolute', top: -310, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]}  keyboardType="email-address"
          textAlign={'center'}
          placeholder="Game Time" 
          onChangeText={
            (game_time) => setGameTime(game_time)
            

          
        } 
      
        />
        </View>



    <View style={{position: 'absolute', top: -230, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder="Total Home Team Blocks" 
          onChangeText={
            (h_team_blocks) => setHTBlocks(h_team_blocks)
          }
          />

    </View>
    
    <View style={{position: 'absolute', top: -230, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder="Total Home Team Steals" 
          onChangeText={
            (h_team_steals) => setHTSteals(h_team_steals)
          }
          />

    </View>


    <View style={{position: 'absolute', top: -150, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder="Total Home Team Assists" 
          onChangeText={
            (h_team_assists) => setHTAssists(h_team_assists)
          }
          />

    </View>

    <View style={{position: 'absolute', top: -70, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder="Total Home Team Free Throws" 
          onChangeText={
            (h_team_frees) => setHTFrees(h_team_frees)
          }
          />

    </View>
    <View style={{position: 'absolute', top: 10, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder=" Home Team Shot Percent"
          onChangeText={
            (h_team_shot_percent) => setHTShot(h_team_shot_percent)
          }
          />

    </View>


    <View style={{position: 'absolute', top: 90, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder="Total Away Team Blocks" 
          onChangeText={
            (a_team_blocks) => setATBlocks(a_team_blocks)
          }
          />

    </View>

    <View style={{position: 'absolute', top: -230, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder="Total Away Team Steals" 
          onChangeText={
            (a_team_steals) => setATSteals(a_team_steals)
          }
          />

    </View>


    <View style={{position: 'absolute', top: 170, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder="Total Away Team Assists" 
          onChangeText={
            (a_team_assists) => setATAssists(a_team_assists)
          }
          />

    </View>

    <View style={{position: 'absolute', top: 250, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder="Total Away Team Free Throws" 
          onChangeText={
            (a_team_frees) => setATFrees(a_team_frees)
          }
          />

    </View>

    <View style={{position: 'absolute', top: 3300, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder="Away Team Shot Percent" 
          onChangeText={
            (a_team_shot_percent) => setATShot(a_team_shot_percent)
          }
          />

    </View>


        <View style={{position: 'absolute', top: 650, left: 0, right: 180, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            //submit changes button
            //onPress={() => console.log("button pressed!")} 
            // onPress={() =>Alert.alert("Changes Saved!")}
            // onPress={() => navigation.navigate('ProfileList')}
            onPress={updateMatch}
            style={styles.button2}>
        <Text style={{color: "white", fontSize: 14, fontFamily: 'Bungee-Regular'}}> Submit Changes </Text>
        </TouchableOpacity>
    </View>
    <View style={{position: 'absolute', top: 650, left: 280, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            //submit changes button
            //onPress={() => console.log("button pressed!")} 
            // onPress={() =>Alert.alert("Changes Saved!")}
            // onPress={() => navigation.navigate('ProfileList')}
            onPress={deleteMatch}
            style={styles.button2}>
        <Text style={{color: "white", fontSize: 14, fontFamily: 'Bungee-Regular'}}> Delete Match </Text>
        </TouchableOpacity>
        </View>
    </View>
    );
        
}
export default MatchEdit 

