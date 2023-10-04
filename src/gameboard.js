import Ship from './ship.js'

class Gameboard{
    constructor(){
        this.grid = Array.from({ length: 10 }, () => Array(10).fill(' '));   
        this.placedShipsArray = []
    }

    checkPositionAvailability(ship, x, y, direction){
        if (direction === 'horizontal'){
            for (let i = y; i<y + ship.length; i++){
                if(this.grid[x][i] !== ' '){
                    return false
                }
            }
        }

        if (direction === 'vertical'){
            for(let i = x; i<x + ship.length; i++){
                if(this.grid[i][y] !== ' '){
                    return false
                }
            }
        }
        return true
    }

    receiveAttack(x,y){
        if(this.grid[x][y].Ship){
            Ship.hit()
            this.grid[x][y].hitStatus = true
        } else {
            this.grid[x][y] = 'miss'
        }
    }

    reservedSpaceAroundShip(x, y, direction, shipLength) {
        const markAsReserved = (row, col) => {
            if (row >= 0 && row < 10 && col >= 0 && col < 10 && this.grid[row][col] === ' ') {
                this.grid[row][col] = 'reserved';
            }
        };
    
        if (direction === 'horizontal') {
            for (let i = y; i < y + shipLength; i++) {
                markAsReserved(x - 1, i); // Above
                markAsReserved(x + 1, i); // Below
                markAsReserved(x, i - 1); // Left
                markAsReserved(x, i + 1); // Right
    
                // Diagonals
                markAsReserved(x - 1, i - 1);
                markAsReserved(x - 1, i + 1);
                markAsReserved(x + 1, i - 1);
                markAsReserved(x + 1, i + 1);
            }
        } else if (direction === 'vertical') {
            for (let i = x; i < x + shipLength; i++) {
                markAsReserved(i, y - 1); // Left
                markAsReserved(i, y + 1); // Right
                markAsReserved(i - 1, y); // Above
                markAsReserved(i + 1, y); // Below
    
                // Diagonals
                markAsReserved(i - 1, y - 1);
                markAsReserved(i - 1, y + 1);
                markAsReserved(i + 1, y - 1);
                markAsReserved(i + 1, y + 1);
            }
        }
    }
    


    placeShip(ship,x,y, direction){
        if(this.checkPositionAvailability(ship, x, y, direction)){
            let positionIndex = 0
            if (direction === 'horizontal'){
                for(let i = y; i<y + ship.length; i++){
                    this.grid[x][i] = {ship, hitStatus:false, positionIndex}
                    positionIndex++
                }
            }
    
            if (direction === 'vertical'){
                for(let i = x; i<x + ship.length; i++){
                    this.grid[i][y] = {ship, hitStatus:false, positionIndex}
                    positionIndex++
                }
            }
            this.reservedSpaceAroundShip(x, y, direction, ship.length);
            this.placedShipsArray.push(ship)
        }
        return false
    }

    checkIfAllSunk(){
        for (let ship of this.placedShipsArray) {
            if (!ship.isSunk()) {
                return false;
            }
        }
        return true;
    }
}

export default Gameboard