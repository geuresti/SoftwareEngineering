import Realm from "realm";

const team_realm = new Realm({path: 'teams.realm',
schema:[
    {
    name: "Team",
    properties: {
        teamName: "string",
        teamManager: "string",
        players: "string[]",
        record: "string",
        avgPoints: "float",
        avgBlocks: "float",
        avgSteals: "float",
        avgAssists: "float",
        freethrowPercent: "float",
        shotPercent: "float"

    },
    primaryKey: "teamName",

    },
],
schemaVersion:4
});

export default class Team{

    createTeam(teamInput){
        team_realm.write(() => {
            let team = team_realm.create("Team", {
                teamName: teamInput,
                teamManager: "",
                players: [""],
                record: "0-0-0",
                avgPoints: 0,
                avgBlocks: 0,
                avgSteals: 0,
                avgAssists: 0,
                freethrowPercent: 0,
                shotPercent: 0
        
            });
          })
        let team = team_realm.objectForPrimaryKey("Team", teamInput);
        return team 
    }

    readTeam(teamInput){
        let team = team_realm.objectForPrimaryKey("Team", teamInput);
        return team
    }

    readAllTeams(){
        const teams = team_realm.objects("Team");
        return teams
    }

    updateUser(teamInput, teamManager="", players=[""], record="0-0-0", avgPoints=0, avgBlocks=0, avgSteals=0, avgAssists=0, freethrowPercent=0, shotPercent=0){
        user_realm.write(() => {
            let updated = user_realm.objectForPrimaryKey("User", teamInput);
            updated.teamManager = teamManager;
            updated.players = players;
            updated.record = record;
            updated.avgPoints = avgPoints;
            updated.avgBlocks = avgBlocks;
            updated.avgSteals = avgSteals;
            updated.avgAssists = avgAssists;
            updated.freethrowPercent = freethrowPercent;
            updated.shotPercent = shotPercent;
        })
        return this.readTeam(teamInput)
    }

    deleteUser(teamInput){
        team_realm.write(() => {
            let deletedTeam = team_realm.objectForPrimaryKey("Team", teamInput);
            if(deletedTeam) {team_realm.delete(deletedTeam)}
        })
        return this.readTeam(teamInput);
    }
}
