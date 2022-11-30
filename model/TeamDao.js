import Realm from "realm";
import PlayerDao from "./PlayerDao.js"

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

var teamProfile = ""

export default class Team{


    setTeamToView(teamname){
        teamProfile = teamname
    }

    getTeamToView(){
        return team_realm.objectForPrimaryKey("Team", teamProfile)
    }

    createTeam(teamInput, manager){
        team_realm.write(() => {
            let team = team_realm.create("Team", {
                teamName: teamInput,
                teamManager: manager,
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

    updateTeam(teamInput, teamManager, players, record, avgPoints, avgBlocks, avgSteals, avgAssists, freethrowPercent, shotPercent){
        team_realm.write(() => {
            let updated = team_realm.objectForPrimaryKey("Team", teamInput);
                updated.teamName = teamInput
            if(teamManager){
                updated.teamManager = teamManager;
            }
            if(players){
                updated.players = players;
            }
            if(record){
                updated.record = record;
            }
            if(avgPoints){
                updated.avgPoints = avgPoints;
            }
            if(avgBlocks){
                updated.avgBlocks = avgBlocks;
            }
            if(avgSteals){
                updated.avgSteals = avgSteals;
            }
            if(avgAssists){
                updated.avgAssists = avgAssists;
            }
            if(freethrowPercent){
                updated.freethrowPercent = freethrowPercent;
            }
            if(shotPercent){
                updated.shotPercent = shotPercent;
            }
        })
        return this.readTeam(teamInput)
    }

    deleteTeam(teamInput){
        team_realm.write(() => {
            let deletedTeam = team_realm.objectForPrimaryKey("Team", teamInput);
            if(deletedTeam) {team_realm.delete(deletedTeam)}
        })
        return this.readTeam(teamInput);
    }

    updateManager(teamname, teamManager){
        team_realm.write(() => {
            let updated = team_realm.objectForPrimaryKey("Team", teamname);
            updated.teamManager = teamManager
        })
        return this.readTeam(teamname)
    }

    removePlayer(teamname, playername){

        team_realm.write(() => {
            let updated = team_realm.objectForPrimaryKey("Team", teamname);
            let playerlist = updated.players
            if(playerlist.indexOf(playername) >= 0){
                playerlist[playerlist.indexOf(playername)] = ""
                console.log("deleted")
            }
            updated.players = playerlist

        })
        return this.readTeam(teamname)
    }

    // playerUsername -> playerEmail
    addPlayer(teamname, playerEmail){

        let playerDao = new PlayerDao()
        let player = playerDao.readPlayer(playerEmail)

        if (player) {
            console.log("PLAYER EXISTS:", player);
        } else {
            console.log("PLAYER DON't EXIST");
        }

        team_realm.write(() => {
            let updated = team_realm.objectForPrimaryKey("Team", teamname)
            let playerList = updated.players
            playerList.push(playerEmail)
            updated.players = playerList
        })
        return this.readTeam(teamname)
    }

    getTeamByManager(manager){
        console.log(manager + "testing")
        let teamWManager = team_realm.objects("Team").filtered("teamManager = $0", manager);
        return teamWManager[0]
    }

}
