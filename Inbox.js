import React, { useState } from 'react';
import { RefreshControl, Text, View, TouchableOpacity, TextInput, StyleSheet, Alert, SafeAreaView, FlatList} from "react-native";
import Realm from "realm";
import PlayerDao from "./model/PlayerDao.js"
/*
    NOTES:
    - when a new notif is created, the text box isn't cleared for the 
        senderID / content fields and if you then press "Create Notification"
        again, the db tries to create a second notification with the same 
        ID as the first one. (refresh page upon create?)
*/
let playerDao = new PlayerDao()
let curr = playerDao.getCurrentPlayer()
let player = playerDao.readPlayer(curr.email)

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

//const db = realm.objects("Notifications");
this.state = { 
  FlatListItems: [],
};

const db = realm.objects("Notifications").filtered("recieverUsername = $0", curr.email);
this.state = { 
  FlatListItems: db,
};

const TestingList = ({ navigation }) => {
  
    //const refreshPage = ()=>{
      //  window.location.reload();
    // }

  
  let testing = () => {
   const db = realm.objects("Notifications").filtered("senderUsername = $0", inboxOwner);

   
   this.state = {
    FlatListItems: db,
  };
  //const db = db.db1.find( { recieverUsername: inboxOwner } )
  //const db = db1.filtered(`recieverUsername = ${inboxOwner}`);
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
  //let [senderID, setSenderID] = useState('');
  //let [notifContent, setNotifContent] = useState('');

  Alert.alert(
    'Success',
    'Filtered',
    [
      {
        text: 'Ok',
        onPress: () => navigation.navigate('AdminPage'),
        customClick: () => navigation.navigate('AdminPage'),
        onPress: () => navigation.navigate('Inbox'),
        customClick: () => navigation.navigate('Inbox'),
      },
    ],
    { cancelable: false }
  );
};

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
        onPress: () => navigation.navigate('Inbox'),
      },
    ],
    { cancelable: false }
  );
  
};

  //console.log(testing());
  let [inboxOwner, setInboxOwner] = useState('');
  //let [recieverUser, setRecieverUser] = useState('');

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
        <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}>Dismiss</Text>
        </TouchableOpacity>
        </View>
        

          );
        };
      
        // UNTESTED

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
              

              
            <Text style={{fontSize:20 , fontFamily: 'monospace', color: 'white'}}>{curr.email} 's Inbox</Text>
           <TextInput 
            style = {styles.input}
           textAlign={'center'}
           placeholderTextColor="white" 
            placeholder="Sender Username"
            onChangeText={
              (inboxOwner) => setInboxOwner(inboxOwner)
            }
            />


              <TouchableOpacity
                onPress={testing}
                style={[styles.button , {backgroundColor: "#CA5A37"}]}>
                <Text style={{color: "#FFFFFF", fontFamily: 'monospace'}}>Filter</Text>
              </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        );
      };
      
      export default TestingList;