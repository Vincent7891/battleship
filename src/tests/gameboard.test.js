import Gameboard from '../gameboard.js';
import Ship from '../ship.js';

describe('Gameboard', () => {

  let gameboard;
  let ship;

  beforeEach(() => {
    gameboard = new Gameboard();
    ship = new Ship(3); // Assuming your Ship class takes a length as a parameter
  });

  test('initializes a 10x10 grid', () => {
    expect(gameboard.grid.length).toBe(10);
    gameboard.grid.forEach(row => {
      expect(row.length).toBe(10);
      expect(row.every(cell => cell === ' ')).toBe(true);
    });
  });

  test('checks position availability correctly', () => {
    expect(gameboard.checkPositionAvailability(ship, 5, 5, 'horizontal')).toBe(true);
    gameboard.placeShip(ship, 5, 5, 'horizontal');
    expect(gameboard.checkPositionAvailability(ship, 5, 5, 'horizontal')).toBe(false);
  });

  test('places a ship correctly in horizontal direction', () => {
    gameboard.placeShip(ship, 3, 3, 'horizontal');
    for (let i = 3; i < 6; i++) {
      expect(gameboard.grid[3][i].ship).toBe(ship);
    }
  });

  test('places a ship correctly in vertical direction', () => {
    gameboard.placeShip(ship, 3, 3, 'vertical');
    for (let i = 3; i < 6; i++) {
      expect(gameboard.grid[i][3].ship).toBe(ship);
    }
  });

  test('reserves space around ship correctly', () => {
    gameboard.placeShip(ship, 3, 3, 'horizontal');
    expect(gameboard.grid[2][2]).toBe('reserved');
    expect(gameboard.grid[2][3]).toBe('reserved');
    expect(gameboard.grid[2][5]).toBe('reserved');
    expect(gameboard.grid[4][2]).toBe('reserved');
    expect(gameboard.grid[4][3]).toBe('reserved');
    expect(gameboard.grid[4][5]).toBe('reserved');
  });

  test('should not allow placing ships on reserved spaces', () => {
    gameboard.placeShip(ship, 3, 3, 'horizontal');
    expect(gameboard.checkPositionAvailability(ship, 2, 3, 'horizontal')).toBe(false);
    expect(gameboard.checkPositionAvailability(ship, 4, 3, 'horizontal')).toBe(false);
    gameboard.placeShip(ship, 3, 5 ,'horizontal')
    expect(gameboard.grid[3][7]).toBe(' ')
  });

  test('should add ship to placedShipsArray', () => {
    gameboard.placeShip(ship, 3, 3, 'horizontal');
    expect(gameboard.placedShipsArray.includes(ship)).toBe(true);
  });

});

