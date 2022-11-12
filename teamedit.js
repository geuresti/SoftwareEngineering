import React from "react";
import { Text, View, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Alert} from "react-native";


export default function Team(){
  const styles = StyleSheet.create({
    texttype: {fontSize:25 , fontFamily: 'Bungee-Regular', color: '#D9D9D9'},
    profileText: {
      position: 'absolute',
      top: 30,
      left: 20, 
      right: 0,
      bottom: 0,
      justifyContent: 'flex-start',
      },
    profileTextNames: {
        position: 'absolute',
        top: 103,
        left: 10, 
        right: 0,
        bottom: 500,
        justifyContent: 'flex-start',
      },
      button3: {
        //flex: 1,
        alignItems: "center",
        backgroundColor: "transparent",
        padding: 30,
        paddingHorizontal: 18,
        justifyContent: 'center',
        top:20,
        right:40
    
        
    },
input: {
    borderColor: "gray",
    color: "black",
    backgroundColor: "white",
    width: "90%",
    borderWidth: 2,
    borderRadius: 7,
    padding:3,
  },
  button2: {
    //flex: 1,
    alignItems: "center",
    backgroundColor: "#CA5A37",
    padding: 5,
    paddingHorizontal: 16,
    justifyContent: 'center'

    
},
  });
   return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
    <ImageBackground
     style={{
       //resizeMode: "center",
       height: '100%',
       width: '100%'
     }}
     source={require("./profilebg.png")}
   />
   <View style={{ position: 'absolute', top: 200, left: 50, height: 30, width: 30, resizeMode: 'stretch', alignItems:'center'}}>
   </View>
   <View style={styles.profileTextNames}>
    <Text style={[styles.texttype, {fontSize: 20, bottom:30}]}>Team Name</Text>
   </View>
    
     
        <View style={{position: 'absolute', top: 30, left: 0, right: 0, bottom:0, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput 
          style =  {[styles.input,{width:"90%"} ]} 
          textAlign={'center'}
          placeholder="Player" />
        </View>
    <View style={{position: 'absolute', top: 170, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput 
          style =  {[styles.input,{width:"90%"} ]} 
          textAlign={'center'}
          placeholder="Player" />
        </View>
    <View style={{position: 'absolute', top: 310, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput 
          style = {[styles.input,{width:"90%"} ]} 
          textAlign={'center'}
          placeholder="Player" />
        </View>
        <View style={{position: 'absolute', top: 470, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} 
          textAlign={'center'}
          placeholder="Player" />
        </View>


        <View style={{position: 'absolute', top: 0, left: 240, right: 0, bottom: 680, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            //inbox button, transparent
            //onPress={() => console.log("button pressed!")} 
            onPress={() => navigation.navigate('Inbox')} 
            style={styles.button3}>
        <Text style={{color: "white", fontSize: 28, fontFamily: 'Bungee-Regular'}}> Msgs</Text>
        </TouchableOpacity>
        </View>

        <View style={{position: 'absolute', top: 0, left: 405, right: 0, bottom: 680, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            //profile button, transparent
            //onPress={() => console.log("button pressed!")} 
            onPress={() => navigation.navigate('ProfileView2')} 
            //customClick={() => navigation.navigate('ProfileView')}
            style={styles.button3}>
        <Text style={{color: "white", fontSize: 30, fontFamily: 'Bungee-Regular'}}> Profile </Text>
        </TouchableOpacity>
        </View>

        <View style={{position: 'absolute', top: 620, left: 0, right: 180, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            //submit changes button
            //onPress={() => console.log("button pressed!")} 
            onPress={() =>Alert.alert("Changes Saved!")}
            style={styles.button2}>
        <Text style={{color: "white", fontSize: 14, fontFamily: 'Bungee-Regular'}}> Submit Changes </Text>
        </TouchableOpacity>
        
        </View>
  </View>
   );
}
