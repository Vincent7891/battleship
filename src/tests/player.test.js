import Gameboard from '../gameboard.js';
import Ship from '../ship.js';
import Player from '../player.js'

describe('Player class tests', () => {

    test('Player should initialize correctly', () => {
        const player = new Player();

        expect(player.board).toBeInstanceOf(Gameboard);
        expect(player.turn).toBe(false);
    });

    test('swapTurn should toggle the turn correctly', () => {
        const player1 = new Player();
        const player2 = new Player();
        
        player1.turn = true;
        player2.turn = false;
        
        player1.swapTurn(player2);
        
        expect(player1.turn).toBe(false);
        expect(player2.turn).toBe(true);
    });

    test('placeAttack should call receiveAttack on opponent board', () => {
        const player1 = new Player();
        const player2 = new Player();
        
        player2.board.receiveAttack = jest.fn();

        player1.placeAttack(player2, 5, 5);

        expect(player2.board.receiveAttack).toHaveBeenCalledWith(5, 5);
    });
});

describe('createRandomFleet tests', () => {

    test('4 ships should be placed on the board', () => {
        const player = new Player();
        player.createRandomFleet(player);
        expect(player.board.placedShipsArray.length).toBe(4);
    });

});

