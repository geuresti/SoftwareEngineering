import MatchDao from "../model/MatchDao"
import {expect, jest, test} from '@jest/globals'
import { TouchableOpacityComponent } from "react-native";

let matchDao = null 

beforeEach(function(){
    matchDao = new MatchDao()
    matchDao.deleteMatch("test_match")
    matchDao.deleteMatch("test_match2")

});

test('create match', () => {

    let match_id = 1
    let match = teamDao.createTeam(match_id)
    let match2 = teamDao.readTeam(match_id)

    expect(match).toEqual(match2)
  });

  test('read team with nonexistant name', () => {

    let match_id = 1
    let match = teamDao.readTeam(match_id)
    expect(match).toBe(null)
    
  });

  test('read match by matchid', () => {
    let match_id = 1
    let created = teamDao.createMatch(match_id)
    let read = teamDao.readMatch(match_id)
    expect(created).toEqual(read)
    
  });

  test('update match by id', () => {
    let match_id = 1
    let created = teamDao.createMatch(match_id)
    let read = teamDao.readTeam(match_id)
    let updated = teamDao.updateTeam(match_id, 1, 2, 7, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0)
    let read2 = teamDao.readTeam(match_id)

    expect(read).not.toBe(updated)
    expect(read2.away_team_score).toEqual(1)
    expect(read2.home_team_score).toEqual(2)
    expect(read2.game_time).toEqual(7)
    expect(read2.h_team_blocks).toEqual(20)
    
  });

  test('get all matches', () =>{
    let match_id = 1
    let match = matchDao.readAllMatches()
    let len = match.length
    let m = matchDao.createMatch(match_id)
    let matches_after = matchDao.readAllMatches()
    expect(len+1).toBe(matches_after.length)
  
  }); 

  test('delete match by id', () => {
    let match_id = 1
    let created = matchDao.createMatch(match_id)
    
    let deleted = matchDao.deleteMatch(match_id)
    let read = teamDao.readMatch(match_id)
    expect(read).toBe(null)
    
  });
