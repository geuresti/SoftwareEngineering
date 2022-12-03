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

    // activate branch "db.length > 0" by adding a second notification
    let another_notif = notifDao.createNotification(senderUsername, receiverUsername, content)
    expect(another_notif.senderUsername).toEqual(senderUsername)
    expect(another_notif.recieverUsername).toEqual(receiverUsername)
    expect(another_notif.content).toEqual(content)
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

test('filter notifications by user', () => {
    let senderOneUsername = "john_doe"
    let senderTwoUsername = "jaiden_doe"
    let receiverUsername = "jane_doe"
    let content_one = "Lorem ipsum dolor sit amet."
    let content_two = "Consectetur adipiscing elit."

    notifDao.createNotification(senderOneUsername, receiverUsername, content_one)
    notifDao.createNotification(senderTwoUsername, receiverUsername, content_two)

    let janes_notifs = notifDao.filterNotificationsByUser(senderTwoUsername, receiverUsername);

    expect(janes_notifs.length).toEqual(1)
    expect(janes_notifs[0].senderUsername).toEqual("jaiden_doe")
    expect(janes_notifs[0].content).toEqual("Consectetur adipiscing elit.")
});

test('delete notification', () => {

    let senderUsername = "john_doe"
    let receiverUsername = "jane_doe"
    let content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    notifDao.createNotification(senderUsername, receiverUsername, content)

    let notif_present = notifDao.deleteNotification(0)
    
    expect(notif_present).toBe(false)

    let fail_delete = notifDao.deleteNotification(5)
    expect(fail_delete).toBe(false)
});

test('delete all notifications', () => {
    let senderUsername = "john_doe"
    let receiverUsername = "jane_doe"
    let content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."

    notifDao.createNotification(senderUsername, receiverUsername, content)
    
    const db = notifDao.getAllNotifications()
    expect(db.length).toBe(0)
})
