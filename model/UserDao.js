import Realm from "realm";

const user_realm = new Realm({path: 'logins.realm',
schema:[
    {
    name: "User",
    properties: {
        username: "string",
        pass: "string",
    },
    primaryKey: "username",

    },
],

});


export default class User{

    createUser(email, password){
        user_realm.write(() => {
            let user = user_realm.create("User", {username: email, pass: password});
          })
        let player = user_realm.objectForPrimaryKey("User", email);
        return player 
    }

    readUser(email){
        let player = user_realm.objectForPrimaryKey("User", email);
        return player
    }

    updateUser(email, newPassword){
        let player = user_realm.objectForPrimaryKey("User", email)
        player.pass = newPassword
        return player
    }

    deleteUser(email){
        let player = user_realm.objectForPrimaryKey("User", email)
        user_realm.delete(player)
        return player // returns null??
    }
}

