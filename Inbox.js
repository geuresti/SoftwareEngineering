import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, SafeAreaView, FlatList} from "react-native";
import PlayerDao from "./model/PlayerDao.js"
import NotificationDao from "./model/NotificationDao.js"

const TestingList = ({ route, navigation }) => {

  let playerDao = new PlayerDao()
  let curr = playerDao.getCurrentPlayer()
  let player = playerDao.readPlayer(curr.email)

  var notifDao = new NotificationDao()

  let db;

  if ("data" in route.params && route.params["data"].length !== 0) {
    db = route.params["data"]
    //console.log("FILTERED INBOX:", db);
  } else {
    db = notifDao.getNotificationsOfUser(curr.email)
    //console.log("DEFAULT INBOX", db);
  }

  this.state = { 
    FlatListItems: db,
  };

  let filterInbox = () => {
    let filtered_notifs = notifDao.filterNotificationsByUser(inboxFilter, curr.email)

    Alert.alert(
      'Success',
      'Filtered',
      [
        {
          text: 'Ok',
          onPress: () => navigation.navigate('Inbox', {
            data: filtered_notifs,
          }),
          customClick: () => navigation.navigate('Inbox'),
        },
      ],
      { cancelable: false }
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
        onPress: () => navigation.navigate('Inbox', {
          data: [],
        }),
      },
    ],
    { cancelable: false }
  );
  
};

  let [inboxFilter, setInboxFilter] = useState('');

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

        <Text style={styles.textheader}>Reciever Username</Text>
        <Text style={styles.textbottom}>{item.recieverUsername}</Text>
      
        <Text style={styles.textheader}>Notification Content</Text>
        <Text style={styles.textbottom}>{item.content}</Text>

        <TouchableOpacity 
        onPress={() => deleteNotif(item)} >
        <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}>Dismiss</Text>
        </TouchableOpacity>
        </View>
        

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
                  extraData={this.state}
                />
              

              
            <Text style={{fontSize:20 , fontFamily: 'monospace', color: 'white'}}>{player.email} 's Inbox</Text>
           <TextInput 
            style = {styles.input}
           textAlign={'center'}
           placeholderTextColor="white" 
            placeholder="Sender Username"
            onChangeText={
              (inboxFilter) => setInboxFilter(inboxFilter)
            }
            />


              <TouchableOpacity
                onPress={filterInbox}
                style={[styles.button , {backgroundColor: "#CA5A37"}]}>
                <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}>Filter</Text>
              </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        );
      };
      
      export default TestingList;
