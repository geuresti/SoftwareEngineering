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

    readAllUsers(){

    }

    updateUser(email, newPassword){
        user_realm.write(() => {
            let updated = user_realm.objectForPrimaryKey("User", email);
            updated.pass = newPassword;
        })
        return this.readUser(email)
    }

    deleteUser(email){
        user_realm.write(() => {
            let deletedUser = user_realm.objectForPrimaryKey("User", email);
            if(deletedUser) {user_realm.delete(deletedUser)}
        })
        return this.readUser(email);
    }
}

