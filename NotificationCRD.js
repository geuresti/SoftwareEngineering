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


const TestingList = ({ navigation }) => {
  
  const db = realm.objects("Notification");
  console.log("NOTIFICATIONS:", db);
  console.log("length:", db.length);

  let notifID = db.length
  console.log("CURRENT ID:", notifID);    // THIS ISN't updating in REAL TIME
  let [senderID, setSenderID] = useState('');
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

        <Text style={styles.textheader}>Sender ID</Text>
        <Text style={styles.textbottom}>{item.senderID}</Text>
      
        <Text style={styles.textheader}>Notification Content</Text>
        <Text style={styles.textbottom}>{item.content}</Text>
        
          
        </View>
          );
        };
      
        // UNTESTED
        let deleteNotif = () => {
          realm.write(() => {
          const testDel = realm.objectForPrimaryKey("Notification", notifID);
          console.log(testDel);
          realm.delete(testDel)
        });

          Alert.alert(
            'Success',
            'You have Deleted Successfully',
            [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('TestingList'),
              },
            ],
            { cancelable: false }
          );
          
        };

        /*
        id: "int",
        senderID: {type: "int", default: 0},
        content: "string",
        */
        let createNotif = () => {
          let user;
          realm.write(() => {
            user = realm.create("Notification", {id: notifID, content: notifContent, senderID: parseInt(senderID)});
          })
        }
    
        // UNTESTED
        let updateNotif = () => {
      
            // CONTROLLER BEHAVIOR
          if (!senderID) {
            alert('Please provide sender ID');
            return;
          }
          if (!notifContent) {
            alert('Please provide content');
            return;
          }

          realm.write(() => {
            const testUp = realm.objectForPrimaryKey("Notification", notifID);
          console.log(testUp);
          testUp.senderID = senderID;
          testUp.content = notifContent;
        });
          
          Alert.alert('Success','User updated successfully',
             [
              {
               text: 'Ok',
               onPress: () => navigation.navigate('TestingList'),
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
      
      export default TestingList;
