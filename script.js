const GameBoard = (function() {
    const gameBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
    return {gameBoard}
})();

const DisplayController = (function() {
    'use strict'
    const board = document.getElementById('board')

    function playClick(e,playerX,playerO){
        let currentPlayer = playerX.turn ? playerX : playerO;
        let nextPlayer = !playerX.turn ? playerX : playerO;
        console.log(currentPlayer.turn)
        console.log(nextPlayer.turn)

        currentPlayer.turn = false
        nextPlayer.turn = true
        console.log('switch')
        
        console.log(currentPlayer.turn)
        console.log(nextPlayer.turn)


        updatePlayArea(e.target, currentPlayer.value)
    }

    function addElement(x,y){
        const playArea = document.createElement('div')
        playArea.classList.add('play')
        playArea.setAttribute('id', `${x}_${y}`)
        playArea.addEventListener('click', e=>{playClick(e,playerX,playerO)})
        board.appendChild(playArea)
    }

    function updatePlayArea(playArea, value){
        playArea.innerHTML = value
    }



    function getPlayArea(x,y){
        return document.getElementById(`${x}_${y}`)
    }

    function setBoard(gameBoard, playerX, playerO){
        let x=1,y=1;
        gameBoard.forEach(row => {
            row.forEach(e=>{
                if (getPlayArea(x,y) === null) addElement(x,y, playerX, playerO);
                else console.log('exists');
                x++
            })
            y++
            x=1
        });
    }

    // function setBoard(){
    //     let x=0, y=1;
    //     [...Array(9).keys()].forEach(n=>{
    //         if(x%3==0 && x!=0) y++, x=1;
    //         else x++;
    //         addElement(x,y)
    //     })
    // }

    return {setBoard}

})();

const Player = (name, value) => {
    let turn = value==='X' ? true : false;
    
    function go(){
        turn = false
        return turn
    }

    function up(){
        turn = true
    }

    return {name, value, turn, go, up}
}  

//global

const playerX = Player('todd', 'X')
const playerO = Player('jack', 'O')

DisplayController.setBoard(GameBoard.gameBoard, playerX, playerO)
