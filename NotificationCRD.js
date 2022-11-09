import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, SafeAreaView, FlatList} from "react-native";
import Realm from "realm";

/*
    NOTES:
    - when a new notif is created, the text box isn't cleared for the 
        senderID / content fields and if you then press "Create Notification"
        again, the db tries to create a second notification with the same 
        ID as the first one. (refresh page upon create?)
*/

realm = new Realm({path: 'notifications2.realm',
schema:[
    {
    name: "Notifications",
    properties: {
        id: "int",
        senderUsername: "string",
        recieverUsername: "string",
        content: "string",
    },
    primaryKey: "id",

    },
],
schemaVersion: 2
});


const TestingList = ({ navigation }) => {
  
  const db = realm.objects("Notifications");
  console.log("NOTIFICATIONS:", db);
  console.log("length:", db.length);
    // THIS IF CHUNK
    if (db.length > 0) {
      console.log("last:", db[db.length-1]); 
      console.log("last_id:", parseInt(db[db.length-1].id));
      console.log("next_id:", db[db.length-1].id) + 1;
    } 

  let notifID = db.length
  console.log("CURRENT ID:", notifID);    // THIS ISN't updating in REAL TIME
  let [senderID, setSenderID] = useState('');
  let [notifContent, setNotifContent] = useState('');
  let [senderUser, setSenderUser] = useState('');
  let [recieverUser, setRecieverUser] = useState('');

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

      //  this.state = {
       //   notifID: db.length,
        //}

        // does this line affect anything?
     //   this.state = {
     //     FlatListItems: [],
     //   };

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

        <Text style={styles.textheader}>Sender Username</Text>
        <Text style={styles.textbottom}>{item.senderUsername}</Text>

        <Text style={styles.textheader}>Reciever Username</Text>
        <Text style={styles.textbottom}>{item.recieverUsername}</Text>
      
        <Text style={styles.textheader}>Notification Content</Text>
        <Text style={styles.textbottom}>{item.content}</Text>
        
        <TouchableOpacity 
        onPress={() => deleteNotif(item)} >
        <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}>Delete</Text>
        </TouchableOpacity>
        </View>
        
          );
          
        };
      
        // UNTESTED
        let deleteNotif = (item) => {
          console.log("testing", item.id);
          realm.write(() => {
          const testDel = realm.objectForPrimaryKey("Notifications", item.id);
          console.log(testDel);
          realm.delete(testDel)
        });

          Alert.alert(
            'Success',
            'You have Deleted Successfully',
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('NotificationCRD'),
              },
            ],
            { cancelable: false }
          );
          
        };

        /*
        id: "int",
        senderID: {type: "int", default: 0},
        content: "string",
        

        let createNotif = () => {
          let user;
          realm.write(() => {
            user = realm.create("Notifications", {id: notifID, content: notifContent, senderUsername: senderUser, recieverUsername: recieverUser});
          })
        }

        */

        let createNotif = () => {

          if (!senderUser) {
            alert("Please provide sender username");
            return;
          }
          if (!notifContent) {
            alert('Please provide content for the notification');
            return;
          }
          if (!recieverUser) {
            alert('Please provide reciever username');
            return;
          }

          realm.write(() => {
            if (db.length > 0) {
              console.log("")
              let next_ID = db[db.length-1].id + 1
              new_notification = realm.create("Notifications", {id: next_ID, content: notifContent, senderUsername: senderUser, recieverUsername: recieverUser});
            } else {
              console.log("this second line ran");
              new_notification = realm.create("Notifications", {id: 0, content: notifContent, senderUsername: senderUser, recieverUsername: recieverUser});
            }
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
              

              
            <Text style={{fontSize:20 , fontFamily: 'monospace', color: 'white'}}>Sender Username</Text>
           <TextInput 
            style = {styles.input} keyboardType="number-pad"
           textAlign={'center'}
           placeholderTextColor="white" 
            placeholder="Sender Username"
            onChangeText={
              (senderUser) => setSenderUser(senderUser)
            }
            />

          <Text style={{fontSize:20 , fontFamily: 'monospace', color: 'white'}}>Reciever Username</Text>
           <TextInput 
            style = {styles.input} keyboardType="number-pad"
           textAlign={'center'}
           placeholderTextColor="white" 
            placeholder="Reciever Username"
            onChangeText={
              (recieverUser) => setRecieverUser(recieverUser)
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