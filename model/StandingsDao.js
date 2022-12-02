import Realm from "realm";
const standings_realm = new Realm({path: 'standings.realm',
schema:[
    {
    name: "Standings",
    properties: {
        standing_id: "int",
        teamRecords: "{}",

        
    },
    primaryKey: "standing_id" 

    },
], 
schemaVersion:1
}); 

var standingView = 0

export default class Standings {

    
    setStandingToView(standing_id){
        standingView = standing_id
    }

    getStandingToView(){
        return standings_realm.objectForPrimaryKey("Standings", standingView)
    }

    create() {
        
        const db = standings_realm.objects("Standings");
        let next_ID;

        if (db.length > 0) {
            next_ID = db[db.length-1].standing_id + 1
        } else {
            next_ID = 0
        }
        standings_realm.write(() => {
            standings_realm.create("Standings", {
                standing_id: next_ID,
            });   
        })
        return this.readStandings(next_ID)
    }
    
    readStandings(_id){
        let standings = standings_realm.objectForPrimaryKey("Standings", _id);
        return standings
    }

    updateStandings(_id, teamname, record){
        standings_realm.write(() => {
            let updated = standings_realm.objectForPrimaryKey("Standings", _id)
            let recs = updated.teamRecords
            if (teamname && record){
                recs[teamname] = record
                console.log(recs)
            }
        })
        return this.readStandings(_id)
    }
    
    getStandingsDisplay(_id){
        let standings = this.readStandings(_id)
        if(standings === null){
            this.create()
            standings = this.readStandings(_id)
        }
        standings_list = []
        let records = standings.teamRecords
        let wins, ties, loses, points = 0
        let row = []
        for (key in records){
            let l = records[key].split("-")
            wins = l[0]
            ties = l[1]
            loses = l[2]
            points = 3 * parseInt(wins) + parseInt(ties)
            row = [key, wins, ties, loses, points]
            console.log(l)
            standings_list.push(row)
        }
        //records = records.sort(function(a,b){return b[4].localeCompare(a[4])}); 
        return standings_list
    }
       
}