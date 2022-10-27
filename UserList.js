import React, { useEffect, useState } from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Button, Alert, SafeAreaView, FlatList} from "react-native";
import Mybutton from './pages/components/Mybutton';
import Mytext from './pages/components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const UserList = ({ navigation }) => {

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
              </View>
           <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
                www.edafait.com
              </Text>
            </View>
          </SafeAreaView>
        );
      };
      
      export default UserList;     
