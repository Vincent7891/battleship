class BattleshipUI{
    
    constructor(){
        this.shipSizes = [6, 5, 4, 3, 2];
    }

    getNextShipSize() {
        return this.shipSizes.shift();  
    }

    hitOrMissRender(opponent, x, y, cell) {
        if(opponent.board.grid[x][y].hitStatus === true ){
            cell.classList.add('hit')
        }
        if(opponent.board.grid[x][y] === "miss"){
            cell.classList.add('miss')
        }
    }

    renderGrid(size = 10, player1, player2, game) {
        const playerContainer = document.querySelector(".player-board")    
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                const cell = document.createElement('div');
                cell.classList.add(`human-player-x-${x}`, `human-player-y-${y}`);
                playerContainer.appendChild(cell);
            }
        }

        const opponentContainer = document.querySelector(".opponent-board")    
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                const cell = document.createElement('div');
    
                // Assign classes for x and y coordinates.
                cell.classList.add(`opponent-player-x-${x}`, `opponent-player-y-${y}`);
                // Attach an event listener.
                cell.addEventListener('click', () => {
                    if (!cell.classList.contains('miss') && !cell.classList.contains('hit')){
                        player1.placeAttack(player2,x,y,game)
                        this.hitOrMissRender(player2,x,y, cell)
                        let xy = player2.placeRandomAttack(player1,game)
                        let humanCell = document.querySelector(`.human-player-x-${xy[0]}.human-player-y-${xy[1]}`);
                        this.hitOrMissRender(player1,xy[0],xy[1],humanCell)
                    }
                    // player1.swapTurn(player2)
                });
                // Append the cell to the container.
                opponentContainer.appendChild(cell);
            }
        }
    }

    renderYourBoard(player1) {
        let board = player1.board.grid;
        for (let x = 0; x < board.length; x++) {
            for (let y = 0; y < board[x].length; y++) {
                let element = board[x][y];
                
                if (element.ship) {
                    let cell = document.querySelector(`.human-player-x-${x}.human-player-y-${y}`);
                    cell.style.border = "5px solid blue";
                }
            }
        }
    }

    renderDragAndDropArea(shipSize) {
        const parentContainer = document.querySelector('.placement-container');
    
        parentContainer.innerHTML = '';
    
        for (let i = 0; i < shipSize; i++) {
            const cell = document.createElement('div');
            cell.classList.add('drag-ship-cell');
            cell.setAttribute('draggable', true);
            parentContainer.appendChild(cell);
        }
    
        parentContainer.dataset.shipSize = shipSize;
    }

    initializeDragAndDrop() {
        document.querySelectorAll('.drag-ship-cell').forEach(ship => {
            ship.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.parentNode.dataset.shipSize);
            });
        });
    
        document.querySelector('.player-board').addEventListener('dragover', (e) => {
            e.preventDefault();
        });
    
        document.querySelector('.player-board').addEventListener('drop', (e) => {
            e.preventDefault();
            const shipSize = parseInt(e.dataTransfer.getData('text/plain'));
        
            this.placeShipOnBoard(e.target, shipSize, player1); // Assuming you have access to player1
        
            const nextShipSize = this.getNextShipSize();
            if (nextShipSize) {
                this.renderDragAndDropArea(nextShipSize);
            } else {
                // All ships have been placed
                // You can now start the game or provide other instructions
            }
        });
    }
    placeShipOnBoard(targetCell, shipSize, player1) {
        const x = parseInt(targetCell.classList[0].split('-')[3]); 
        const y = parseInt(targetCell.classList[1].split('-')[4]); 
        let ship = new Ship(shipSize);
        if (player1.board.placeShip(ship, x, y, 'horizontal')) {
            this.renderYourBoard(player1); 
        } else {
            console.log('Failed to place ship');
        }
    }
    
    
    

    



}

export default BattleshipUI