import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, SafeAreaView, FlatList} from "react-native";
import Realm from "realm";

realm = new Realm({path: 'notifications.realm',
schema:[
    {
    name: "Notification",
    properties: {
        id: "int",
        senderID: {type: "int", default: 0},
        content: "string",
    },
    primaryKey: "id",

    },
],

});


const NotificationCRD = ({ navigation }) => {
  
  const db = realm.objects("Notification");
  console.log("NOTIFICATIONS:", db);
  console.log("length:", db.length);

  console.log("last:", db[db.length-1]); // nasty with it fr ngl
  console.log("last_id:", parseInt(db[db.length-1].id));
  console.log("next_id:", db[db.length-1].id) + 1; 

  let notifID = db.length
  console.log("CURRENT ID:", notifID);    
  let [senderID, setSenderID] = useState('');
  let [notifContent, setNotifContent] = useState('');
  let [itemID, setItemID] = useState('');

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
            key={item.notifID}
            style={{ backgroundColor: '#383434', marginTop: 20, padding: 30, borderRadius: 10 }}>
      
        <Text style={styles.textheader}>Notifcation ID</Text>
        <Text style={styles.textbottom}>{item.id}</Text>

        <Text style={styles.textheader}>Sender ID</Text>
        <Text style={styles.textbottom}>{item.senderID}</Text>
      
        <Text style={styles.textheader}>Notification Content</Text>
        <Text style={styles.textbottom}>{item.content}</Text>
        
          
        </View>
          );
        };
      
        let deleteNotif = () => {
          realm.write(() => {
          const testDel = realm.objectForPrimaryKey("Notification", parseInt(itemID));
          console.log(testDel);
          realm.delete(testDel)
        });

          Alert.alert(
            'Success',
            'Notification Successfully Deleted',
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('NotificationCRD'),
              },
            ],
            { cancelable: false }
          );
          
        };

        let createNotif = () => {

          if (!notifID) {
            alert("Please provide notification ID");
            return;
          }
          if (!notifContent) {
            alert('Please provide content for the notification');
            return;
          }

          realm.write(() => {
            let next_ID = db[db.length-1].id + 1
            new_notification = realm.create("Notification", {id: next_ID, content: notifContent, senderID: parseInt(senderID)});
          })

          Alert.alert(
            'Success',
            'Notification Successfully Created',
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('NotificationCRD'),
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
              
                <Text style={{fontSize:20 , fontFamily: 'monospace', color: 'white'}}>Sender ID</Text>
                <TextInput 
                  style = {styles.input} keyboardType="number-pad"
                  textAlign={'center'}
                  placeholderTextColor="white" 
                  placeholder="Sender ID"
                  onChangeText={
                    (senderID) => setSenderID(senderID)
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

                <Text style={{fontSize:20 , fontFamily: 'monospace', color: 'white'}}>Notification ID</Text>
                <TextInput 
                  style = {styles.input} keyboardType="number-pad"
                  textAlign={'center'}
                  placeholderTextColor="white" 
                  placeholder="Notification ID"
                  onChangeText={
                    (itemID) => setItemID(itemID)
                  }
                />

                <TouchableOpacity
                  onPress={deleteNotif}
                  style={[styles.button , {backgroundColor: "#CA5A37"}]}>
                  <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}>Delete Notification</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        );
      };
      
      export default NotificationCRD;
