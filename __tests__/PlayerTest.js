import PlayerDao from "../model/PlayerDao.js"
import {expect, jest, test} from '@jest/globals'

let playerDao = null

beforeEach(function(){
    playerDao = new PlayerDao()
    //const testPlayer = realm.objectForPrimaryKey("Player", "test@gmail.com");
    //realm.delete(testPlayer)
});


test('create player', () => {

    let email = "test5@gmail.com"
    let player = playerDao.createPlayer(email)
    expect(player.email).toBe(email)

    playerDao.setCurrentPlayer(email)
    let player2 = playerDao.getCurrentPlayer()

    expect(player).toEqual(player2)
  });

test('read player with nonexistant email', () => {

    let email = "notValid@email.com"
    let player = playerDao.readPlayer(email)
    expect(player).toBe(null)
    
  });

test('read player by email', () => {

    let email = "jest@email.com"
    let created = playerDao.createPlayer(email)
    let read = playerDao.readPlayer(email)
    expect(created).toEqual(read)
    
    
  });
