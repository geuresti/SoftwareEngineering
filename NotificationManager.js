import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, SafeAreaView, FlatList} from "react-native";
import NotificationDao from "./model/NotificationDao.js"

const TestingList = ({ navigation }) => {
  
  var notifDao = new NotificationDao()

  const db = notifDao.getAllNotifications()

  let [notifContent, setNotifContent] = useState('');
  let [senderUser, setSenderUser] = useState('');
  let [receiverUser, setReceiverUser] = useState('');

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
      
        <Text style={styles.textheader}>Notifcation ID</Text>
        <Text style={styles.textbottom}>{item.id}</Text>

        <Text style={styles.textheader}>Sender Username</Text>
        <Text style={styles.textbottom}>{item.senderUsername}</Text>

        <Text style={styles.textheader}>Receiver Username</Text>
        <Text style={styles.textbottom}>{item.receiverUsername}</Text>
      
        <Text style={styles.textheader}>Notification Content</Text>
        <Text style={styles.textbottom}>{item.content}</Text>
        
        <TouchableOpacity 
        onPress={() => deleteNotif(item)} >
        <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}>Delete</Text>
        </TouchableOpacity>
        </View>
        
          );
          
        };
      
        let deleteNotif = (item) => {
          notifDao.deleteNotification(item.id)

          Alert.alert(
            'Success',
            'You have Deleted Successfully',
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('NotificationManager'),
              },
            ],
            { cancelable: false }
          );
          
        };

        let createNotif = () => {

          if (!senderUser) {
            alert("Please provide sender username");
            return;
          }
          if (!notifContent) {
            alert('Please provide content for the notification');
            return;
          }
          if (!receiverUser) {
            alert('Please provide receiver username');
            return;
          }

          notifDao.createNotification(senderUser, receiverUser, notifContent);

          Alert.alert(
            'Success',
            'Notification Successfully Created',
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('NotificationManager'),
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
              
                <Text style={{fontSize:20 , fontFamily: 'monospace', color: 'white'}}>Sender Username</Text>
                <TextInput 
                  style = {styles.input} keyboardType="number-pad"
                  textAlign={'center'}
                  placeholderTextColor="white" 
                  placeholder="Sender Username"
                  onChangeText = {
                    (senderUser) => setSenderUser(senderUser)
                  }
                />

                <Text style={{fontSize:20 , fontFamily: 'monospace', color: 'white'}}>Receiver Username</Text>
                <TextInput 
                  style = {styles.input} keyboardType="number-pad"
                  textAlign={'center'}
                  placeholderTextColor="white" 
                  placeholder="Receiver Username"
                  onChangeText={
                    (receiverUser) => setReceiverUser(receiverUser)
                  }
                />
        
                <Text style={{fontSize:20 , fontFamily: 'monospace', color: 'white'}}>Content</Text>
                <TextInput 
                  style = {styles.input} keyboardType="default"
                  textAlign={'center'}
                  placeholder="Notification Content"
                  placeholderTextColor="white" 
                  onChangeText={
                    (notifContent) => setNotifContent(notifContent)
                  }
                />
        
                <TouchableOpacity
                  onPress={createNotif}
                  style={styles.button}>
                  <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}>Create Notification</Text>
                </TouchableOpacity>

              </View>
            </View>
          </SafeAreaView>
        );
      };
      
      export default TestingList;
