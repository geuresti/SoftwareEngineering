import React, {useState} from "react";
import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Alert, navigation} from "react-native";
import { block } from "react-native-reanimated";
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
  

  let playerDao = new PlayerDao()
  let curr = playerDao.getCurrentPlayer()
  let player = playerDao.readPlayer(curr.email)


  let [f_new, setFirstName] = useState(player.first_name);
  let [l_new, setLastName] = useState(player.last_name);
  let [h_new, setHeight] = useState(player.height);
  let [w_new, setWeight] = useState(player.weight);
  let [p_new, setPosition] = useState(player.position);
  let [e_new, setExperience] = useState(player.experience);
  let [points_new, setPoints] = useState(player.avgPoints);
  let [blocks_new, setBlocks] = useState(player.avgBlocks);
  let [steals_new, setSteals] = useState(player.avgSteals);
  let [a_new, setAssists] = useState(player.assists);
  let [f_throw_per, setFrees] = useState(player.freethrowPercent);
  let [s_new_percent, setPercent] = useState(player.shotPercent)
  
  let updateMethod = () => {
    playerDao.updatePlayer(player.email, f_new, l_new , player.team_id, h_new, w_new, p_new, e_new, player.isManager, points_new, blocks_new, steals_new,a_new, parseInt(f_throw_per),s_new_percent)
    Alert.alert(
      'Success',
      'Profile Updated',
      [
        {
          text: 'Ok',
          onPress: () => navigation.navigate('ProfileView'),
        },
      ],
      { cancelable: false }
    );
  }
  let placeholders = (attr, item) => {
    if(item)
      return item
    else return attr
  }
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

    <View style={{position: 'absolute', top: -470, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder={placeholders("First Name", player.first_name)}
          onChangeText={
            (f_new) => setFirstName(f_new)
          }
          />

    </View>

    <View style={{position: 'absolute', top: -390, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder={placeholders("Last Name", player.last_name)} 
          onChangeText={
            (l_new) => setLastName(l_new)
          }
          />
    </View>
        <View style={{position: 'absolute', top: -230, left: 0, right: 0, bottom:0, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput 
          style = {styles.input} keyboardType='numeric'
          textAlign={'center'}
          placeholder={placeholders("Height", player.height)}
          onChangeText={
            (height_new) => setHeight(height_new)
           }
          />
        </View>
     
    <View style={{position: 'absolute', top: -150, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput 
          style = {styles.input} keyboardType='numeric'
          textAlign={'center'}
          placeholder={placeholders("Weight", player.weight)}
          onChangeText={
            (w_new) => setWeight(w_new)
          }
          
          />
        </View>

      
    <View style={{position: 'absolute', top: -70, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default" 
          textAlign={'center'}
          placeholder={placeholders("Experience Level", player.experience)}
          onChangeText={
            (e_new) => setExperience(e_new)
          } 
          />
        </View>
        <View style={{position: 'absolute', top: 10, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder={placeholders("Position(s)", player.position)}
          onChangeText={
            (p_new) => setPosition(p_new)
          } 
          />
        </View>
        <View style={{position: 'absolute', top: 170, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder={placeholders("Average Points", player.avgPoints)}
          onChangeText={
            (points_new) => setPoints(points_new)
          }
          />
        </View>
        <View style={{position: 'absolute', top: 250, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder={placeholders("Average Blocks", player.avgBlocks)}
           onChangeText={
            (blocks_new) => setBlocks(blocks_new)
          }  
          />
        </View>
        <View style={{position: 'absolute', top: 330, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder={placeholders("Average Steals", player.avgSteals)} 
          onChangeText={
            (steals_new) => setSteals(steals_new)
          } 
          />
        </View>
        <View style={{position: 'absolute', top: 410, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder={placeholders("Assists", player.assists)}
          onChangeText={
            (a_new) => setAssists(a_new)
          }
          />
        </View>
        <View style={{position: 'absolute', top: 495, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "numeric"
          textAlign={'center'}
          placeholder={placeholders("Free Throw %", player.freethrowPercent)}
          value={Number}
          onChangeText={
            (f_throw_per) => setFrees(f_throw_per )
          } 
          />
        </View>
        <View style={{position: 'absolute', top: 580, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} 
          textAlign={'center'}
          placeholder={placeholders("Shot Accuracy", player.shotPercent)}
           onChangeText={
            (s_new_percent) => setPercent(s_new_percent)
          } 
          />
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

        <View style={{position: 'absolute', top: 0, left: 380, right: 0, bottom: 680, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            //profile button, transparent
            //onPress={() => console.log("button pressed!")} 
            onPress={() => navigation.navigate('ProfileView2')} 
            //customClick={() => navigation.navigate('ProfileView')}
            style={styles.button3}>
        <Text style={{color: "white", fontSize: 28, fontFamily: 'Bungee-Regular'}}> Profile </Text>
        </TouchableOpacity>


  
        </View>
        <View style={{position: 'absolute', top: 650, left: 0, right: 180, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
            //submit changes button
            //onPress={() => console.log("button pressed!")} 
            onPress={updateMethod}
            style={styles.button2}>
        <Text style={{color: "white", fontSize: 14, fontFamily: 'Bungee-Regular'}}> Submit Changes </Text>
        </TouchableOpacity>
        
        </View>
  </View>
   );
}

export default ProfileEdit
