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
var viewProfile = ""

export default class Player{

    setCurrentPlayer(useremail){
        loggedInPlayer = useremail
    }

    setProfileToView(useremail){
        viewProfile = useremail
    }

    getCurrentPlayer(){
        return player_realm.objectForPrimaryKey("Player", loggedInPlayer); 
    }

    getProfileToView(){
        return player_realm.objectForPrimaryKey("Player", viewProfile)
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
    updatePlayer(playerInput, f_new="", l_new, id_new="", h_new=0, w_new=0, p_new="", e_new="", m_new ="", points_new =0, blocks_new=0, steals_new =0,a_new=0, f_throw_per=0,s_new_percent=0){
        player_realm.write(() => {  
            let playerUpdated = player_realm.objectForPrimaryKey("Player", playerInput);
            playerUpdated.first_name = f_new;
            playerUpdated.last_name = l_new;
            playerUpdated.team_id = id_new;
            playerUpdated.height = h_new;
            playerUpdated.weight = w_new;
            playerUpdated.position = p_new;
            playerUpdated.experience = e_new ;
            playerUpdated.isManager = m_new;
            playerUpdated.avgPoints = points_new;
            playerUpdated.avgBlocks = blocks_new;
            playerUpdated.avgSteals = steals_new;
            playerUpdated.assists = a_new;
            playerUpdated.freethrowPercent = f_throw_per;
            playerUpdated.shotPercent = s_new_percent;
    
        });
        return this.readPlayer(playerInput)
    }
  
    deletePlayer(playerInput){
        player_realm.write(() => {
            let deletedPlayer = player_realm.objectForPrimaryKey("Player", playerInput);
            player_realm.delete(deletedPlayer)
            // return player 
        
    })
    return this.readPlayer(playerInput)
    }
    
    // need to merge with hannah
    readAllPlayers(){
        const players = player_realm.objects("Player");
        return players
        
    }

}

