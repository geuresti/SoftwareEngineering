import UserDao from "../model/UserDao.js"
import NotificationDao from "../model/NotificationDao.js"

import {expect, test} from '@jest/globals'


let userDao = null

beforeEach(function(){
    userDao = new UserDao()
    userDao.deleteUser("test_user@gmail.com")

    notifDao = new NotificationDao()
    notifDao.deleteAllNotifications()
});

test('create notification', () => {

    let senderUsername = "john_doe"
    let receiverUsername = "jane_doe"
    let content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    let new_notif = notifDao.createNotification(senderUsername, receiverUsername, content)
    expect(new_notif.senderUsername).toEqual(senderUsername)
    expect(new_notif.recieverUsername).toEqual(receiverUsername)
    expect(new_notif.content).toEqual(content)
  });

test('read notifications from a specific user', () => {
    let senderUsername = "john_doe"
    let receiverUsername = "jane_doe"
    let content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    notifDao.createNotification(senderUsername, receiverUsername, content)

    let janes_notifs = notifDao.getNotificationsOfUser(receiverUsername)

    expect(janes_notifs.length).toEqual(1)
    expect(janes_notifs[0].senderUsername).toEqual("john_doe")
    expect(janes_notifs[0].content).toEqual("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")
});

test('delete notification', () => {

    let senderUsername = "john_doe"
    let receiverUsername = "jane_doe"
    let content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    notifDao.createNotification(senderUsername, receiverUsername, content)
    let notif_present = notifDao.deleteNotification(0)
    expect(notif_present).toBe(false)
});

test('delete all notifications', () => {
    let senderUsername = "john_doe"
    let receiverUsername = "jane_doe"
    let content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    notifDao.deleteAllNotifications()
    const db = notifDao.getAllNotifications()
    expect(db.length).toBe(0)
})
