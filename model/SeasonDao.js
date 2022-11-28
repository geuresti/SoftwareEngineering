import Realm from "realm";

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
        const db = season_realm.objects("Season");
        let next_ID;

        if (db.length > 0) {
            next_ID = db[db.length-1].id + 1
        } else {
            next_ID = 0
        }

        season_realm.write(() => {
            season_realm.create("Season", {id: next_ID, matches: []});
        })

        let new_season = season_realm.objectForPrimaryKey("Season", next_ID);
        console.log("CREATED NEW SEASON:", new_season);
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
            console.log(index)
            matchList.splice(index,1)
            updated.matches = matchList
        })
        return this.getSeasonByID(season_id)
    }

    deleteSeason(season_id)
    {
        season_realm.write(() => {
            let seasonToDelete = season_realm.objectForPrimaryKey("Season", season_id);
            if (seasonToDelete) {
                console.log("ATTEMPTING TO DELETE:", seasonToDelete);
                season_realm.delete(seasonToDelete)
                console.log("SUCCESSFULLY DELETED");
                return true
            } else {
                console.log("NOTIFICATION UNSUCCESSFULLY DELETED");
                //return false
            }
        })
        return false
    }
}

