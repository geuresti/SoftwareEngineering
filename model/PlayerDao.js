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


    // need to merge with hannah
    readAllPlayers(){
        const players = player_realm.objects("Player");
        return players
        
    }

    updatePlayer(userEmail, f_new, l_new , id_new, h_new, w_new, p_new, e_new, m_new, points_new, blocks_new, steals_new,a_new, f_throw_per,s_new_percent){
        player_realm.write(() => {
            let updated = player_realm.objectForPrimaryKey("Player", userEmail);
            updated.email = userEmail;
            updated.first_name = f_new;
            updated.last_name = l_new;
            updated.team_id = id_new;
            updated.height = h_new;
            updated.weight = w_new;
            updated.position = p_new
            updated.experience = e_new
            updated.isManager = m_new
            updated.avgPoints = points_new
            updated.avgBlocks = blocks_new
            updated.avgSteals = steals_new
            updated.avgAssists = a_new;
            updated.freethrowPercent = f_throw_per;
            updated.shotPercent = s_new_percent;
        })
        return this.readPlayer(userEmail)
    }

    deletePlayer(userEmail){
        player_realm.write(() => {
            let deletedPlayer = player_realm.objectForPrimaryKey("Player", useremail);
            if(deletedUser) {player_realm.delete(deletedPlayer)}
        })
        return this.readPlayer(userEmail);
    }

    setManager(username, isManager){
        player_realm.write(() => {
            let updated = player_realm.objectForPrimaryKey("Player", username);
            updated.isManager = isManager
        })
        return this.readPlayer(username)
    }

    updateTeam(username, teamname){
        player_realm.write(() => {
            let updated = player_realm.objectForPrimaryKey("Player", username);
            updated.team_id = teamname
        })
        return this.readPlayer(username)
    }

}

