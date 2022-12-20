import React, { Profiler, useEffect, useState } from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Button, Alert, SafeAreaView, FlatList} from "react-native";
import TeamDao from './model/TeamDao.js'
import PlayerDao from "./model/PlayerDao"

const TeamList = ({ navigation }) => {
    let [teamName, setTeamName] = useState('');

    const styles = StyleSheet.create({
      textheader: {
        color: 'white',
        fontSize: 12,
        fontWeight: '700',
    
      },
      textbottom: {
        color: 'white',
        fontSize: 18,
      },
      button: {
        //flex: 1,
        alignItems: "center",
        backgroundColor: "#B62727",
        padding: 15
        
    },
    input:
    {
      color: 'white',
      backgroundColor: "#383434",
        width: "100%",
        borderWidth: 2,
        borderRadius: 3,
        padding: 10,
    }

      });

      let teamDao = new TeamDao()
      const allTeams = teamDao.readAllTeams();


      this.state = {
        FlatListItems: allTeams,
      };

    
      let listViewItemSeparator = () => {
        return (
          <View
            style={{ height: 0.2, width: '100%', backgroundColor: '#171414' }}
          />
        );
      };
      
    let listItemView = (item) => {
        return (
        <View
            key={item.user_id}
            style={{ backgroundColor: '#383434', marginTop: 20, padding: 30, borderRadius: 10 }}>
        <Text style={styles.textheader}>Team Name</Text>
        <Text style={styles.textbottom}>{item.teamName}</Text>
        <Text style={styles.textheader}>Manager</Text>
        <Text style={styles.textbottom}>{item.teamManager}</Text>
        <View style={{position: 'absolute', left: 220, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            onPress={ () => {teamDao.setTeamToView(item.teamName); navigation.navigate('TeamView')}
            }
            
            style={styles.button}>
            <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}>View Team Profile</Text>
        </TouchableOpacity>
        </View> 
        </View>
          );
        };
      
        let deleteTeam = () => {

          if(teamDao.readTeam(teamName)){

            Alert.alert(
              'Delete Team?',
              'Press Confirm or Cancel',
              [
                {
                  text: 'Confirm',
                  //onPress: () => console.log("confirm"),
                  onPress: () => teamDao.deleteTeam(teamName),
                
                },
                {
                  text: 'Cancel',
                  //onPress: () => console.log("cancel"),
                  onPress: () => navigation.navigate('TeamList'),
                },
              ],
              { cancelable: false }
            );
            

            
          }
          
          else{
            alert(
              'Team does not exist',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('TeamList'),
                },
              ],
              { cancelable: false }
            );
            
          };
          }

        let playerDao = new PlayerDao()
        let currPlayer = playerDao.getProfileToView()
        if(currPlayer){
          playerDao.setProfileToView(playerDao.getCurrentPlayer().email)
          //let player = playerDao.readPlayer(currPlayer.email)
        }

        let changeButton = () =>
        {
          if((currPlayer) && currPlayer.email.localeCompare("admin") === 0)
          {
          console.log("Admin")
          return(
            [<Text style={{fontSize:20 , fontFamily: 'monospace', color: 'white'}}>Team Name</Text>,
            <TextInput 
          style = {styles.input} keyboardType="number-pad"
          textAlign={'center'}
          placeholder="Team Name"
          placeholderTextColor="white" 
          onChangeText={
            (teamname) => setTeamName(teamname)
          }
          />,
          <TouchableOpacity
          onPress={deleteTeam}
          style={styles.button}>
          <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}>Delete Team</Text>
        </TouchableOpacity>,

          
          
          
          
          ]
            
      

          )
        }
      
        }
        

        return (
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: '#171414' }}>
              <View style={{ flex: 1 }}>
                <FlatList
                  data={this.state.FlatListItems}
                  ItemSeparatorComponent={listViewItemSeparator}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => listItemView(item)}
                />
        
                {changeButton()}
              </View>
            </View>
          </SafeAreaView>
        );
      };
      
      export default TeamList;
