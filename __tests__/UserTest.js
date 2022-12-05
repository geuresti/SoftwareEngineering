import UserDao from "../model/UserDao.js"
import {expect, jest, test} from '@jest/globals'


let userDao = null

beforeEach(function(){
    userDao = new UserDao()
    userDao.deleteUser("test_user@gmail.com")
    userDao.deleteUser("admin")

});


test('create user', () => {

    let email = "test_user@gmail.com"
    let password = "test_password"
    let user = userDao.createUser(email, password)
    expect(user.username).toEqual(email)
    expect(user.pass).toEqual(password)

    let user2 = userDao.readUser(email)

    expect(user).toEqual(user2)
  });

test('read user with nonexistant email', () => {

    let email = "notValid@email.com"
    let user = userDao.readUser(email)
    expect(user).toBe(null)
    
  });

test('read user by email', () => {
    let email = "test_user@gmail.com"
    let password = "test_password"
    
    let created = userDao.createUser(email, password)
    let read = userDao.readUser(email)
    expect(created).toEqual(read)
    
  });

  test('update user by email', () => {
    let email = "test_user@gmail.com"
    let password = "test_password"
    
    let created = userDao.createUser(email, password)
    let read = userDao.readUser(email)

    let updatedPassword = "updated_password"
    let updated = userDao.updateUser(email, updatedPassword)
    let read2 = userDao.readUser(email)

    expect(read).not.toBe(read2)
    expect(read2.pass).toBe(updatedPassword)
    
  });

  test('delete user by email', () => {
    let email = "test_user@gmail.com"
    let password = "test_password"
    let created = userDao.createUser(email, password)
    

    let deleted = userDao.deleteUser(email)
    let read = userDao.readUser(email)
    expect(read).toBe(null)
    
  });

  test('user auth - invalid user', () => {

    let email = "test_user@gmail.com"
    let password = "test_password"
    let notPassword = "notPassword"
    let created = userDao.createUser(email, password)

    let auth = userDao.authenticateUser(email, notPassword)
    expect(auth).toBeFalsy()

    
  });

  test('user auth - valid user', () => {

    let email = "test_user@gmail.com"
    let password = "test_password"
    let created = userDao.createUser(email, password)

    let auth = userDao.authenticateUser(email, password)
    expect(auth).toBeTruthy()
    
  });

  test('admin', () => {
    let email = "admin"
    let password = "adminpass"
    let created = userDao.createUser(email, password)

    let auth = userDao.authenticateUser(email, password)
    expect(auth).toBeTruthy()
  })

