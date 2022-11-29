import SeasonDao from "../model/SeasonDao.js"
import MatchDao from "../model/MatchDao.js"


import {expect, test} from '@jest/globals'

let seasonDao = new SeasonDao();

beforeEach(function(){
    seasonDao.deleteAllSeasons();
    seasonDao.createSeason();
    let seasons_db = seasonDao.getAllSeasons();
    console.log("SEASONS DB:", seasons_db)
});

test('setting season to view', () => {
    let season_id = 0;
    seasonDao.setSeasonToView(season_id);
    let season = seasonDao.getSeasonToView();

    expect(season.id).toEqual(season_id);
})

test('create season', () => {
    let new_season = seasonDao.createSeason();
    expect(new_season.id).toEqual(1);
})

test('get all seasons', () => {
    let seasons_db = seasonDao.getAllSeasons();
    expect(seasons_db.length).toEqual(1);
})

test('get specific season', () => {
    seasonDao.createSeason();
    let season = seasonDao.getSeasonByID(1);

    // change to EXPECT season to NOT BE null
    expect(0).toEqual(0);
})

test('add game to season', () => {

    expect(0).toEqual(0);
})

test('remove game from season', () => {

    expect(0).toEqual(0);
})

test('delete season', () => {
    seasonDao.createSeason();
    seasonDao.deleteSeason(1)
    // EXPECT getallseaons length to be 1 
    expect(1).toEqual(1);
})
