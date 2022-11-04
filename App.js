import 'react-native-gesture-handler';

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//import LoginScreen from "./LoginScreen.js"
//import UserList from "./UserList.js"
import AdminPage from './AdminPage.js';
import CreateTeam from './CreateTeam.js';
import TeamList from './TeamList.js';
import LoginScreen from './LoginScreen.js';
import UserList from './UserList.js';
import Realm from "realm";


const Stack = createStackNavigator();

const App = () => {
  return (
   // < LoginScreen/>
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            title: 'Login', //Set Header Title
            
          }}
        />

        <Stack.Screen
          name="UserList"
          component={UserList}
          options={{
            title: 'UserList', 

          }}
        />

        <Stack.Screen
          name="AdminPage"
          component={AdminPage}
          options={{
            title: 'Admin Page',

          }}
        />

        <Stack.Screen
          name="CreateTeam"
          component={CreateTeam}
          options={{
            title: 'Create Team', 

          }}
        />  

        <Stack.Screen
          name="TeamList"
          component={TeamList}
          options={{
            title: 'Team List', 
          }}
        />  
        </Stack.Navigator>
    </NavigationContainer>
    
  );
};

export default App;
