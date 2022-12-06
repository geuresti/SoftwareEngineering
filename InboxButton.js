import React, { useEffect, useState } from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Button, Alert, SafeAreaView, FlatList} from "react-native";
import { useNavigation } from '@react-navigation/native';

const InboxButton = () => {
    const styles = StyleSheet.create({


      button3: {
        //flex: 1,
        alignItems: "center",
        backgroundColor: "transparent",
        padding: 30,
        paddingHorizontal: 18,
        justifyContent: 'center',
        top:20,
        //right:40
  
    }
      })

      const navigation = useNavigation();

    return(
    
    //<View style={{position: 'absolute', top: 0, left: 240, right: 0, bottom: 680, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            //onPress={() => navigation.navigate('Inbox', {data:[]})} 
            style={styles.button3}>
        <Text style={{color: "white", fontSize: 14, fontFamily: 'Bungee-Regular'}}> Msgs</Text>
        </TouchableOpacity>
    //    </View>


    )
}
export default InboxButton 


