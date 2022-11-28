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


export default class Season {
    
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

