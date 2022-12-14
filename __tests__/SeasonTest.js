import StandingsDao from "../model/StandingsDao"
import SeasonDao from "../model/SeasonDao.js"
import MatchDao from "../model/MatchDao.js"
import TeamDao from "../model/TeamDao"
import PlayerDao from "../model/PlayerDao"


import {expect, test} from '@jest/globals'

let seasonDao = new SeasonDao();
let matchDao = new MatchDao();
let teamDao = new TeamDao();
let playerDao = new PlayerDao();
let standingsDao = new StandingsDao();

beforeEach(function(){
    playerDao.deletePlayer("jo")
    playerDao.deletePlayer("mo")
    teamDao.deleteTeam("away")
    teamDao.deleteTeam("home")
    matchDao.deleteMatch(0)
    seasonDao.deleteAllSeasons();
    standingsDao.deleteAllStandings()
    //seasonDao.createSeason();
});

test('setting season to view', () => {
    let new_season = seasonDao.createSeason();
    //let new_standing = standingsDao.create()
    let season_id = 0;
    let standing_id = 0;
    seasonDao.setSeasonToView(season_id);
    standingsDao.setStandingToView(standing_id)
    let season = seasonDao.getSeasonToView();
    let standing = standingsDao.getStandingToView()

    expect(season.id).toEqual(season_id);
    //expect(standing).toEqual(standing_id)
})

test('create season', () => {
    let new_season = seasonDao.createSeason();
    let standing = standingsDao.getStandingToView()
    expect(new_season.id).toEqual(0);
    //expect(standing.standing_id).toEqual(0);
})

test('get all seasons', () => {
    let new_season = seasonDao.createSeason();
    let seasons_db = seasonDao.getAllSeasons();
    expect(seasons_db.length).toEqual(1);
})

test('get specific season', () => {
    let season = seasonDao.createSeason();
    let season_read = seasonDao.getSeasonByID(0);

    // change to EXPECT season to NOT BE null
    expect(season_read).toEqual(season);
})

test('add game to season', () => {
    let away_team = "away"
    let home_team = "home"

    playerDao.createPlayer("jo")
    playerDao.createPlayer("mo")
    teamDao.createTeam(away_team, "jo")
    teamDao.createTeam(home_team, "mo")

    let time = "7"
    let match = matchDao.createMatch(away_team, home_team, time)
    seasonDao.createSeason()
    seasonDao.addGame(0, 0)
    expect(seasonDao.getSeasonByID(0).matches.length).toEqual(1);
})

test('remove game from season', () => {
    let away_team = "away"
    let home_team = "home"

    playerDao.createPlayer("jo")
    playerDao.createPlayer("mo")
    teamDao.createTeam(away_team, "jo")
    teamDao.createTeam(home_team, "mo")

    let time = "7"
    let match = matchDao.createMatch(away_team, home_team, time)
    seasonDao.createSeason()
    seasonDao.addGame(0, 0)
    seasonDao.removeGame(0,0)
    expect(seasonDao.getSeasonByID(0).matches.length).toEqual(0);
})

test('delete season', () => {
    let created = seasonDao.createSeason();
    let seasons = seasonDao.deleteSeason(0)
    // EXPECT getallseaons length to be 1 
    expect(seasonDao.getAllSeasons().length).toEqual(0);
    expect(seasons).toEqual(null)
})

test('update standings', () =>{
    let standings = standingsDao.create()
    let away_team = "away"

    playerDao.createPlayer("jo")
    teamDao.createTeam(away_team, "jo")
    let updated = standingsDao.updateStandings(0, away_team, "1-1-1")
    expect(updated.teamRecords[away_team]).toBe("1-1-1")

})

test('standings display', () => {
    let standings = standingsDao.create()
    let away_team = "away"

    playerDao.createPlayer("jo")
    teamDao.createTeam(away_team, "jo")
    let updated = standingsDao.updateStandings(0, away_team, "1-1-1")
    let display = standingsDao.getStandingsDisplay(0)
    expect(display[0]).toStrictEqual([away_team, "1","1","1",4])
})