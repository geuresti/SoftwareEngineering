import React, { useEffect, useState } from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Button, Alert, SafeAreaView, FlatList} from "react-native";
//import Mybutton from './pages/components/Mybutton';
//import Mytext from './pages/components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';
import Realm from "realm";
import dbModel from './dbModel';

var db = openDatabase({ name: 'UserDatabase.db' });

realm = new Realm({path: 'logins.realm',
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

const UserList = ({ navigation }) => {
  dao = new dbModel()

  let [userEmail, setUserEmail] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [userID, setUserID] = useState('');
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

      //let [flatListItems, setFlatListItems] = useState([]);
        this.state = {
          FlatListItems: [],
        };

      /*
      useEffect(() => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM user_table', [], (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            setFlatListItems(temp);
          });
        });
      }, []);
      */

      //useEffect(() => {

        const tasks = realm.objects("User");
        console.log(tasks);
        //var temp = [];
        console.log(tasks.length)
        //for (let i = 0; i < tasks.length; ++i)
        //{
          //   temp.push(tasks[i]);
            //  console.log(tasks[i])
        //}
        this.state = {
          FlatListItems: tasks,
        };
        

     // });
    
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
        <Text style={styles.textbottom}>{item.user_id}</Text>
      
        <Text style={styles.textheader}>Email</Text>
        <Text style={styles.textbottom}>{item.username}</Text>
      
        <Text style={styles.textheader}>Password</Text>
        <Text style={styles.textbottom}>{item.pass}</Text>
        
          
        </View>
          );
        };
      
        let deleteUser = () => {
          //dao.deleteUser(username)
          realm.write(() => {
            const testDel = realm.objectForPrimaryKey("User", userEmail);
          //const testDel = realm.objects("User").filtered(`username = ${userEmail}`);
          console.log(testDel);
          realm.delete(testDel)
        });
          //realm.delete(realm.objects("User").filtered('username =' + userEmail));
          Alert.alert(
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
          
        };
    
        let updateUser = () => {
      
          if (!userID) {
            alert('Please fill User id');
            return;
          }
          if (!userEmail) {
            alert('Please fill name');
            return;
          }
          if (userPassword.length <7) {
            alert('Password must be at least 7 characters');
            return;
          }
          //dao.updateUser(userID, userEmail, userPassword);
          realm.write(() => {
            const testUp = realm.objectForPrimaryKey("User", userEmail);
          //const testDel = realm.objects("User").filtered(`username = ${userEmail}`);
          console.log(testUp);
          testUp.username = userEmail;
          testUp.pass = userPassword;
        });
          
          Alert.alert('Success','User updated successfully',
             [
              {
               text: 'Ok',
               onPress: () => navigation.navigate('UserList'),
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
                  data={this.state.FlatListItems}
                  ItemSeparatorComponent={listViewItemSeparator}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => listItemView(item)}
                />
              

              
            <Text style={{fontSize:20 , fontFamily: 'monospace', color: 'white'}}>ID</Text>
           <TextInput 
            style = {styles.input} keyboardType="number-pad"
           textAlign={'center'}
           placeholderTextColor="white" 
            placeholder="ID"
            onChangeText={
              (userID) => setUserID(userID)
            }
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
                onPress={deleteUser}
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
