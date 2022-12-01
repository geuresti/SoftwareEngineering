import React, { useEffect, useState } from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Button, Alert, SafeAreaView, FlatList} from "react-native";
import PlayerDao from "./model/PlayerDao"

let playerDao = new PlayerDao()

const PlayerList = ({ navigation }) => {

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

        const allPlayers = playerDao.readAllPlayers()

        this.state = {
          FlatListItems: allPlayers,
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

        <Text style={styles.textheader}>Email: {item.email}</Text>
        <Text style={styles.textheader}>Name: {item.first_name} {item.last_name}</Text>
        <Text style={styles.textheader}>Team: {item.team_id}</Text>
        <View style={{position: 'absolute', left: 220, justifyContent: 'center', alignItems: 'center'}}>
        
        <TouchableOpacity
            onPress={ () => {playerDao.setProfileToView(item.email); navigation.navigate('ProfileView2')}
            }
            
            style={styles.button}>
            <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}>View Full Profile</Text>
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
            </View>
          </SafeAreaView>
        );
      };
      
      export default PlayerList;
