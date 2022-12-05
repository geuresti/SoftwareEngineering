import MatchDao from "../model/MatchDao"
import TeamDao from "../model/TeamDao"
import PlayerDao from "../model/PlayerDao"
import {expect, jest, test} from '@jest/globals'

let matchDao = null 
let teamDao = null 
let playerDao = null 

beforeEach(function(){
    matchDao = new MatchDao()
    teamDao = new TeamDao()
    playerDao = new PlayerDao()
    playerDao.deletePlayer("han")
    playerDao.deletePlayer("chris")
    teamDao.deleteTeam("away_test")
    teamDao.deleteTeam("home_test")
    matchDao.deleteMatch(0)

});

test('create match', () => {

    let away_team = "away_test"
    let home_team = "home_test"

    playerDao.createPlayer("han")
    playerDao.createPlayer("chris")
    teamDao.createTeam(away_team, "han")
    teamDao.createTeam(home_team, "chris")

    let time = "7"
    let match_id = 0
    let match = matchDao.createMatch(away_team, home_team, time)
    let match2 = matchDao.readMatch(match_id)

    expect(match).toEqual(match2)
  });

  test('read match with nonexistant id', () => {

    let match_id = 999
    let match = matchDao.readMatch(match_id)
    expect(match).toBe(null)
    
  });

  test('read match by matchid', () => {
    let match_id = 0
    let away_team = "away_test"
    let home_team = "home_test"

    playerDao.createPlayer("han")
    playerDao.createPlayer("chris")
    teamDao.createTeam(away_team, "han")
    teamDao.createTeam(home_team, "chris")

    let time = "7"
    let created = matchDao.createMatch(away_team, home_team, time)
    let read = matchDao.readMatch(match_id)
    expect(created).toEqual(read)
    
  });

  test('update match by id', () => {
    let match_id = 0
    let away_team = "away_test"
    let home_team = "home_test"
    let time = "7"

    playerDao.createPlayer("han")
    playerDao.createPlayer("chris")
    teamDao.createTeam(away_team, "han")
    teamDao.createTeam(home_team, "chris")

    let created = matchDao.createMatch(away_team, home_team, time)
    let read = matchDao.readMatch(match_id)
    let updated = matchDao.updateMatch(match_id, 1, 2, "7", 20, 1, 1, 1, 1, 1, 1, 1, 1, 1)
    let read2 = matchDao.readMatch(match_id)

    expect(read).not.toBe(updated)
    expect(read2.away_team_score).toEqual(1)
    expect(read2.home_team_score).toEqual(2)
    expect(read2.game_time).toEqual("7")
    expect(read2.h_team_blocks).toEqual(20)
    
  });

  test('get all matches', () =>{
    let away_team = "away_test"
    let home_team = "home_test"

    playerDao.createPlayer("han")
    playerDao.createPlayer("chris")
    teamDao.createTeam(away_team, "han")
    teamDao.createTeam(home_team, "chris")

    let time = "7"
    let match = matchDao.readAllMatches()
    let len = match.length
    let m = matchDao.createMatch(away_team, home_team, time)
    let matches_after = matchDao.readAllMatches()
    //expect(len+1).toBe(matches_after.length)
    expect(m.match_id).toBe(0)
  
  }); 

  test('delete match by id', () => {
    let match_id = 0
    let away_team = "away_test"
    let home_team = "home_test"

    playerDao.createPlayer("han")
    playerDao.createPlayer("chris")
    teamDao.createTeam(away_team, "han")
    teamDao.createTeam(home_team, "chris")

    let time = "7"
    let created = matchDao.createMatch(away_team, home_team, time)
    
    let deleted = matchDao.deleteMatch(match_id)
    let read = matchDao.readMatch(match_id)
    expect(read).toBe(null)
    
  });
