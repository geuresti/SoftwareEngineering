import React, {useState} from "react";
import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Alert, navigation} from "react-native";
import MatchDao from './model/MatchDao.js'
import SeasonDao from './model/SeasonDao.js'

const SeasonEdit = ({navigation}) => {
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
      let seasonDao = new SeasonDao()
      let matchDao = new MatchDao()
      let curr = seasonDao.getSeasonToView()

      let [matches, setMatches] = useState('');

      let addMatch = () => {
        matches = parseInt(matches)
        //console.log(matchDao.readMatch(matches).away_team)
        try{
        
          if (matchDao.readMatch(matches).away_team != null)
        {
        seasonDao.addGame(curr.id, matches)
        Alert.alert(
          'Success',
          'You have Updated Successfully',
          [
            {
              text: 'Ok',
              onPress: () => navigation.navigate('SeasonView'),
            },
            navigation.navigate('SeasonView')
          ],
          { cancelable: false }
        );
        }
      }
        catch(error)
        {
          Alert.alert(
            'Failure',
            'Game Not Found',
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('SeasonView'),
              },
              navigation.navigate('SeasonView')
            ],
            { cancelable: false }
          );

        }

      }

      let deleteMatch = () => {
        Alert.alert(
          'Delete Match from Season?',
          'Press Confirm or Cancel',
          [
            {
              text: 'Confirm',
              //onPress: () => console.log("confirm"),
              onPress: () => seasonDao.removeGame(curr.id, matches)
              
            
            },
            {
              text: 'Cancel',
              //onPress: () => console.log("cancel"),
              onPress: () => navigation.navigate('SeasonView'),
            },
            navigation.navigate('SeasonView')
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
         <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 500, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize:35 , fontFamily: 'Bungee-Regular', color: '#D9D9D9'}}>Current Matches</Text>
      </View>

      <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 300, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize:35 , fontFamily: 'Bungee-Regular', color: '#D9D9D9'}}>Current: {curr ? curr.matches:""}</Text>
      </View>
   <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]}  keyboardType="email-address"
          textAlign={'center'}
          placeholder="Matches" 
          onChangeText={
            (matches) => setMatches(matches)
        } 
      
/>
</View>


        <View style={{position: 'absolute', top: 650, left: 0, right: 180, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            //submit changes button
            //onPress={() => console.log("button pressed!")} 
            // onPress={() =>Alert.alert("Changes Saved!")}
            // onPress={() => navigation.navigate('ProfileList')}
            onPress={() => addMatch()}
            style={styles.button2}>
        <Text style={{color: "white", fontSize: 14, fontFamily: 'Bungee-Regular'}}> Add Game </Text>
        </TouchableOpacity>
    </View>

    <View style={{position: 'absolute', top: 650, left: 0, right: 180, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            //submit changes button
            //onPress={() => console.log("button pressed!")} 
            // onPress={() =>Alert.alert("Changes Saved!")}
            // onPress={() => navigation.navigate('ProfileList')}
            onPress={() => deleteMatch()}
            style={[styles.button2, {left: 200}]}>
        <Text style={{color: "white", fontSize: 14, fontFamily: 'Bungee-Regular'}}> Remove Game </Text>
        </TouchableOpacity>
    </View>

    </View>
    );
        
}
export default SeasonEdit 

