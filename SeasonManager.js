import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Alert, SafeAreaView, FlatList} from "react-native";
import SeasonDao from "./model/SeasonDao.js"

// ------------------------------------------------------------------------
// "reciverUser" has typo. fix on Notif manager .js
// ------------------------------------------------------------------------

const TestingList = ({ navigation }) => {
  
  var seasonDao = new SeasonDao()

  const db = seasonDao.getAllSeasons()

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

        this.state = {
          FlatListItems: db,
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
            key={item.id}
            style={{ backgroundColor: '#383434', marginTop: 20, padding: 30, borderRadius: 10 }}>
      
        <Text style={styles.textheader}>Season ID</Text>
        <Text style={styles.textbottom}>{item.id}</Text>
        <Text style={styles.textheader}>Matches:</Text>
        <Text style={styles.textbottom}>{item.matches}</Text>
        
        <TouchableOpacity 
        onPress={() => deleteSeason(item)} >
        <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}>Delete</Text>
        </TouchableOpacity>
        </View>
        
          );
          
        };
      
        let deleteSeason = (item) => {
          
        };

        let newSeason = () => {

          seasonDao.createSeason();

          Alert.alert(
            'Success',
            'New Season Successfully Created',
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('SeasonManager'),
              },
            ],
            { cancelable: false }
          );
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
        
                <TouchableOpacity
                  onPress={newSeason}
                  style={styles.button}>
                  <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}>Create Season</Text>
                </TouchableOpacity>

              </View>
            </View>
          </SafeAreaView>
        );
      };
      
      export default TestingList;
