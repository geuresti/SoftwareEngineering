

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
import MatchView from '../MatchView.js'
import ProfileView2 from '../ProfileView2.js';
import TeamView from '../TeamView.js';
import TeamEdit from '../TeamEdit.js';
import SeasonEdit from '../SeasonEdit.js'
import SeasonView from '../SeasonView.js'
import Schedule from '../Schedule.js'
import SeasonManager from '../SeasonManager.js';
import NotificationManager from '../NotificationManager.js'
import Request from '../Request.js';
import Inbox from '../Inbox.js';
import Home from '../Home.js';
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

it("renders seasonedit correctly", () => {
    renderer.create(<SeasonEdit />);
});

it("renders seasonview correctly", () => {
    renderer.create(<SeasonView />);
});

it("renders matchview correctly", () => {
    renderer.create(<MatchView />);
});

it("renders schedule correctly", () => {
    renderer.create(<Schedule />);
});

it("renders seasonmanager correctly", () => {
    renderer.create(<SeasonManager />);
});

it("renders notificationmanager correctly", () => {
    renderer.create(<NotificationManager />);
});

it("renders requests correctly", () => {
    renderer.create(<Request />);
});

it("renders inbox correctly", () => {
    renderer.create(<Inbox />);
});

it("renders home correctly", () => {
    renderer.create(<Home />);
});

