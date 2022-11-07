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



export default class Player{
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
        return 
    }

    readPlayer(email){
        const player = player_realm.objectForPrimaryKey("Player", email);
        return player
    }
}

