import React, { useEffect, useState } from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Button, Alert, SafeAreaView, FlatList} from "react-native";

import Realm from "realm";
import MatchDao from "./model/MatchDao"
import ProfileView from './ProfileView';
import PlayerDao from "./model/PlayerDao"
let matchDao = new MatchDao()

const Schedule = ({ navigation }) => {

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
      let playerDao = new PlayerDao()
      let currPlayer = playerDao.getProfileToView()
      if(playerDao.getCurrentPlayer()){
        playerDao.setProfileToView(playerDao.getCurrentPlayer().email)
      }
      let player
      if(player){
        player = playerDao.readPlayer(currPlayer.email)
      }
      let changeButton = () =>
      {
        if((currPlayer) && currPlayer.email.localeCompare("admin") === 0){
        return(
          <TouchableOpacity
          //onPress={() => console.log("button pressed!")} 
              onPress={() => {navigation.navigate('MatchCreate')}}
              style={styles.button}>
              <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}>Create Game</Text>
            </TouchableOpacity>
        )
      }
      }

        const allMatches = matchDao.readAllMatches()

        this.state = {
          FlatListItems: allMatches,
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
            key={item.email}
            style={{ backgroundColor: '#383434', marginTop: 20, padding: 30, borderRadius: 10 }}>

        <Text style={styles.textheader}>Home Team: {item.home_team} </Text>
        <Text style={styles.textheader}>Score: {item.home_team_score} </Text>
        <Text style={styles.textheader}>Away Team: {item.away_team}</Text>
        <Text style={styles.textheader}>Score: {item.away_team_score} </Text>
        <View style={{position: 'absolute', left: 220, justifyContent: 'center', alignItems: 'center'}}>
        
        <TouchableOpacity
            onPress={ () => {matchDao.setMatchToView(item.match_id); navigation.navigate('MatchView')}}
            
            style={styles.button}>
            <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}>View Match Details</Text>
        </TouchableOpacity>
        </View>
        </View>
          );
        };

        return (
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: '#171414' }}>
              <View style={{ flex: 1 }}>
                {<FlatList
                  data={this.state.FlatListItems}
                  ItemSeparatorComponent={listViewItemSeparator}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => listItemView(item)}
                />}
                
              </View>
                  {changeButton()}
            </View>
          </SafeAreaView>
        );
      };
      
      export default Schedule;
