import TeamDao from "../model/TeamDao"
import {expect, jest, test} from '@jest/globals'
import { TouchableOpacityComponent } from "react-native";


let teamDao = null

beforeEach(function(){
    teamDao = new TeamDao()
    teamDao.deleteTeam("test_team")
    teamDao.deleteTeam("test_team2")

});


test('create team', () => {

    let teamName = "test_team"
    let team = teamDao.createTeam(teamName)
    expect(team.teamName).toEqual(teamName)

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
    
    let created = teamDao.createTeam(teamName)
    let read = teamDao.readTeam(teamName)
    expect(created).toEqual(read)
    
  });

  test('update team by name', () => {
    let teamName = "test_team"
    let created = teamDao.createTeam(teamName)
    let read = teamDao.readTeam(teamName)
    let updated = teamDao.updateTeam(teamName, "joe", [""], record="1-1-0", 10, 0, 0, 0, 0, 0)
    let read2 = teamDao.readTeam(teamName)

    expect(read).not.toBe(read2)
    expect(read2.teamManager).toEqual("joe")
    expect(read2.record).toEqual("1-1-0")
    expect(read2.avgPoints).toEqual(10)
    
  });

  test('delete team by name', () => {
    let teamName = "test_team"
    let created = teamDao.createTeam(teamName)
    
    let deleted = teamDao.deleteTeam(teamName)
    let read = teamDao.readTeam(teamName)
    expect(read).toBe(null)
    
  });