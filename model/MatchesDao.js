mport Realm from "realm";

const match_realm = new Realm({path: 'matches.realm',
schema:[
    {
    name: "Match",
    properties: {
        match_id: "float",
        allteams: "string[]",
        away_team: "string", 
        home_team: "string", 
        away_team_score: "float",
        home_team_score: "float",
        game_time: "string",
        home_team_player_stats: "string",
        away_team_player_stats: "string",
        home_team_stats: "string",
        away_team_stats: "string"  

    },
    primaryKey: "match_id" 

    },
], 
schemaVersion:4
}); 

var matchView = ""

export default class Matches{
    
    setMatchToView(match_id){
        matchView = match_id
    }

    getMatchToView(){
        return match_realm.objectForPrimaryKey("Match", matchView)
    }

    
    createMatch(matchInput) {
        match_realm.write(() => {
            let match = match_realm.create("Match", {
                match_id: 0,
                allteams: [""],
                away_team: "", 
                home_team: "", 
                away_team_score: 0,
                home_team_score: 0,
                game_time: "",
                home_team_player_stats: "",
                away_team_player_stats: "",
                home_team_stats: "",
                away_team_stats: ""  

            });
            
    })
    let match =  match_realm.objectForPrimaryKey("Match", matchInput);
    return match 

    }

    readMatch(matchInput){
        let match = match_realm.objectForPrimaryKey("Match", matchInput);
        return match

    }

    readAllMatches(){
        const matches = matches_realm.objects("Match");
        return matches
    }

    updateMatch(matchInput,allteams, away_team, home_team, away_team_score, home_team_score, game_time, home_team_player_stats, away_team_player_stats, home_team_player_stats, away_team_player_stats){
        match_realm.write(() => {
            let updated = match_realm.objectForPrimaryKey("Match", matchInput)
                updated.match_id = matchInput
            if (allteams){
                updated.allteams = allteams;
            }
            if (away_team){
                updated.away_team = away_team;
            }
            if (home_team){
                updated.home_team = home_team;
            }
            if (away_team_score){
                updated.away_team_score = away_team_score;
            }
            if (home_team_score){
                updated.home_team_score = home_team_score;
            }
            if (game_time) {
                updated.game_time = game_time;
            }

            if (home_team_player_stats) {
                updated.home_team_player_stats = home_team_player_stats;
            }
            if (away_team_player_stats) {
                updated.away_team_player_stats = away_team_player_stats;
            }
        })
       
        return this.readMatch(match_id)
    }

    deleteMatch(matchInput) {
        match_realm.write(() => {
            let deletedMatch = match_realm.objectForPrimaryKey("Match", matchInput);
            if (deletedMatch) {match_realm.delete(deletedMatch)}
        })
        return this.readMatch(matchInput);
    }

    
}

