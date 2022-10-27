import React, { useEffect, useState } from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Button, Alert, SafeAreaView, FlatList} from "react-native";
import Mybutton from './pages/components/Mybutton';
import Mytext from './pages/components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const UserList = ({ navigation }) => {
  let [userEmail, setUserEmail] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [userID, setUserID] = useState('');
    const styles = StyleSheet.create({
        textheader: {
          color: '#111',
          fontSize: 12,
          fontWeight: '700',
      
        },
        textbottom: {
          color: '#111',
          fontSize: 18,
        },
        button: {
          //flex: 1,
          alignItems: "center",
          backgroundColor: "#171414",
          padding: 15
          
      }

      });

      let [flatListItems, setFlatListItems] = useState([]);

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
    
      let listViewItemSeparator = () => {
        return (
          <View
            style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }}
          />
        );
      };
      
    let listItemView = (item) => {
        return (
        <View
            key={item.user_id}
            style={{ backgroundColor: '#EEE', marginTop: 20, padding: 30, borderRadius: 10 }}>
        <Text style={styles.textheader}>Id</Text>
        <Text style={styles.textbottom}>{item.user_id}</Text>
      
        <Text style={styles.textheader}>Email</Text>
        <Text style={styles.textbottom}>{item.user_email}</Text>
      
        <Text style={styles.textheader}>Password</Text>
        <Text style={styles.textbottom}>{item.user_password}</Text>
        
          
        </View>
          );
        };
      
        let deleteUser = () => {
          db.transaction((tx) => {
            tx.executeSql(
              'DELETE FROM  user_table where user_id=?',
              [userID],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'User deleted successfully',
                    [
                      {
                        text: 'Ok',
                        //onPress: () => navigation.navigate('UserList'),
                      },
                    ],
                    { cancelable: false }
                  );
                } else {
                  alert('Please insert a valid User Id');
                }
              }
            );
          });
        };
    
        let updateUser = () => {
          console.log(userID, userEmail, userPassword);
      
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
      
          db.transaction((tx) => {
            tx.executeSql(
              'UPDATE user_table set user_email=?, user_password=? where user_id=?',
              [userEmail, userPassword, userID],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'User updated successfully',
                    [
                      {
                        text: 'Ok',
                        onPress: () => navigation.navigate('UserList'),
                      },
                    ],
                    { cancelable: false }
                  );
                } else alert('Update Failed');
              }
            );
          });
        };

        return (
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
              <View style={{ flex: 1 }}>
                <FlatList
                  data={flatListItems}
                  ItemSeparatorComponent={listViewItemSeparator}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => listItemView(item)}
                />
              

              
            <Text style={{fontSize:20 , fontFamily: 'monospace', color: 'orange'}}>ID</Text>
           <TextInput 
            style = {styles.input} keyboardType="number-pad"
           textAlign={'center'}
            placeholder="ID"
            onChangeText={
              (userID) => setUserID(userID)
            }
            />
        
        
        <Text style={{fontSize:20 , fontFamily: 'monospace', color: 'orange'}}>Email</Text>
        <TextInput 
          style = {styles.input} keyboardType="number-pad"
          textAlign={'center'}
          placeholder="ID"
          onChangeText={
            (userEmail) => setUserEmail(userEmail)
          }
          />

        <Text style={{fontSize:20 , fontFamily: 'monospace', color: 'orange'}}>Password</Text>
        <TextInput 
          style = {styles.input} keyboardType="email-address"
          textAlign={'center'}
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
                style={styles.button}>
                <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}>Update User</Text>
              </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        );
      };
      
      export default UserList;
