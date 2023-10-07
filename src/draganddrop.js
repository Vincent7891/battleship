class DragAndDrop {
    constructor(playerBoardElement, ships) {
        this.playerBoardElement = playerBoardElement;  // The grid element where ships will be dropped
        this.ships = ships;  // NodeList or Array of ship element
        this.initDrag();
        this.initDrop();
    }

    initDrag() {
        this.ships.forEach(ship => {
            ship.setAttribute('draggable', 'true');
            ship.addEventListener('dragstart', e => {
                e.dataTransfer.setData('text/plain', ship.dataset.length);  // Assuming each ship element has a `data-length` attribute
            });
        });
    }

    initDrop() {
        this.playerBoardElement.querySelectorAll('div').forEach(cell => {
            cell.addEventListener('dragover', e => {
                e.preventDefault();  //Allows the drop event to happen
            });

            cell.addEventListener('drop', e => {
                e.preventDefault();
                
                const shipLength = parseInt(e.dataTransfer.getData('text/plain'));
                const { x, y } = this.getCellCoordinates(cell);

                let direction = this.canPlaceHorizontally(x, y, shipLength) ? 'horizontal' : 'vertical';
                this.placeShip(x, y, shipLength, direction);
                
                // Remove the ship from the selection area (or implement your own logic)
                e.dataTransfer.clearData();
            });
        });
    }

    getCellCoordinates(cell) {
        const x = parseInt(cell.className.match(/human-player-x-(\d+)/)[1]);
        const y = parseInt(cell.className.match(/human-player-y-(\d+)/)[1]);
        return { x, y };
    }

    canPlaceHorizontally(x, y, length) {
        if (x + length > 10) return false;  // Assuming a 10x10 grid
        // Additional checks for ship overlaps can be added here
        return true;
    }

    placeShip(x, y, length, direction) {
        // Update the game state and UI to place the ship at the given coordinates and direction
        // For the sake of this example, I'll simply change the background color of the cells. Adjust this to fit your game logic.
        for (let i = 0; i < length; i++) {
            let cell;
            if (direction === 'horizontal') {
                cell = this.playerBoardElement.querySelector(`.human-player-x-${x + i}.human-player-y-${y}`);
            } else {
                cell = this.playerBoardElement.querySelector(`.human-player-x-${x}.human-player-y-${y + i}`);
            }

            if (cell) {
                cell.style.backgroundColor = 'blue';  // Represents the ship. Adjust this as necessary.
            }
        }
    }
}

export default DragAndDrop;
