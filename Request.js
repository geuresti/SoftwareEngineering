import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, SafeAreaView, FlatList} from "react-native";
import PlayerDao from "./model/PlayerDao.js"
import NotificationDao from "./model/NotificationDao.js"


const Request = ({ navigation }) => {

  var notifDao = new NotificationDao()

  const db = notifDao.getAllNotifications()

  let [notifContent, setNotifContent] = useState('');

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

      let playerDao = new PlayerDao()
      let curr = playerDao.getCurrentPlayer()
      let player
      let player2
      if(curr){
        player = playerDao.readPlayer(curr.email)
      }
      let playerDao2 = new PlayerDao()
      let curr2 = playerDao2.getProfileToView()
      if(curr2){
        player2 = playerDao2.readPlayer(curr2.email)
      }
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

        <Text style={styles.textheader}>Reciever Username</Text>
        <Text style={styles.textbottom}>{item.recieverUsername}</Text>
      
        <Text style={styles.textheader}>Notification Content</Text>
        <Text style={styles.textbottom}>{item.content}</Text>
        
          
        </View>
          );
        };

        let requestJoin = () => {

          notifContent = player.email + " would like to join your team!";

          notifDao.createNotification(player.email, player2.email, notifContent);

          Alert.alert(
            'Success',
            'Notification Successfully Created',
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('Request'),
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
              </View>
            </View>
          </SafeAreaView>
        );
      };
      
      export default Request;
