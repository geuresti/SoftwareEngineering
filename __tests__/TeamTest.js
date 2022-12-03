import TeamDao from "../model/TeamDao"
import PlayerDao from "../model/PlayerDao"
import {expect, jest, test} from '@jest/globals'



let teamDao = null
let playerDao = null

beforeEach(function(){

    teamDao = new TeamDao()
    playerDao = new PlayerDao()
    teamDao.deleteTeam("test_team")
    playerDao.deletePlayer("joe")
    playerDao.deletePlayer("bob")

});


test('create team', () => {

    let teamName = "test_team"
    let manager = "joe"
    playerDao.createPlayer(manager)
    playerDao.setCurrentPlayer(manager)
    let team = teamDao.createTeam(teamName, manager)

    let team2 = teamDao.readTeam(teamName)

    expect(team).toEqual(team2)
  });

test('read team with nonexistant name', () => {

    let teamName = "notValidTeam"
    let team = teamDao.readTeam(teamName)
    expect(team).toBe(null)
    
  });

test('read team by name', () => {
    let teamName = "test_team"
    let manager = "joe"
    playerDao.createPlayer(manager)
    playerDao.setCurrentPlayer(manager)
    let created = teamDao.createTeam(teamName, manager)
    let read = teamDao.readTeam(teamName)
    expect(created).toEqual(read)
    
  });

  test('update team by name', () => {
    let teamName = "test_team"
    let manager = "joe"
    playerDao.createPlayer(manager)
    playerDao.setCurrentPlayer(manager)
    let created = teamDao.createTeam(teamName, manager)
    let read = teamDao.readTeam(teamName)
    let updated = teamDao.updateTeam(teamName, "bob", [""], record="1-1-0", 10, 1, 1, 1, 1, 1)
    let read2 = teamDao.readTeam(teamName)

    expect(read).not.toBe(read2)
    expect(read2.teamManager).toEqual("bob")
    expect(read2.record).toEqual("1-1-0")
    expect(read2.avgPoints).toEqual(10)
    
  });

  test('delete team by name', () =>{
    let teamName = "test_team"
    let manager = "joe"
    playerDao.createPlayer(manager)
    let created = teamDao.createTeam(teamName, manager)
    
    let deleted = teamDao.deleteTeam(teamName)
    let read = teamDao.readTeam(teamName)
    expect(read).toBe(null)
    
  });

  test('get all teams', () =>{
    let email = "test_team"
    let manager = "joe"
    playerDao.createPlayer(manager)
    playerDao.setCurrentPlayer(manager)
    let team = teamDao.readAllTeams()
    let len = team.length
    let t = teamDao.createTeam(email, manager)
    let teams_after = teamDao.readAllTeams()
    expect(len+1).toBe(teams_after.length)
  
  })

  test('change team manager', () => {
    let teamName = "test_team"
    let manager = "joe"
    playerDao.createPlayer(manager)
    playerDao.setCurrentPlayer(manager)
    let created = teamDao.createTeam(teamName, manager)
    let updated = teamDao.updateManager(teamName, "bob")
    expect(created).not.toBe(updated)
    expect(updated.teamManager).toBe("bob")
  })

  test('find team by manager', () => {
    let teamName = "test_team"
    let manager = "joe"
    playerDao.createPlayer(manager)
    playerDao.setCurrentPlayer(manager)
    let created = teamDao.createTeam(teamName, manager)
    let test = teamDao.getTeamByManager(manager)
    expect(created).toEqual(test)
  })

  test('add player and remove player from team', () => {
    let teamName = "test_team"
    let manager = "joe"
    playerDao.createPlayer(manager)
    playerDao.setCurrentPlayer(manager)
    let created = teamDao.createTeam(teamName, manager)
    let addedPlayer = playerDao.createPlayer("bob")
    teamDao.addPlayer(teamName, "bob")
    expect(teamDao.readTeam(teamName).players[0]).toBe("bob")

    teamDao.removePlayer(teamName, "bob")
    expect(teamDao.readTeam(teamName).players[0]).toBe("")

  })

  test('set and get team to view', () => {
    let teamName = "test_team"
    let manager = "joe"
    playerDao.createPlayer(manager)
    let created = teamDao.createTeam(teamName, manager)
    teamDao.setTeamToView(teamName)
    expect(teamDao.getTeamToView().teamName).toBe("test_team")
    let record = teamDao.getRecord(teamName)
    expect(record).toBe("0-0-0")
  })

