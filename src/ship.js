

class Ship{
    constructor(length){
        this.hits = 0
        this.length = length
        this.sunk = false
    }

    hit(){
        this.hits += 1
    }

    isSunk(){
        if (this.hits === this.length){
            return true
        }
    }   
}

export default Ship