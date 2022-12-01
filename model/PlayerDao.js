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

    setManager(email, bool){
        player_realm.write(() => {  
                let playerUpdated = player_realm.objectForPrimaryKey("Player", email);
                playerUpdated.isManager = bool
            })

        return player_realm.objectForPrimaryKey("Player", email);
    }

    updatePlayerTeam(email, teamname){
        player_realm.write(() => {  
            let playerUpdated = player_realm.objectForPrimaryKey("Player", email);
            playerUpdated.team_id = teamname
        })

        return player_realm.objectForPrimaryKey("Player", email);
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
     // calling this function overwrites a player's email, which prevents the curr.email value from working
   // updatePlayer(email, f_new="", l_new="", id_new="", h_new=0, w_new=0, p_new="", e_new="", m_new ="", points_new =0, blocks_new=0, steals_new =0,a_new=0, f_throw_per=0,s_new_percent=0){
   // updatePlayer(email=this.email, f_new=this.first_name, l_new="", id_new="", h_new=0, w_new=0, p_new="", e_new="", m_new ="", points_new =0, blocks_new=0, steals_new =0,a_new=0, f_throw_per=0,s_new_percent=0){
    updatePlayer(email, f_new, l_new, id_new, h_new, w_new, p_new, e_new, m_new, points_new, blocks_new, steals_new, a_new, f_throw_per, s_new_percent) { 

        player_realm.write(() => {  
            let playerUpdated = player_realm.objectForPrimaryKey("Player", loggedInPlayer);
        
            if (email) {
                console.log("EMAIL UPDATED");
                playerUpdated.email = email;
            } // EMAIL IS PRIMARY KEY AND DOESNT ACCEPT BEING UPDATED
            if (f_new) {
                // console.log("F NAME UPDATED");
                playerUpdated.first_name = f_new;
            }
            if (l_new) {
               //  console.log("L NAME UPDATED");
                playerUpdated.last_name = l_new;
            }
            if (id_new) {
                //console.log("TEAM ID UPDATED");
                playerUpdated.team_id = id_new;
            }
            if (h_new) {
                //console.log("HEIGHT UPDATED");
                playerUpdated.height = h_new;
            }
            if (w_new) {
                //console.log("WEIGHT UPDATED");
                playerUpdated.weight = w_new;
            }
            if (p_new) {
                //console.log("POSITION UPDATED");
                playerUpdated.position = p_new;
            }
            if (e_new) {
                //console.log("EXPERIENCE UPDATED");
                playerUpdated.experience = e_new ;
            }
            if (m_new) {
                //console.log("IS MANAGER UPDATED");
                playerUpdated.isManager = m_new;
            }
            if (points_new) {
                //console.log("AVG POINTS UPDATED");
                playerUpdated.avgPoints = points_new;
            }
            if (blocks_new) {
                //console.log("BLOCKS UPDATED");
                playerUpdated.avgBlocks = blocks_new;
            }
            if (steals_new) {
                //console.log("AVG STEALS UPDATED");
                playerUpdated.avgSteals = steals_new;
            }
            if (a_new) {
                //console.log("ASSISTS UPDATED");
                playerUpdated.assists = a_new;
            }
            if (f_throw_per) {
                //console.log("FREE THROW P UPDATED");
                playerUpdated.freethrowPercent = f_throw_per;
            }
            if (s_new_percent) {
                //console.log("SHOT PERCENT UPDATED");
                playerUpdated.shotPercent = s_new_percent;
            }
            //console.log("UPDATED PLAYER:", playerUpdated);
    
        });
        
        return this.readPlayer(loggedInPlayer)
    }
  
    deletePlayer(useremail){
        player_realm.write(() => {
            let deletedPlayer = player_realm.objectForPrimaryKey("Player", useremail);
            player_realm.delete(deletedPlayer)
            // return player 
        
    })
    //return this.readPlayer(playerInput)
    }
    
    // need to merge with hannah
    readAllPlayers(){
        const players = player_realm.objects("Player");
        return players
        
    }

}
