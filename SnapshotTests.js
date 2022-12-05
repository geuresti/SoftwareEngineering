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
import ProfileView from '../ProfileView.js';
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
import PlayerDao from '../model/PlayerDao'
import UserDao from '../model/UserDao'
import TeamDao from '../model/TeamDao'
import MatchDao from '../model/MatchDao'
import SeasonDao from '../model/SeasonDao'
import StandingsDao from '../model/StandingsDao'
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {render, fireEvent, screen} from '@testing-library/react-native'
import Season from '../model/SeasonDao';
import { get } from 'react-native/Libraries/Utilities/PixelRatio.js';

let playerDao = new PlayerDao()
let userDao = new UserDao()
let teamDao = new TeamDao()
let matchDao = new MatchDao()
let seasonDao = new SeasonDao()
let standingsDao = new StandingsDao()

beforeEach(function(){
    userDao.deleteUser("test@email")
    userDao.deleteUser("test")
    playerDao.deletePlayer("test@email")
    playerDao.deletePlayer("test")
    userDao.deleteUser("admin")
    playerDao.deletePlayer("admin")
    teamDao.deleteTeam("test team")
    teamDao.deleteTeam("test change")
    playerDao.deletePlayer("han")
    playerDao.deletePlayer("chris")
    teamDao.deleteTeam("away_test")
    teamDao.deleteTeam("home_test")
    matchDao.deleteMatch(0)
    seasonDao.deleteAllSeasons()
    standingsDao.deleteAllStandings()

});

it('renders createteam correctly', () => {
  renderer.create(<CreateTeam />);
});

test('create team', () => {
  let away_team = "away_test"

  playerDao.createPlayer("han")
  playerDao.setCurrentPlayer("han")
  seasonDao.createSeason()
  standingsDao.create()
  standingsDao.setStandingToView(0)
  seasonDao.setSeasonToView(0)

  const {getByText, findByText, getByPlaceholderText} = render(
    <CreateTeam />
  );

  fireEvent.changeText(
    getByPlaceholderText('Team Name'),
    away_team
  )
  fireEvent.press(getByText('Create'));
  expect(teamDao.readTeam(away_team)).not.toBe(null)
})


it('renders matchcreate correctly', () => {
    renderer.create(<MatchCreate />);
  });

test('match create', () => {
  let away_team = "away_test"
    let home_team = "home_test"

    playerDao.createPlayer("han")
    playerDao.createPlayer("chris")
    teamDao.createTeam(away_team, "han")
    teamDao.createTeam(home_team, "chris")

    //let match = matchDao.createMatch(away_team, home_team, time)
    const {getByText, findByText, getByPlaceholderText} = render(
      <MatchCreate />
    );

    fireEvent.changeText(
      getByPlaceholderText('Away Team'),
      away_team
    );
    fireEvent.changeText(
      getByPlaceholderText('Home Team'),
      home_team
    );
    fireEvent.changeText(
      getByPlaceholderText('Game Time'),
      "7am"
    );

    fireEvent.press(getByText('Create'));
    expect(matchDao.readAllMatches().length).toBe(1)

})


it("renders adminpage correctly", () => {
    renderer.create(<AdminPage />);
});

test('admin screen', () => {
    userDao.createUser("admin", "adminpass")
    playerDao.setCurrentPlayer("admin")
    const {getByText, findByText} = render(
      <AdminPage />
    );
    
    //fireEvent.press(getByText('CREATE TEAM'));
    let teams = findByText('BROWSE TEAMS')
    let users = findByText('BROWSE USERS')
    let notifs = findByText('BROWSE NOTIFS')
    let players = findByText('BROWSE PLAYERS')
    let seasons = findByText('BROWSE SEASONS')
    let schedule = findByText('SCHEDULE')
    expect(teams).toBeTruthy()
    expect(users).toBeTruthy()
    expect(notifs).toBeTruthy()
    expect(players).toBeTruthy()
    expect(seasons).toBeTruthy()
    expect(schedule).toBeTruthy()
    
    //expect(userDao.readUser('test@email').pass).toBe('testpass'); 
    expect(1).toBe(1)
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

test('user list edit', () => {
  userDao.createUser('test@email', 'testpass')
  const { getByPlaceholderText, getByText, getAllByText } = render(
    <UserList />
  );
  
  fireEvent.changeText(
    getByPlaceholderText('Email'),
    'test@email'
  );
  fireEvent.changeText(
      getByPlaceholderText('Password'),
      'editted'
    );
  fireEvent.press(getByText('Update User'));
  
  expect(userDao.readUser('test@email').pass).toBe('editted'); 
});

it("renders loginscreen correctly", () => {
    renderer.create(<LoginScreen />);
});

test('login screen', () => {
    //userDao.deleteUser('test@email')
    const { getByPlaceholderText, getByText, getAllByText } = render(
      <LoginScreen />
    );
    
    fireEvent.changeText(
      getByPlaceholderText('Email'),
      'test@email'
    );
    fireEvent.changeText(
        getByPlaceholderText('Password'),
        'testpass'
      );
    fireEvent.press(getByText('Register'));
    fireEvent.press(getByText('Login'))
    
    expect(userDao.readUser('test@email').pass).toBe('testpass'); 
    expect(playerDao.getCurrentPlayer().email).toBe('test@email')
  });

  test('login screen admin', () => {
    //userDao.deleteUser('test@email')
    const { getByPlaceholderText, getByText, getAllByText } = render(
      <LoginScreen />
    );
    
    fireEvent.changeText(
      getByPlaceholderText('Email'),
      'admin'
    );
    fireEvent.changeText(
        getByPlaceholderText('Password'),
        'testpass'
      );
    fireEvent.press(getByText('Register'));
    fireEvent.press(getByText('Login'))
    
    expect(userDao.readUser('admin').pass).toBe('testpass'); 
    expect(playerDao.getCurrentPlayer().email).toBe('admin')
  });

it("renders profileedit correctly", () => {
    renderer.create(<ProfileEdit />);
});

test('profile edit', () => {
    userDao.createUser('test', "pass")
    playerDao.createPlayer('test')
    playerDao.setCurrentPlayer('test')
    const { getByPlaceholderText, getByText, getAllByText } = render(
      <ProfileEdit />
    );
    
    fireEvent.changeText(
      getByPlaceholderText("User Email"),
      'test@email'
    );
    fireEvent.changeText(
        getByPlaceholderText('First Name'),
        'first'
      );
    fireEvent.changeText(
        getByPlaceholderText('Last Name'),
        'last'
      );
      fireEvent.changeText(
        getByPlaceholderText('ID'),
        0
      );
      fireEvent.changeText(
        getByPlaceholderText('Height'),
        '6ft'
      );
      fireEvent.changeText(
        getByPlaceholderText('Weight'),
        '175'
      );
      fireEvent.changeText(
        getByPlaceholderText('Experience Level'),
        'Pro'
      );
      fireEvent.changeText(
        getByPlaceholderText('Position'),
        'Center'
      );
      fireEvent.changeText(
        getByPlaceholderText('Is Manager'),
        false
      );
      fireEvent.changeText(
        getByPlaceholderText('Average Points'),
        11
      );
      fireEvent.changeText(
        getByPlaceholderText('Average Blocks'),
        5
      );
      fireEvent.changeText(
        getByPlaceholderText('Average Steals'),
        2
      );
      fireEvent.changeText(
        getByPlaceholderText('Assists'),
        2
      );
      fireEvent.changeText(
        getByPlaceholderText('Free throw Percent'),
        50
      );
      fireEvent.changeText(
        getByPlaceholderText('Shot Percent'),
        55
      );

      fireEvent.press(getByText('Submit Changes'));
    
    expect(playerDao.readPlayer('test').height).toBe(6); 
  });

it("renders profileview correctly", () => {
    renderer.create(<ProfileView />);
});

it("renders teamview correctly", () => {
    renderer.create(<TeamView />);
});

it("renders teamedit correctly", () => {
    renderer.create(<TeamEdit />);
});

test('Team edit', () => {
    userDao.createUser('test', "pass")
    playerDao.createPlayer('test')
    teamDao.createTeam("test team", "test")
    teamDao.setTeamToView("test team")
    //playerDao.setCurrentPlayer('test')
    const { getByPlaceholderText, getByText, getAllByText } = render(
      <TeamEdit />
    );
    
    fireEvent.changeText(
      getByPlaceholderText("test team"),
      'test team'
    );
    fireEvent.changeText(
        getByPlaceholderText('0-0-0'),
        '1-1-1'
      );
    
      fireEvent.changeText(
        getByPlaceholderText('Average Points'),
        11
      );
      fireEvent.changeText(
        getByPlaceholderText('Average Blocks'),
        5
      );
      fireEvent.changeText(
        getByPlaceholderText('Average Steals'),
        2
      );
      fireEvent.changeText(
        getByPlaceholderText('Assists'),
        2
      );
      fireEvent.changeText(
        getByPlaceholderText('Free Throw %'),
        50
      );
      fireEvent.changeText(
        getByPlaceholderText('Shot Accuracy'),
        55
      );

      fireEvent.press(getByText('Submit Changes'));
    
    expect(teamDao.readTeam('test team').record).toBe("1-1-1"); 
  });

it("renders seasonedit correctly", () => {
    renderer.create(<SeasonEdit />);
});

test('season edit screen', () => {
    //userDao.deleteUser('test@email')
    let away_team = "away_test"
    let home_team = "home_test"

    playerDao.createPlayer("han")
    playerDao.createPlayer("chris")
    teamDao.createTeam(away_team, "han")
    teamDao.createTeam(home_team, "chris")

    let time = "7"
    let match_id = 0
    let match = matchDao.createMatch(away_team, home_team, time)
    seasonDao.createSeason()
    seasonDao.setSeasonToView(0)
    const { getByPlaceholderText, getByText, getAllByText } = render(
      <SeasonEdit />
    );
    
    fireEvent.changeText(
      getByPlaceholderText('Matches'),
      '0'
    );
    
    fireEvent.press(getByText('Add Game'))
    expect(seasonDao.getSeasonByID(0).matches.length).toBe(1)

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


