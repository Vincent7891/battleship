class Game {
    constructor(player1, player2, ui) {
        this.player1 = player1;
        this.player2 = player2;
        this.ui = ui;
        this.gameOver = false;
    }

    startGame() {
        // Render the grids.
        this.ui.renderGrid(10, this.player1, this.player2, this);  // Pass 'this' for the game instance
        this.player1.createRandomFleet();
        this.player2.createRandomFleet();
        // Render the player's board.
        this.ui.renderYourBoard(this.player1);

        // Optionally, you can automatically set the fleets for players:

    }

    checkGameOver() {
        if (this.player1.board.checkIfAllSunk() || this.player2.board.checkIfAllSunk()) {
            this.gameOver = true;
            this.endGame();
        }
    }

    endGame() {
        // Implement the end-game logic. 
        // Maybe display a message, restart option, etc.
        alert(this.player1.board.checkIfAllSunk() ? "Player 2 Wins!" : "Player 1 Wins!");
    }
}

export default Game