mport React, {useState} from "react";
import { Text, View, Image, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Alert, navigation} from "react-native";
import { block } from "react-native-reanimated";
import PlayerDao from "./model/PlayerDao.js"
// import PlayerList from "./PlayerList.js"


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
  // let player = playerDao.readPlayer(curr.email)
  
  let [userEmail, setUserEmail] = useState('');
  let [first_name, setFirstName] = useState('');
  let [l_new, setLastName] = useState('');
  let [id_new, setId]  = useState('');
  let [h_new, setHeight] = useState('');
  let [w_new, setWeight] = useState('');
  let [p_new, setPosition] = useState('');
  let [e_new, setExperience] = useState('');
  let [m_new, setManager] = useState('');
  let [points_new, setPoints] = useState('');
  let [blocks_new, setBlocks] = useState('');
  let [steals_new, setSteaals] = useState('');
  let [a_new, setAssists] = useState('');
  let [f_throw_per, setFrees] = useState('');
  let [s_new_percent, setPercent] = useState('')

  // let playerUpdate = playerDao.updatePlayer(userEmail, f_new, l_new , id_new, h_new, w_new, p_new, e_new, m_new, points_new, blocks_new, steals_new,a_new, f_throw_per,s_new_percent)
  // let playerDelete = playerDao.deletePlayer(curr.deletePlayer)
  
  let updatePlayer = () => {
      
    if (!userEmail) {
      alert('Please fill player email');
      return;
    }
    let read = playerDao.readPlayer(userEmail);
    // let read = playerDao.readPlayer(useremail)

    if(!read){
      playerDao.updatePlayer(
        userEmail, read.first_name, read.last_name, read.team_id, read.height, read.weight, read.position, read.experience, read.isManager, read.avgPoints, read.avgBlocks, read.avgSteals, read.assists, read.freethrowPercent, read.shotPercent, 
        read.avgBlocks, read.avgSteals, read.avgAssists, read.freethrowPercent, read.shotPercent)
        console.log("email", playerDao.userEmail)
        alert(
        'Success',
        'You have Updated Successfully',
        [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('ProfileView'),
          },
        ],
        { cancelable: false }
      );
    
    } 
  
    else{
      alert(
        'Player does not exist',
        [
          {
          text: 'Ok',
          onPress: () => navigation.navigate('ProfileView'),
        },
      ],
      { cancelable: false }
    );
    
  };
}


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
          onChangeText={
            (userEmail) => setUserEmail(userEmail)
            

          
        } 
      
        />
        </View>
  
  

    <View style={{position: 'absolute', top: -470, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder="First Name" 
          onChangeText={
            (first_name) => setFirstName(first_name)
          }
          />

    </View>

    <View style={{position: 'absolute', top: -390, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder="Last Name" 
          onChangeText={
            (l_new) => setLastName(l_new)
          }
          />
    </View>
    <View style={{position: 'absolute', top: -310, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType ="default"
          textAlign={'center'}
          placeholder="ID" 
          onChangeText={
            (id_new) => setId(id_new)
          
          }
         />
    </View>
        <View style={{position: 'absolute', top: -230, left: 0, right: 0, bottom:0, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput 
          style = {styles.input} keyboardType='numeric'
          textAlign={'center'}
          placeholder="Height" 
          onChangeText={
            (height_new) => setHeight(height_new)
           }
          />
        </View>
     
    <View style={{position: 'absolute', top: -150, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput 
          style = {styles.input} keyboardType='numeric'
          textAlign={'center'}
          placeholder="Weight" 
          onChangeText={
            (w_new) => setWeight(w_new)
          }
          
          />
        </View>

      
    <View style={{position: 'absolute', top: -70, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default" 
          textAlign={'center'}
          placeholder="Experience Level" 
          onChangeText={
            (e_new) => setExperience(e_new)
          } 
          />
        </View>
        <View style={{position: 'absolute', top: 10, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder="Position" 
          onChangeText={
            (p_new) => setPosition(p_new)
          } 
          />
        </View>
        <View style={{position: 'absolute', top: 90, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder="Is Manager" 
          onChangeText={
            (m_new) => setManager(m_new)
          }
          />
        </View>
        <View style={{position: 'absolute', top: 170, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder="Average Points" 
          onChangeText={
            (points_new) => setPoints(points_new)
          }
          />
        </View>
        <View style={{position: 'absolute', top: 250, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder="Average Blocks" 
           onChangeText={
            (blocks_new) => setBlocks(blocks_new)
          }  
          />
        </View>
        <View style={{position: 'absolute', top: 330, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder="Average Steals" 
          onChangeText={
            (steals_new) => setSteaals(steals_new)
          } 
          />
        </View>
        <View style={{position: 'absolute', top: 410, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder="Assists" 
          onChangeText={
            (a_new) => setAssists(a_new)
          }
          />
        </View>
        <View style={{position: 'absolute', top: 495, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} keyboardType = "default"
          textAlign={'center'}
          placeholder="Free throw Percent" 
          onChangeText={
            (f_throw_per) => setFrees(f_throw_per )
          } 
          />
        </View>
        <View style={{position: 'absolute', top: 580, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
    <TextInput 
          style = {[styles.input,{width:"90%"} ]} 
          textAlign={'center'}
          placeholder="Shot Percent" 
           onChangeText={
            (s_new_percent) => setPercent(s_new_percent)
          } 
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
            // onPress={() =>Alert.alert("Changes Saved!")}
            // onPress={() => navigation.navigate('ProfileList')}
            onPress={updatePlayer}
            style={styles.button2}>
        <Text style={{color: "white", fontSize: 14, fontFamily: 'Bungee-Regular'}}> Submit Changes </Text>
        </TouchableOpacity>
        
        </View>
  </View>
   );
}

export default ProfileEdit
