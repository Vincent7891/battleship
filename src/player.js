import Gameboard from "./gameboard"
import Ship from "./ship"

class Player{
    constructor(){
        this.board = new Gameboard()
        this.turn = false
    }

    swapTurn(opponent) {
        this.turn =! this.turn;
        opponent.turn =! opponent.turn;
    }

    placeAttack(opponent,x,y){
        opponent.board.receiveAttack(x,y)
        this.swapTurn(opponent);
    }

    placeRandomAttack(opponent){
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);

        if(opponent.board[x][y] === 'miss' || opponent.board.hitStatus === true){
            this.placeRandomAttack(opponent)
        } else { 
            opponent.board.receiveAttack(x,y)
        }
    }
    
    createRandomFleet(player) {
        for (let i = 2; i <= 5; i++) {
            let shipPlaced = false; 
    
            while (!shipPlaced) { 
                const x = Math.floor(Math.random() * 10);
                const y = Math.floor(Math.random() * 10);
                const dir = Math.round(Math.random());
    
                let ship = new Ship(i);
                let direction = dir === 0 ? 'horizontal' : 'vertical'; 
    
                if (player.board.checkPositionAvailability(ship, x, y, direction)) {
                    player.board.placeShip(ship, x, y, direction);
                    shipPlaced = true; 
                }
            }
        }
    }
}

export default Player