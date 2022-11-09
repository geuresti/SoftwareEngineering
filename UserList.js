import React, { useEffect, useState } from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Button, Alert, SafeAreaView, FlatList} from "react-native";

import Realm from "realm";
import UserDao from "./model/UserDao"


const realm = new Realm({path: 'logins.realm',
schema:[
    {
    name: "User",
    properties: {
        username: "string",
        pass: "string",
    },
    primaryKey: "username",


    },
],

});
const realm2 = new Realm({path: 'team.realm',
schema:[
    {
    name: "Team",
    properties: {
        teamName: "string",
        //teamids: "string",
        teamids: "string",
    },
    primaryKey: "teamName",


    },
],
schemaVersion:4
});

let userDao = new UserDao()

const UserList = ({ navigation }) => {

  let [userEmail, setUserEmail] = useState('');
  let [userPassword, setUserPassword] = useState('');
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

        const allUsers = userDao.readAllUsers()

        this.state = {
          FlatListItems: allUsers,
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
      
        <Text style={styles.textheader}>Email</Text>
        <Text style={styles.textbottom}>{item.username}</Text>
      
        <Text style={styles.textheader}>Password</Text>
        <Text style={styles.textbottom}>{item.pass}</Text>
        
          
        </View>
          );
        };
      

        let delUser = () => {

          if(userDao.readUser(userEmail)){
            userDao.deleteUser(userEmail)
            alert(
              'Success',
              'You have Deleted Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('UserList'),
                },
              ],
              { cancelable: false }
            );
            
          }
          
          else{
            alert(
              'User does not exist',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('UserList'),
                },
              ],
              { cancelable: false }
            );
            
          };
          }

          
    
        let updateUser = () => {
      
          if (!userEmail) {
            alert('Please fill name');
            return;
          }
          if (userPassword.length <7) {
            alert('Password must be at least 7 characters');
            return;
          }
          //dao.updateUser(userID, userEmail, userPassword);
          let updatedUser = userDao.updateUser(userEmail,userPassword)
          
          if(updatedUser!=null){
            Alert.alert(
              'Success',
              'You have Updated Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('UserList'),
                },
              ],
              { cancelable: false }
            );
          
          }
        
          else{
            Alert.alert(
              'User does not exist',
              [
                {
                text: 'Ok',
                onPress: () => navigation.navigate('UserList'),
              },
            ],
            { cancelable: false }
          );
          
        };
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
              
        
        
        <Text style={{fontSize:20 , fontFamily: 'monospace', color: 'white'}}>Email</Text>
        <TextInput 
          style = {styles.input} keyboardType="number-pad"
          textAlign={'center'}
          placeholder="Email"
          placeholderTextColor="white" 
          onChangeText={
            (userEmail) => setUserEmail(userEmail)
          }
          />

        <Text style={{fontSize:20 , fontFamily: 'monospace', color: 'white'}}>Password</Text>
        <TextInput 
          style = {[styles.input,{color:"white"}]} keyboardType="email-address"
          textAlign={'center'}
          placeholderTextColor="white" 
          placeholder="Password"
          onChangeText={
            (userPassword) => setUserPassword(userPassword)
          }
          />
        
      
          <TouchableOpacity
            //onPress={() => console.log("button pressed!")} 
                onPress={delUser}
                style={styles.button}>
                <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}>Delete User</Text>
              </TouchableOpacity>

              <TouchableOpacity
            //onPress={() => console.log("button pressed!")} 
                onPress={updateUser}
                style={[styles.button , {backgroundColor: "#CA5A37"}]}>
                <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}>Update User</Text>
              </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        );
      };
      
      export default UserList;
