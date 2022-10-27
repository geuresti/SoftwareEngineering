import 'react-native-gesture-handler';

import * as React from 'react';
import { Button, View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from "./LoginScreen.js"
import UserList from "./UserList.js"
import AdminPage from './AdminPage.js';
import CreateTeam from './CreateTeam.js';
import TeamList from './TeamList.js';

const Stack = createStackNavigator();

const App = () => {
  return (
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
            title: 'UserList', //Set Header Title

          }}
        />

        <Stack.Screen
          name="AdminPage"
          component={AdminPage}
          options={{
            title: 'Admin Page', //Set Header Title

          }}
        />

        <Stack.Screen
          name="CreateTeam"
          component={CreateTeam}
          options={{
            title: 'Create Team', //Set Header Title

          }}
        />  

        <Stack.Screen
          name="TeamList"
          component={TeamList}
          options={{
            title: 'Team List', //Set Header Title

          }}
        />  
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
