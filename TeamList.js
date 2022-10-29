import React, { useEffect, useState } from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Button, Alert, SafeAreaView, FlatList} from "react-native";
//import Mybutton from './pages/components/Mybutton';
//import Mytext from './pages/components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const TeamList = ({ navigation }) => {
    let [teamname, setTeamName] = useState('');
    let [teamID, setTeamID] = useState('');

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

      let [flatListItems, setFlatListItems] = useState([]);

      useEffect(() => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM team_table', [], (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            setFlatListItems(temp);
          });
        });
      }, []);
    
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
        <Text style={styles.textheader}>Id</Text>
        <Text style={styles.textbottom}>{item.team_id}</Text>
      
        <Text style={styles.textheader}>Email</Text>
        <Text style={styles.textbottom}>{item.team_name}</Text>
        
          
        </View>
          );
        };
      
        let deleteTeam = () => {
          dao.deleteTeam(teamID)
          Alert.alert(
            'Success',
            'You have Deleted Successfully',
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('TeamList'),
              },
            ],
            { cancelable: false }
          );
          
        };
        
    
        let updateTeam = () => {
          console.log(teamID, teamname);
      
          if (!teamID) {
            alert('Please fill team id');
            return;
          }
          if (!teamname) {
            alert('Please fill name');
            return;
          }
      
          dao.updateTeam(teamID, teamname);
 
          Alert.alert('Success','User updated successfully',
             [
              {
               text: 'Ok',
               onPress: () => navigation.navigate('TeamList'),
              },
             ],
              { cancelable: false }
              );
        };

        return (
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: '#171414' }}>
              <View style={{ flex: 1 }}>
                <FlatList
                  data={flatListItems}
                  ItemSeparatorComponent={listViewItemSeparator}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => listItemView(item)}
                />
              

              
            <Text style={{fontSize:20 , fontFamily: 'monospace', color: 'white'}}>ID</Text>
           <TextInput 
            style = {styles.input} keyboardType="number-pad"
           textAlign={'center'}
            placeholder="ID"
            placeholderTextColor="white" 
            onChangeText={
              (teamID) => setTeamID(teamID)
            }
            />
        
        
        <Text style={{fontSize:20 , fontFamily: 'monospace', color: 'white'}}>Team Name</Text>
        <TextInput 
          style = {styles.input} keyboardType="number-pad"
          textAlign={'center'}
          placeholder="Team Name"
          placeholderTextColor="white" 
          onChangeText={
            (teamname) => setTeamName(teamname)
          }
          />
        
      
          <TouchableOpacity
            //onPress={() => console.log("button pressed!")} 
                onPress={deleteTeam}
                style={styles.button}>
                <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}>Delete Team</Text>
              </TouchableOpacity>

              <TouchableOpacity
            //onPress={() => console.log("button pressed!")} 
                onPress={updateTeam}
                style={[styles.button , {backgroundColor: "#CA5A37"}]}>
                <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}>Update Team</Text>
              </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        );
      };
      
      export default TeamList;
