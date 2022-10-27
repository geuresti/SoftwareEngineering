import React, { useEffect, useState } from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Button, Alert, SafeAreaView, FlatList} from "react-native";
import Mybutton from './pages/components/Mybutton';
import Mytext from './pages/components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const CreateTeam = ({ navigation }) => {
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


      useEffect(() => {
        db.transaction(function (txn) {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='team_table'",
            [],
            function (tx, res) {
              console.log('item:', res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS team_table', []);
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS team_table(team_id INTEGER PRIMARY KEY AUTOINCREMENT, team_name VARCHAR(50))',
                  []
                );
              }
            }
          );
        });
      }, []);

  let [teamname, setTeamName] = useState('');

  let register_team = () => {
    console.log(teamname);

    if (!teamname) {
      alert('Please fill email');
      return;
    }
    

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO team_table(team_name) VALUES (?)',
        [teamname],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Team Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('TeamList'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Registration Failed');
        }
      );
    });
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
        <Text style={{fontSize:35 , fontFamily: 'Bungee-Regular', color: '#D9D9D9'}}>Create Team</Text>
        </View>
        <View style={{position: 'absolute', top: 0, left: 0, right: 270, bottom: 250, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize:20 , fontFamily: 'monospace', color: '#D9D9D9'}}>Team Name</Text>
        </View>
        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 90, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput 
          style = {styles.input}
          textAlign={'center'}
          placeholder="Team Name" 
          onChangeText={
            (teamname) => setTeamName(teamname)
          }/>
        </View>
        <View style={{position: 'absolute', top: 50, left: 0, right: 270, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        </View>
        <View style={{position: 'absolute', top: 450, left: 200, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            //onPress={() => console.log("button pressed!")} 
            onPress={register_team}
            style={styles.button}>
    
        <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}>Create</Text>
        </TouchableOpacity>
  
        </View>
      </View>
    
   );

}
export default CreateTeam
