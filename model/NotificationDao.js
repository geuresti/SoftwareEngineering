import Realm from "realm"; 

const notification_realm = new Realm({path: 'notifications3.realm',
schema:[
    {
    name: "Notification",
    properties: {
        id: "int",
        senderUsername: "string",
        recieverUsername: "string",
        content: "string",
    },
    primaryKey: "id",

    },
],
schemaVersion: 2
});

export default class Notification {

    /*
            ERROR CHECKING:
        check that input isn't null / invalid * (or do this in NotifManager?)
        check that sender != receiver
        check that a user isn't receiving multiple invites from the same team
        / prevent notification sending of cloned requests
        check that sender / receiver EXIST
    */
    createNotification(sender, receiver, content) {
        const db = notification_realm.objects("Notification");
        let next_ID;

            // is there a way to shrink this block
        if (db.length > 0) {
            next_ID = db[db.length-1].id + 1
        } else {
            next_ID = 0
        }

        notification_realm.write(() => {
           notification_realm.create("Notification", {id: next_ID, senderUsername: sender, recieverUsername: receiver, content: content});
        })

        let notif = notification_realm.objectForPrimaryKey("Notification", next_ID);
        console.log("CREATED NOTIF:", notif);
    }

    //
    getNotificationsOfUser(username){
        //const db = realm.objects("Notifications").filtered("recieverUsername = $0", player.email);

       // let player = user_realm.objectForPrimaryKey("User", email);
       // return player
    }

    getAllNotifications(){
        const notifications = notification_realm.objects("Notification");
        return notifications
    }

    updateNotification() {

    }

    deleteNotification(id) {
        notification_realm.write(() => {
            let notifToDelete = notification_realm.objectForPrimaryKey("Notification", id);
            if (notifToDelete) {
                console.log("ATTEMPTING TO DELETE:", notifToDelete);
                notification_realm.delete(notifToDelete)
                console.log("SUCCESSFULLY DELETED");
                return true
            } else {
                console.log("NOTIFICATION UNSUCCESSFULLY DELETED");
                return false
            }
        })
    }
}
