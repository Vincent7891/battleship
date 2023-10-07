import Player from './player.js';
import BattleshipUI from './dom.js';
import Game from './game.js'

// Create two players and the UI
let player1 = new Player();
let player2 = new Player();
let ui = new BattleshipUI();

// Start the game with both players and the UI
let game = new Game(player1, player2, ui);
game.startGame();
