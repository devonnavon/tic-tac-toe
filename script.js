const GameBoard = (function() {
    const gameBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]

    function updateBoard(x_y, value){
        x_ylist = x_y.split('_');
        x = x_ylist[0];
        y = x_ylist[1];
        gameBoard[y-1][x-1] = value
        return checkGame();
    }

    function getValue(x_y){
        x_ylist = x_y.split('_');
        x = x_ylist[0];
        y = x_ylist[1];
       return gameBoard[y-1][x-1]
    }

    function checkGame(){
        if ((gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2] && gameBoard[1][1] !==null) || 
        (gameBoard[2][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[0][2] && gameBoard[1][1] !==null)) return gameBoard[1][1]; //diagonal
        for (let i = 0; i < 3; i++){
            if(gameBoard[i].every(e=>(e===gameBoard[i][0] && e!==null))) return gameBoard[i][0]; //row
            else if([gameBoard[0][i],gameBoard[1][i],gameBoard[2][i]].every(e=>(e===gameBoard[0][i] && e!==null))) return gameBoard[0][i]; //column
        }
        for (i = 0; i < 3; i++){
            for (let j = 0; j <= 2; j++){if (gameBoard[i][j] ===null) return null}
        }
        return 'tie'
    }

    return {gameBoard, updateBoard, getValue}
})();

const DisplayController = (function() {
    'use strict'
    const board = document.getElementById('board');
    const results = document.getElementById('results');

    function playClick(e,playerX,playerO){
        if(GameBoard.getValue(e.target.id) === null){
            let currentPlayer = playerX.turn ? playerX : playerO;
            let nextPlayer = !playerX.turn ? playerX : playerO;
            currentPlayer.turn = false;
            nextPlayer.turn = true;
            updatePlayArea(e.target, currentPlayer.value);
            let gameStatus = GameBoard.updateBoard(e.target.id, currentPlayer.value);
            if(gameStatus) declareResult(gameStatus, currentPlayer);
        }
    }

    function declareResult(gameStatus, currentPlayer){
        console.log('hellow')
        if(gameStatus=='tie') console.log('Tie'), results.innerHTML='Tie Game!!';
        else results.innerHTML=`${currentPlayer.name} won!!`, console.log('john');
    }

    function addElement(x,y){
        const playArea = document.createElement('div')
        playArea.classList.add('play')
        playArea.setAttribute('id', `${x}_${y}`)
        playArea.addEventListener('click', e=>{playClick(e,playerX,playerO, )})
        board.appendChild(playArea)
    }

    function updatePlayArea(playArea, value){
        const playerMove = document.createElement('div')
        if(value==='X') {
            playerMove.classList.add('playerOne')
            playArea.appendChild(playerMove)
        }
        if(value==='O') {
            playerMove.classList.add('playerTwo')
            playArea.appendChild(playerMove)
        }
    }


    function getPlayArea(x,y){
        return document.getElementById(`${x}_${y}`)
    }

    function setBoard(){
        let x=1,y=1;
        GameBoard.gameBoard.forEach(row => {
            row.forEach(e=>{
                if (getPlayArea(x,y) === null) addElement(x,y);
                else console.log('exists');
                x++
            })
            y++
            x=1
        });
    }

    return {setBoard}

})();

const Player = (name, value) => {
    let turn = value==='X' ? true : false;

    return {value, turn, name}
}  

//global

const playerX = Player('Player One','X')

const playerO = Player('Player Two','O')

console.log(playerX.name)

DisplayController.setBoard()
