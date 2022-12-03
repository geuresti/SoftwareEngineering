import 'react-native';
import React from 'react';
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
import { User } from 'realm';


it('renders createteam correctly', () => {
    const create_team_render = renderer.create(<CreateTeam />).toJSON();
    expect(create_team_render).toMatchSnapshot();
});

it('renders matchcreate correctly', () => {
    const match_create_render = renderer.create(<MatchCreate />).toJSON();
    expect(match_create_render).toMatchSnapshot();
});

it("renders adminpage correctly", () => {
    const admin_render = renderer.create(<AdminPage />).toJSON();
    expect(admin_render).toMatchSnapshot();
});

it("renders teamlist correctly", () => {
    const team_list_render = renderer.create(<TeamList />).toJSON();
    expect(team_list_render).toMatchSnapshot();
});

it("renders playerlist correctly", () => {
    const player_list_render = renderer.create(<PlayerList />).toJSON();
    expect(player_list_render).toMatchSnapshot();
});

it("renders userlist correctly", () => {
    const user_list_render = renderer.create(<UserList />).toJSON();
    expect(user_list_render).toMatchSnapshot();
});

it("renders loginscreen correctly", () => {
    const login_screen_render = renderer.create(<LoginScreen />).toJSON();
    expect(login_screen_render).toMatchSnapshot();
});

it("renders profileedit correctly", () => {
    const profile_edit_render = renderer.create(<ProfileEdit />).toJSON();
    expect(profile_edit_render).toMatchSnapshot();
});

it("renders profileview correctly", () => {
    const profile_view_render = renderer.create(<ProfileView2 />).toJSON();
    expect(profile_view_render).toMatchSnapshot();
});

it("renders teamview correctly", () => {
    const team_view_render = renderer.create(<TeamView />).toJSON();
    expect(team_view_render).toMatchSnapshot();
});

it("renders teamedit correctly", () => {
    const team_edit_render = renderer.create(<TeamEdit />).toJSON();
    expect(team_edit_render).toMatchSnapshot();
});

it("renders seasonedit correctly", () => {
    const season_edit_render = renderer.create(<SeasonEdit />).toJSON();
    expect(season_edit_render).toMatchSnapshot();
});

it("renders seasonview correctly", () => {
    const season_view_render = renderer.create(<SeasonView />).toJSON();
    expect(season_view_render).toMatchSnapshot();
});

it("renders matchview correctly", () => {
    const match_view_render = renderer.create(<MatchView />).toJSON();
    expect(match_view_render).toMatchSnapshot();
});

it("renders schedule correctly", () => {
    const schedule_render = renderer.create(<Schedule />).toJSON();
    expect(schedule_render).toMatchSnapshot();
});

it("renders season manager correctly", () => {
    const season_manager_render = renderer.create(<SeasonManager />).toJSON();
    expect(season_manager_render).toMatchSnapshot();
});

it("renders notification manager correctly", () => {
    const notification_manager_render = renderer.create(<NotificationManager />).toJSON();
    expect(notification_manager_render).toMatchSnapshot();
});

it("renders requests correctly", () => {
    const request_render = renderer.create(<Request />).toJSON();
    expect(request_render).toMatchSnapshot();
});

it("renders inbox correctly", () => {
    const inbox_render = renderer.create(<Inbox />).toJSON();
    expect(inbox_render).toMatchSnapshot();
});

it("renders home correctly", () => {
    const home_render = renderer.create(<Home />).toJSON();
    expect(home_render).toMatchSnapshot();
});
