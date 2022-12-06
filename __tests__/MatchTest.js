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
    //matchDao.deleteMatch(0)
    matchDao.deleteAllMatches()

});

test('set match view', () => {
    let away_team = "away_test"
    let home_team = "home_test"

    playerDao.createPlayer("han")
    playerDao.createPlayer("chris")
    teamDao.createTeam(away_team, "han")
    teamDao.createTeam(home_team, "chris")

    let time = "7"
    
    matchDao.createMatch(away_team, home_team, time)
    let match_two = matchDao.createMatch(away_team, home_team, time)

    matchDao.setMatchToView(match_two.match_id)
    expect(matchDao.getMatchToView().match_id).toEqual(match_two.match_id);
});

test('get match to view', () => {
    let away_team = "away_test"
    let home_team = "home_test"

    playerDao.createPlayer("han")
    playerDao.createPlayer("chris")
    teamDao.createTeam(away_team, "han")
    teamDao.createTeam(home_team, "chris")

    let time = "7"
    
    let match = matchDao.createMatch(away_team, home_team, time)
    matchDao.setMatchToView(match.match_id)

    let match_to_view = matchDao.getMatchToView()
    expect(match_to_view).toEqual(match);
});

test('create match', () => {
    let away_team = "away_test"
    let home_team = "home_test"

    playerDao.createPlayer("han")
    playerDao.createPlayer("chris")
    teamDao.createTeam(away_team, "han")
    teamDao.createTeam(home_team, "chris")

    let time = "7"

    let match = matchDao.createMatch(away_team, home_team, time)
    let match2 = matchDao.readMatch(match.match_id)

    expect(match).toEqual(match2)
});

test('fail to create match', () => {
  let away_team = "away_test"
  let nonexistant_team = "home_test"

  playerDao.createPlayer("han")
  teamDao.createTeam(away_team, "han")

  let time = "7"

  let match = matchDao.createMatch(away_team, nonexistant_team, time)

  expect(match).toEqual(null)
});

test('read match with nonexistant id', () => {

    let match_id = 999
    let match = matchDao.readMatch(match_id)
    expect(match).toBe(null)
    
});

test('read match by matchid', () => {
    let away_team = "away_test"
    let home_team = "home_test"

    playerDao.createPlayer("han")
    playerDao.createPlayer("chris")
    teamDao.createTeam(away_team, "han")
    teamDao.createTeam(home_team, "chris")

    let time = "7"
    let created = matchDao.createMatch(away_team, home_team, time)
    let read = matchDao.readMatch(created.match_id)
    expect(created).toEqual(read)
});

test('update match by id', () => {
    let away_team = "away_test"
    let home_team = "home_test"
    let time = "7"

    playerDao.createPlayer("han")
    playerDao.createPlayer("chris")
    teamDao.createTeam(away_team, "han")
    teamDao.createTeam(home_team, "chris")

    let created = matchDao.createMatch(away_team, home_team, time)
    let updated = matchDao.updateMatch(created.match_id, 1, 2, "7", 20, 1, 1, 1, 1, 1, 1, 1, 1, 1)

    expect(updated.away_team_score).toEqual(1)
    expect(updated.home_team_score).toEqual(2)
    expect(updated.game_time).toEqual("7")
    expect(updated.h_team_blocks).toEqual(20)
});

test('update away_team_score for match', () => {
    let away_team = "away_test"
    let home_team = "home_test"
    let time = "7"

    playerDao.createPlayer("han")
    playerDao.createPlayer("chris")
    teamDao.createTeam(away_team, "han")
    teamDao.createTeam(home_team, "chris")

    let created = matchDao.createMatch(away_team, home_team, time)
    let updated = matchDao.updateMatch(created.match_id, 1, null, null, null, null, null, null, null, null, null, null, null, null)

    expect(updated.away_team_score).toEqual(1)
    expect(updated.home_team_score).toEqual(0)
});

test('update home_team_score for match', () => {
    let away_team = "away_test"
    let home_team = "home_test"
    let time = "7"

    playerDao.createPlayer("han")
    playerDao.createPlayer("chris")
    teamDao.createTeam(away_team, "han")
    teamDao.createTeam(home_team, "chris")

    let created = matchDao.createMatch(away_team, home_team, time)
    let updated = matchDao.updateMatch(created.match_id, null, 1, null, null, null, null, null, null, null, null, null, null, null)

    expect(updated.home_team_score).toEqual(1)
    expect(updated.away_team_score).toEqual(0)
});

test('update game_time for match', () => {
    let away_team = "away_test"
    let home_team = "home_test"
    let initial_time = "7"
    let updated_time = "30"

    playerDao.createPlayer("han")
    playerDao.createPlayer("chris")
    teamDao.createTeam(away_team, "han")
    teamDao.createTeam(home_team, "chris")

    let created = matchDao.createMatch(away_team, home_team, initial_time)

    expect(created.game_time).toEqual(initial_time)

    let updated = matchDao.updateMatch(created.match_id, null, null, updated_time, null, null, null, null, null, null, null, null, null, null)

    expect(updated.game_time).toEqual(updated_time)
});

test('update h_team_blocks for match', () => {
    let away_team = "away_test"
    let home_team = "home_test"
    let time = "7"

    let updated_blocks = 10

    playerDao.createPlayer("han")
    playerDao.createPlayer("chris")
    teamDao.createTeam(away_team, "han")
    teamDao.createTeam(home_team, "chris")

    let created = matchDao.createMatch(away_team, home_team, time)

    expect(created.h_team_blocks).toEqual(0)

    let updated = matchDao.updateMatch(created.match_id, null, null, null, updated_blocks, null, null, null, null, null, null, null, null, null)

    expect(updated.h_team_blocks).toEqual(updated_blocks)
});

test('update h_team_steals for match', () => {
    let away_team = "away_test"
    let home_team = "home_test"
    let time = "7"

    let updated_steals = 10

    playerDao.createPlayer("han")
    playerDao.createPlayer("chris")
    teamDao.createTeam(away_team, "han")
    teamDao.createTeam(home_team, "chris")

    let created = matchDao.createMatch(away_team, home_team, time)

    expect(created.h_team_steals).toEqual(0)

    let updated = matchDao.updateMatch(created.match_id, null, null, null, null, updated_steals, null, null, null, null, null, null, null, null)

    expect(updated.h_team_steals).toEqual(updated_steals)
});

test('update h_team_assists for match', () => {
    let away_team = "away_test"
    let home_team = "home_test"
    let time = "7"

    let updated_assists = 10

    playerDao.createPlayer("han")
    playerDao.createPlayer("chris")
    teamDao.createTeam(away_team, "han")
    teamDao.createTeam(home_team, "chris")

    let created = matchDao.createMatch(away_team, home_team, time)

    expect(created.h_team_assists).toEqual(0)

    let updated = matchDao.updateMatch(created.match_id, null, null, null, null, null, updated_assists, null, null, null, null, null, null, null)

    expect(updated.h_team_assists).toEqual(updated_assists)
});

test('update h_team_frees for match', () => {
    let away_team = "away_test"
    let home_team = "home_test"
    let time = "7"

    let updated_frees = 10

    playerDao.createPlayer("han")
    playerDao.createPlayer("chris")
    teamDao.createTeam(away_team, "han")
    teamDao.createTeam(home_team, "chris")

    let created = matchDao.createMatch(away_team, home_team, time)

    expect(created.h_team_frees).toEqual(0)

    let updated = matchDao.updateMatch(created.match_id, null, null, null, null, null, null, updated_frees, null, null, null, null, null, null)

    expect(updated.h_team_frees).toEqual(updated_frees)
});

test('update h_team_shot_percent for match', () => {
    let away_team = "away_test"
    let home_team = "home_test"
    let time = "7"

    let updated_shot_percent = 10

    playerDao.createPlayer("han")
    playerDao.createPlayer("chris")
    teamDao.createTeam(away_team, "han")
    teamDao.createTeam(home_team, "chris")

    let created = matchDao.createMatch(away_team, home_team, time)

    expect(created.h_team_shot_percent).toEqual(0)

    let updated = matchDao.updateMatch(created.match_id, null, null, null, null, null, null, null, updated_shot_percent, null, null, null, null, null)

    expect(updated.h_team_shot_percent).toEqual(updated_shot_percent)
});

test('update a_team_blocks for match', () => {
    let away_team = "away_test"
    let home_team = "home_test"
    let time = "7"

    let updated_blocks = 10

    playerDao.createPlayer("han")
    playerDao.createPlayer("chris")
    teamDao.createTeam(away_team, "han")
    teamDao.createTeam(home_team, "chris")

    let created = matchDao.createMatch(away_team, home_team, time)

    expect(created.a_team_blocks).toEqual(0)

    let updated = matchDao.updateMatch(created.match_id, null, null, null, null, null, null, null, null, updated_blocks, null, null, null, null)

    expect(updated.a_team_blocks).toEqual(updated_blocks)
});

test('update a_team_steals for match', () => {
    let away_team = "away_test"
    let home_team = "home_test"
    let time = "7"

    let updated_steals = 10

    playerDao.createPlayer("han")
    playerDao.createPlayer("chris")
    teamDao.createTeam(away_team, "han")
    teamDao.createTeam(home_team, "chris")

    let created = matchDao.createMatch(away_team, home_team, time)

    expect(created.a_team_steals).toEqual(0)

    let updated = matchDao.updateMatch(created.match_id, null, null, null, null, null, null, null, null, null, updated_steals, null, null, null)

    expect(updated.a_team_steals).toEqual(updated_steals)
});

test('update a_team_assists for match', () => {
    let away_team = "away_test"
    let home_team = "home_test"
    let time = "7"

    let updated_assists = 10

    playerDao.createPlayer("han")
    playerDao.createPlayer("chris")
    teamDao.createTeam(away_team, "han")
    teamDao.createTeam(home_team, "chris")

    let created = matchDao.createMatch(away_team, home_team, time)

    expect(created.a_team_assists).toEqual(0)

    let updated = matchDao.updateMatch(created.match_id, null, null, null, null, null, null, null, null, null, null, updated_assists, null, null)

    expect(updated.a_team_assists).toEqual(updated_assists)
});

test('update a_team_frees for match', () => {
    let away_team = "away_test"
    let home_team = "home_test"
    let time = "7"

    let updated_frees = 10

    playerDao.createPlayer("han")
    playerDao.createPlayer("chris")
    teamDao.createTeam(away_team, "han")
    teamDao.createTeam(home_team, "chris")

    let created = matchDao.createMatch(away_team, home_team, time)

    expect(created.a_team_frees).toEqual(0)

    let updated = matchDao.updateMatch(created.match_id, null, null, null, null, null, null, null, null, null, null, null, updated_frees, null)

    expect(updated.a_team_frees).toEqual(updated_frees)
});

test('update a_team_shot_percent for match', () => {
    let away_team = "away_test"
    let home_team = "home_test"
    let time = "7"

    let updated_shot_percent = 10

    playerDao.createPlayer("han")
    playerDao.createPlayer("chris")
    teamDao.createTeam(away_team, "han")
    teamDao.createTeam(home_team, "chris")

    let created = matchDao.createMatch(away_team, home_team, time)

    expect(created.a_team_shot_percent).toEqual(0)

    let updated = matchDao.updateMatch(created.match_id, null, null, null, null, null, null, null, null, null, null, null, null, updated_shot_percent)

    expect(updated.a_team_shot_percent).toEqual(updated_shot_percent)
});

test('get all matches', () =>{
    let away_team = "away_test"
    let home_team = "home_test"
    let time = "7"

    playerDao.createPlayer("han")
    playerDao.createPlayer("chris")
    teamDao.createTeam(away_team, "han")
    teamDao.createTeam(home_team, "chris")

    let matches = matchDao.readAllMatches().length


    matchDao.createMatch(away_team, home_team, time)
    matchDao.createMatch(away_team, home_team, time)
    matchDao.createMatch(away_team, home_team, time)

    let matches_after = matchDao.readAllMatches().length

    expect(matches_after).toBe(matches+3)
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
    
    matchDao.createMatch(away_team, home_team, time)
    matchDao.deleteMatch(match_id)

    let read = matchDao.readMatch(match_id)
    expect(read).toBe(null)
});
