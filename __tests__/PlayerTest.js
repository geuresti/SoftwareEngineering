import PlayerDao from "../model/PlayerDao.js"
import {expect, jest, test} from '@jest/globals'

let playerDao = null

beforeEach(function(){
    playerDao = new PlayerDao()
    playerDao.deletePlayer("test@gmail.com")
});


test('create player', () => {

    let email = "test@gmail.com"
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

    let email = "test@gmail.com"
    let player = playerDao.createPlayer(email)
    let read = playerDao.readPlayer(email)
    expect(player).toEqual(read)
    
    
  });

test('update player', () => {
  let email = "test@gmail.com"
  let player = playerDao.createPlayer(email)
  let updated = playerDao.updatePlayer(email, "Peter", "Griffin", "Losers", 6, 150, "PG", "Pro", false, 10, 12, 20, 50, 25)
  let read = playerDao.readPlayer(email)
  expect(read).toEqual(updated)
})

test('delete player', () => {
  let email = "test@gmail.com"
  let player = playerDao.createPlayer(email)
  let deleted = playerDao.deletePlayer(email)
  let read = playerDao.readPlayer(email)
  expect(read).toBe(null)
})

test('set current player', () => {
  let email = "test@gmail.com"
  let player = playerDao.createPlayer(email)
  playerDao.setCurrentPlayer(email)
  let player2 = playerDao.getCurrentPlayer()
  expect(player).toEqual(player2)
})

test('get all players', () =>{
  let email = "test@gmail.com"
  let players = playerDao.readAllPlayers()
  let len = players.length
  let player = playerDao.createPlayer(email)
  let players_after = playerDao.readAllPlayers()
  expect(len+1).toBe(players_after.length)

})
