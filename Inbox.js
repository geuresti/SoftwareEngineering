import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, SafeAreaView, FlatList, ImageEditor} from "react-native";
import PlayerDao from "./model/PlayerDao.js"
import TeamDao from "./model/TeamDao.js"
import NotificationDao from "./model/NotificationDao.js"

const TestingList = ({ route, navigation }) => {
  
  let playerDao = new PlayerDao()
  let teamDao = new TeamDao()
  let curr = playerDao.getCurrentPlayer()
  let player
  if(curr){
    player = playerDao.readPlayer(curr.email)
  }
  var notifDao = new NotificationDao()

  let db;

  if ((route) && "data" in route.params && route.params["data"].length !== 0) {
    db = route.params["data"]
  } else {
    if(curr){
      db = notifDao.getNotificationsOfUser(curr.email)
    }
  }

  this.state = { 
    FlatListItems: db,
  };
  
  let pressedAccept = (item) => {
    if (item.content.includes("join"))
    {
      console.log(item.recieverUsername)
      let currTeam = teamDao.getTeamByManager(item.recieverUsername)
      let value = currTeam.teamName
      console.log(value,  "testty2")
      teamDao.addPlayer(value, item.senderUsername)
      for(let i = 0; i < currTeam.players.length; i++){
        console.log(currTeam.players[i]);
      }
      
    }
    else if (item.content.includes("recruit"))
    {
      console.log(item.senderUsername)
      let currTeam = teamDao.getTeamByManager(item.senderUsername)
      let value = currTeam.teamName
      console.log(value,  "testty2")
      teamDao.addPlayer(value, item.recieverUsername)
      for(let i = 0; i < currTeam.players.length; i++){
        console.log(currTeam.players[i]);
      }
      
    
    }
    else if(item.content.includes("promoted")){
      let currTeam = teamDao.getTeamByManager(item.recieverUsername)
      teamDao.updateManager(currTeam.teamName, item.senderUsername)
      playerDao.setManager(item.recieverUsername, false)
      playerDao.setManager(item.recieverUsername, true)

    }

    notifDao.deleteNotification(item.id);

    Alert.alert(
      'Success',
      'You have accepted the invite',
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

    if (item.content.includes("upcoming"))
    {
      notifDao.deleteNotification(item.id)

      Alert.alert(
        'Success',
        'Message Dismissed',
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
    }
    else
    {
      Alert.alert(
        'Delete Notification?',
        'Press Confirm or Cancel',
        [
          {
            text: 'Confirm',
            onPress: () => notifDao.deleteNotification(item.id)
          },
          {
            text: 'Cancel',
            onPress: () => navigation.navigate('Inbox', {
              data: [],
            }),
          },
          navigation.navigate('Inbox', {
            data: [],
          })
        ],
        { cancelable: false }
      );
    }
    
  };

  let renderAccept = (item) =>
  {
    if (!item.content.includes("upcoming")) {
      return (
        <TouchableOpacity 
        onPress={() => pressedAccept(item)} >
        <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}>Accept</Text>
        </TouchableOpacity>
      )
    }
  }

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


          {renderAccept(item)}

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
              

              
            <Text style={{fontSize:20 , fontFamily: 'monospace', color: 'white'}}>{player ? player.email:""} 's Inbox</Text>
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
