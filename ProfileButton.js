import React, { useEffect, useState } from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Button, Alert, SafeAreaView, FlatList} from "react-native";
import { useNavigation } from '@react-navigation/native';

const ProfileButton = () => {
    //const navigation = useNavigation();
    const styles = StyleSheet.create({

      button3: {
        //flex: 1,
        alignItems: "center",
        backgroundColor: "green",
        padding: 30,
        paddingHorizontal: 18,
        justifyContent: 'center',
        top:20,
        right:40
  
    }
      })

    return(
    
        <View style={{position: 'absolute', top: 0, left: 405, right: 0, bottom: 680, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            //onPress={() => navigation.navigate('ProfileView')} 
            
            style={styles.button3}>
        <Text style={{color: "white", fontSize: 30, fontFamily: 'Bungee-Regular'}}> Profile </Text>
        </TouchableOpacity>
        </View>
    


    )
}
export default ProfileButton 


