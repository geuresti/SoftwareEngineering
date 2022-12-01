
/*
import NotificationManager from '../NotificationManager.js'
import Inbox from '../Inbox.js';
import Request from '../Request.js';
import SeasonManager from '../SeasonManager.js';
import MatchView from '../MatchView.js'
import Schedule from '../Schedule.js'
import MatchCreate from '../MatchCreate.js'
import SeasonView from '../SeasonView.js'
import SeasonEdit from '../SeasonEdit.js'
 */

import 'react-native';
import React from 'react';
//import App from '../App';
import MatchCreate from '../MatchCreate.js'
import CreateTeam from '../CreateTeam';
import AdminPage from '../AdminPage';
import TeamList from '../TeamList.js';
import PlayerList from "../PlayerList";
import LoginScreen from '../LoginScreen.js';
import ProfileEdit from '../ProfileEdit.js';
import UserList from '../UserList.js';
import ProfileView2 from '../ProfileView2.js';
import TeamView from '../TeamView.js';
import TeamEdit from '../TeamEdit.js';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


it('renders createteam correctly', () => {
  renderer.create(<CreateTeam />);
});

it('renders matchcreate correctly', () => {
    renderer.create(<MatchCreate />);
  });

it("renders adminpage correctly", () => {
    renderer.create(<AdminPage />);
});

it("renders teamlist correctly", () => {
    renderer.create(<TeamList />);
});

it("renders playerlist correctly", () => {
    renderer.create(<PlayerList />);
});

it("renders userlist correctly", () => {
    renderer.create(<UserList />);
});

it("renders userlist correctly", () => {
    renderer.create(<UserList />);
});

it("renders loginscreen correctly", () => {
    renderer.create(<LoginScreen />);
});

it("renders profileedit correctly", () => {
    renderer.create(<ProfileEdit />);
});

it("renders profileview correctly", () => {
    renderer.create(<ProfileView2 />);
});

it("renders teamview correctly", () => {
    renderer.create(<TeamView />);
});

it("renders teamedit correctly", () => {
    renderer.create(<TeamEdit />);
});