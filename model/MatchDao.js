import Realm from "realm";

const match_realm = new Realm({path: 'matches.realm',
schema:[
    {
    name: "Match",
    properties: {
        match_id: "string",
        allteams: "string[]",
        away_team: "string", 
        home_team: "string", 
        away_team_score: "float",
        home_team_score: "float",
        game_time: "string",
        h_team_blocks: "float",
        h_team_steals: "float",
        h_team_assists: "float",
        h_team_frees: "float",
        h_team_shot_percent: "float",
        a_team_blocks: "float",
        a_team_steals: "float",
        a_team_assists: "float",
        a_team_frees: "float",
        a_team_shot_percent: "float",
         

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
                match_id: "",
                allteams: [""],
                away_team: "", 
                home_team: "", 
                away_team_score: 0,
                home_team_score: 0,
                game_time: "",
                h_team_blocks: 0,
                h_team_steals: 0,
                h_team_assists: 0,
                h_team_frees: 0,
                h_team_shot_percent: 0,
                a_team_blocks: 0,
                a_team_steals: 0,
                a_team_assists: 0,
                a_team_frees:0,
                a_team_shot_percent: 0,

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

    updateMatch(matchInput, away_team_score, home_team_score, game_time, h_team_blocks, h_team_steals, h_team_assists, h_team_frees, h_team_shot_percent, a_team_blocks, a_team_steals, a_team_assists, a_team_frees, a_team_shot_percent){
        match_realm.write(() => {
            let updated = match_realm.objectForPrimaryKey("Match", matchInput)
                updated.match_id = matchInput
            
            if (away_team_score){
                updated.away_team_score = away_team_score;
            }
            if (home_team_score){
                updated.home_team_score = home_team_score;
            }

            if (game_time) {
                updated.game_time = game_time;
            }

            if (h_team_blocks) {
                updated.h_team_blocks = h_team_blocks;
            }
            if (h_team_steals) {
                updated.h_team_steals = h_team_steals;
            }
            if (h_team_assists) {
                updated.h_team_assists = h_team_assists;
            }
            if (h_team_frees) {
                updated.h_team_frees = h_team_frees;
            }
            if (h_team_shot_percent) {
                updated.h_team_shot_percent = h_team_shot_percent;
            }
            if (a_team_blocks) {
                updated.a_team_blocks = a_team_blocks;
            }
            if (a_team_steals) {
                updated.a_team_steals = a_team_steals;
            }
            if (a_team_assists) {
                updated.a_team_assists = a_team_assists;
            }
            if (a_team_frees) {
                updated.a_team_frees = a_team_frees;
            }
            if (a_team_shot_percent) {
                updated.a_team_shot = a_team_shot_percent;
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

