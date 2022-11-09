import React from "react";
import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Alert, navigation} from "react-native";
import PlayerDao from "./model/PlayerDao.js"


const ProfileEdit = ({ navigation }) => {


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
    padding: 0,
    paddingHorizontal: 30,
    justifyContent: 'center'

    
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
  

  let playerDao = new PlayerDao()
  let curr = playerDao.getCurrentPlayer()
  let player = playerDao.readPlayer(curr.email)
  let playerUpdate = playerDao.updatePlayer(curr.email, f_new="", l_new ="", id_new="", h_new=0, w_new=0, p_new="", e_new="", m_new = Boolean(), points_new =0, blocks_new=0, steals_new =0,a_new=0, f_throw_per=0,s_new_percent=0)
  // let playerDelete = playerDao.deletePlayer(curr.deletePlayer)


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
   
   
    
   
     
    <View style={{position: 'absolute', top: -550, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]}  keyboardType="email-address"
          textAlign={'center'}
          placeholder="User Email" 
          //onChangeText={
            // playerUpdate.email
        //}
        />
        </View>

    <View style={{position: 'absolute', top: -470, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder="First Name" 
          // onChangeText={
          // playerUpdate.f_name
          // }
          />

    </View>

    <View style={{position: 'absolute', top: -390, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder="Last Name" 
          // onChangeText={
            // playerUpdate.l_new
          // }
          />
    </View>
    <View style={{position: 'absolute', top: -310, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType ="default"
          textAlign={'center'}
          placeholder="ID" 
          // onChangeText={
            // playerUpdate.id_new
         //  }
         />
    </View>
        <View style={{position: 'absolute', top: -230, left: 0, right: 0, bottom:0, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput 
          style = {styles.input} keyboardType='numeric'
          textAlign={'center'}
          placeholder="Height" 
          // onChangeText={
            // playerUpdate.h_new
          // }
          />
        </View>
     
    <View style={{position: 'absolute', top: -150, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput 
          style = {styles.input} keyboardType='numeric'
          textAlign={'center'}
          placeholder="Weight" 
          /* onChangeText={
           //  playerUpdate.w_new
          } */
          />
        </View>

      
    <View style={{position: 'absolute', top: -70, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default" 
          textAlign={'center'}
          placeholder="Experience Level" 
          /* onChangeText={
            //playerUpdate.e_new
          } */
          />
        </View>
        <View style={{position: 'absolute', top: 10, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder="Position" 
          /* onChangeText={
            //playerUpdate.p_new
          } */
          />
        </View>
        <View style={{position: 'absolute', top: 90, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder="Is Manager" 
          /* onChangeText={
            // playerUpdate.m_new
          } */
          />
        </View>
        <View style={{position: 'absolute', top: 170, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder="Average Points" 
          /* onChangeText={
            // playerUpdate.points_new
          } */
          />
        </View>
        <View style={{position: 'absolute', top: 250, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder="Average Blocks" 
          /* onChangeText={
            // playerUpdate.blocks_new
          } */
          />
        </View>
        <View style={{position: 'absolute', top: 330, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder="Average Steals" 
          /* onChangeText={
            //playerUpdate.steals_new
          } */
          />
        </View>
        <View style={{position: 'absolute', top: 410, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder="Assists" 
          /* onChangeText={
            //playerUpdate.a_new
          } */
          />
        </View>
        <View style={{position: 'absolute', top: 495, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder="Free throw Percent" 
          /* onChangeText={
            // playerUpdate.f_throw_per
          } */
          />
        </View>
        <View style={{position: 'absolute', top: 580, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} 
          textAlign={'center'}
          placeholder="Shot Percent" 
           /* onChangeText={
            // playerUpdate.s_new_percent
          } */
          />
        </View>
    


        <View style={{position: 'absolute', top: 0, left: 240, right: 0, bottom: 680, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            //inbox button, transparent
            //onPress={() => console.log("button pressed!")} 
            onPress={() =>Alert.alert("inbox")}
            style={styles.button3}>
        <Text style={{color: "transparent", fontSize: 28, fontFamily: 'Bungee-Regular'}}> </Text>
        </TouchableOpacity>
        </View>

        <View style={{position: 'absolute', top: 0, left: 380, right: 0, bottom: 680, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            
            onPress={() =>Alert.alert("profile")}
            style={styles.button3}>
        <Text style={{color: "transparent", fontSize: 28, fontFamily: 'Bungee-Regular'}}> </Text>
        </TouchableOpacity>
        </View>
        <View style={{position: 'absolute', top: 650, left: 0, right: 180, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
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

export default ProfileEdit
