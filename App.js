import 'react-native-gesture-handler';

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AdminPage from './AdminPage.js';
import CreateTeam from './CreateTeam.js';
import TeamList from './TeamList.js';
import LoginScreen from './LoginScreen.js';
import UserList from './UserList.js';
import Realm from "realm";
import ProfileEdit from './ProfileEdit.js';
import ProfileView2 from './ProfileView2.js';
import NotificationManager from './NotificationManager.js'
import PlayerList from './PlayerList.js';
import Inbox from './Inbox.js';
import Request from './Request.js';
import TeamView from './TeamView.js';
import TeamEdit from './TeamEdit.js';
import SeasonManager from './SeasonManager.js';
import MatchView from './MatchView.js'
import MatchEdit from './MatchEdit.js'
import Schedule from './Schedule.js'
import MatchCreate from './MatchCreate.js'
import SeasonView from './SeasonView.js'
import SeasonEdit from './SeasonEdit.js'
import Home from './Home.js'

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
          name="Home"
          component={Home}
          options={{
            title: 'Home',

          }}
        />

        <Stack.Screen
          name="Schedule"
          component={Schedule}
          options={{
            title: 'Schedule',

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
          name="ProfileEdit"
          component={ProfileEdit}
          options={{
            title: 'Edit Profile', //Set Header Title
            
          }}
        />

        <Stack.Screen
          name="ProfileView2"
          component={ProfileView2}
          options={{
            title: 'Player Profile', //Set Header Title
            
          }}
        />

        <Stack.Screen
          name="MatchCreate"
          component={MatchCreate}
          options={{
            title: 'Match Create', 

          }}
        />
        <Stack.Screen
          name="MatchEdit"
          component={MatchEdit}
          options={{
            title: 'MatchEdit', 

          }}
        />

        <Stack.Screen
          name="TeamEdit"
          component={TeamEdit}
          options={{
            title: 'Edit Team', //Set Header Title
            
          }}
        />

        <Stack.Screen
          name="TeamList"
          component={TeamList}
          options={{
            title: 'Teams List', //Set Header Title
            
          }}
        />

        <Stack.Screen
          name="TeamView"
          component={TeamView}
          options={{
            title: 'Team Profile', //Set Header Title
            
          }}
        />

        <Stack.Screen
          name="NotificationManager"
          component={NotificationManager}
          options={{
            title: 'Notifications', 

          }}
        />

        <Stack.Screen
          name="PlayerList"
          component={PlayerList}
          options={{
            title: 'PlayerList', 

          }}
        />

        <Stack.Screen
          name="MatchView"
          component={MatchView}
          options={{
            title: 'MatchView', 

          }}
        />

        <Stack.Screen
          name="Inbox"
          component={Inbox}
          options={{
            title: 'Inbox', 

          }}
        />

        <Stack.Screen
          name="Request"
          component={Request}
          options={{
            title: 'Request', 

          }}
        />

        <Stack.Screen
          name="SeasonManager"
          component={SeasonManager}
          options={{
            title: 'SeasonManager', 
          }}
        />

        <Stack.Screen
          name="SeasonView"
          component={SeasonView}
          options={{
            title: 'SeasonView', 
          }}
        />

        <Stack.Screen
          name="SeasonEdit"
          component={SeasonEdit}
          options={{
            title: 'SeasonEdit', 
          }}
        />

        </Stack.Navigator>
    </NavigationContainer>
    
  );
};

export default App;
