import Realm from "realm";
import StandingsDao from "./StandingsDao"
// matches will represent a list of match ids
const season_realm = new Realm({path: 'seasons.realm',
    schema: 
    [
        {
            name: "Season",
            properties: {
                id: "int",
                matches: "int[]", 
            },
            primaryKey: "id" 
        },
    ], 
}); 

var seasonViews = 0;
export default class Season {

    
    setSeasonToView(season_id){
        seasonViews = season_id
    }
    
    createSeason() {
        let standingsDao = new StandingsDao()
        const db = this.getAllSeasons()
        let next_ID;

        if (db.length > 0) {
            next_ID = db[db.length-1].id + 1
        } else {
            next_ID = 0
        }

        season_realm.write(() => {
            season_realm.create("Season", {id: next_ID, matches: []});
        })
        standingsDao.create()
        let new_season = season_realm.objectForPrimaryKey("Season", next_ID);
        //console.log("CREATED NEW SEASON:", new_season);
        return new_season
    }

    getAllSeasons() {
        let seasons = season_realm.objects("Season");
        return seasons
    }

    getSeasonByID(season_id){
        let season = season_realm.objectForPrimaryKey("Season", season_id);
        return season
    }

    
    getSeasonToView(){
        return season_realm.objectForPrimaryKey("Season", seasonViews)
    }

    addGame(season_id, game){
        let gameInt = parseInt(game);
        season_realm.write(() => {
            let updated = season_realm.objectForPrimaryKey("Season", season_id)
            let matchList = updated.matches
            matchList.push(gameInt)
            updated.matches = matchList
        })
        return this.getSeasonByID(season_id)
    }

    removeGame(season_id, game){
        let gameInt = parseInt(game);
        season_realm.write(() => {
            let updated = season_realm.objectForPrimaryKey("Season", season_id)
            let matchList = updated.matches
            let index = matchList.indexOf(gameInt)
            const result = matchList.filter(match => match != index );
            updated.matches = result
        })
        return this.getSeasonByID(season_id)
    }

    deleteSeason(season_id)
    {
        let standingsDao = new StandingsDao()
        season_realm.write(() => {
            let seasonToDelete = season_realm.objectForPrimaryKey("Season", season_id);
            if (seasonToDelete) {
                season_realm.delete(seasonToDelete)
                standingsDao.deleteStandings(season_id)
                return true
            } else {

            }
        })

        return this.getSeasonByID(season_id)
    }

    deleteAllSeasons() {
        let seasons = this.getAllSeasons()
        for (let i = 0; i < seasons.length; i++) {
            this.deleteSeason(seasons[i].id);
        }
        //console.log("delete all season loop ENDED")
    }
}
