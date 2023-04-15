

let gameState = ['','','','','','','','',''];
let gameOn = true;

startGame = () => {
    let board = $('#Board');
    let count = 1;
    console.log(gameState);


    for(let x=0; x<=2; x++){
        let row=$(`<tr></tr>`)
        for (let y =0; y<=2; y++){
            let square = $('<td></td>');
            square.text('?')
            let idNum = count;
            square.attr('id', idNum);
            square.on('click', ()=> boxClick(idNum));
            row.append(square); 
            count++;
        }
        board.append(row);
    }

    let X = 'X';
    let O = "O";
    let currentPlayer = Math.floor(Math.random()*100);
    currentPlayer = currentPlayer > 50 ? X : O;
    $(`.instructions`).text(`It is player ${currentPlayer}'s turn.`)

     boxClick = (square) => {
        let boxToChange = $(`#${square}`);
        console.log(boxToChange);
        if(gameState[square-1] !== ''){
            return;
        }
        currentPlayer = currentPlayer === X ? O : X;   //ternary operator to decide who goes first after random math is done above.  
        $(`.instructions`).text(`It is player ${currentPlayer}'s turn.`);
        boxToChange.text(currentPlayer);
        gameState[square-1] = currentPlayer;
        console.log(gameState);
        winValidation();
        }

 //win logic 

    winValidation = () => {
      
        let roundWin = false;

        const waysToWin = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
    
        ];
   
        for (let i=0; i<=7; i++){
        const winCondition = waysToWin[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === ''){
            continue;
            }
        if (a === b && b === c){
            roundWin = true;
            break;
            }
        }

            if (roundWin){
                alert(`Player ${currentPlayer} has won!`);
                gameOn = false;
                return;
            } 
            let draw = !gameState.includes('');
            if (draw) {
                alert(`Draw!`);
                gameOn = false;
                return;
            }

    }

}

restartGame = () => {
    $('td').text('?');
    gameOn = true;
    gameState = ['','','','','','','','',''];
    let X = 'X';
    let O = "O";
    
    currentPlayer = Math.floor(Math.random()*100);
    currentPlayer = currentPlayer > 50 ? X : O;

    
    $(`.instructions`).text(`It is player ${currentPlayer}'s turn.`);
    
}

startGame();

let restart = $('#restart');
restart.on('click', ()=> {
    restartGame();
});





