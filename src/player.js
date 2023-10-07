import Gameboard from "./gameboard"
import Ship from "./ship"
import Game from "./game"
class Player{
    constructor(){
        this.board = new Gameboard()
        this.turn = false

        this.unguessedCells = [];
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                this.unguessedCells.push([x, y]);
            }
        }
    }
    

    swapTurn(opponent) {
        this.turn =! this.turn;
        opponent.turn =! opponent.turn;
    }

    placeAttack(opponent,x,y, game){
        opponent.board.receiveAttack(x,y)
        this.swapTurn(opponent);
        game.checkGameOver();
    }

    placeRandomAttack(opponent,game) {
        // If all cells have been guessed, do nothing
        if (this.unguessedCells.length === 0) return;

        // Randomly pick an index from the unguessedCells array
        const randomIndex = Math.floor(Math.random() * this.unguessedCells.length);

        // Extract the coordinates from the randomly selected cell
        const [x, y] = this.unguessedCells[randomIndex];

        // Remove the cell from the unguessedCells list
        this.unguessedCells.splice(randomIndex, 1);

        // Proceed with the attack
        opponent.board.receiveAttack(x, y);
        this.swapTurn(opponent);
        game.checkGameOver();
        return [x, y];
    }

    placeShipOnBoard(targetCell, shipSize, player1) {
        const x = parseInt(targetCell.classList[0].split('-')[3]); // Extracts x from `human-player-x-X`
        const y = parseInt(targetCell.classList[1].split('-')[4]); // Extracts y from `human-player-y-Y`
    
        let ship = new Ship(shipSize);
        if (player1.board.placeShip(ship, x, y, 'horizontal')) {
            this.renderYourBoard(player1); // To visualize the newly placed ship
        } else {
            // Handle placement failure (maybe due to collision or invalid position)
            console.log('Failed to place ship');
        }
    }
    
    
    createRandomFleet() {
        for (let i = 2; i <= 6; i++) {
            let shipPlaced = false; 
    
            while (!shipPlaced) { 
                let x = Math.floor(Math.random() * 10);
                let y = Math.floor(Math.random() * 10);
                let dir = Math.round(Math.random());
    
                let ship = new Ship(i);
                let direction = dir === 0 ? 'horizontal' : 'vertical'; 
    
                if (this.board.checkPositionAvailability(ship, x, y, direction)) {
                    this.board.placeShip(ship, x, y, direction);
                    shipPlaced = true; 
                }
            }
        }
    }
}

export default Player