import Realm from "realm";

const player_realm = new Realm({path: 'player.realm',
schema:[
    {
    name: "Player",
    properties: {
        email: "string",
        first_name: "string",
        last_name: "string",
        team_id: "string",
        height: "float",
        weight: "float",
        position: "string",
        experience: "string",
        isManager: "bool",
        avgPoints: "float",
        avgBlocks: "float",
        avgSteals: "float",
        assists: "float",
        freethrowPercent: "float",
        shotPercent: "float"

    },
    primaryKey: "email",

    },
],

});

var loggedInPlayer = ""

export default class Player{

    setCurrentPlayer(useremail){
        loggedInPlayer = useremail
    }

    getCurrentPlayer(){
        return player_realm.objectForPrimaryKey("Player", loggedInPlayer); 
    }
    
    createPlayer(useremail){
       player_realm.write(() => {
        player_realm.create("Player", {email: useremail, first_name: "",
            last_name: "",
            team_id: "",
            height: 0,
            weight: 0,
            position: "",
            experience: "",
            isManager: false,
            avgPoints: 0,
            avgBlocks: 0,
            avgSteals: 0,
            assists: 0,
            freethrowPercent: 0,
            shotPercent: 0
            })
        })
        let player = player_realm.objectForPrimaryKey("Player", useremail);
        return player 
    }

    readPlayer(useremail){
        let player = player_realm.objectForPrimaryKey("Player", useremail);
        return player
    }
      /* update start */
    updatePlayer(useremail, first_name="", last_name ="". team_id="", height=0, weight=0, position="", experience="", isManager ="", avgPoints =0, avgBlocks=0, avgSteals =0,assists=0, freethrowPercent=0,shotPercent=0){
        realm.write(() => {  
            let player = player_realm.objectForPrimaryKey("Player", useremail);
            return player
        
    
    })};
  
    deletePlayer(useremail){
        realm.write(() => {
            let player = player_realm.objectForPrimaryKey("Player", useremail);
            player_realm.delete(player)
            return player 
        
    })};
}

