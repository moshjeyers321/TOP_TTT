const gameBoard = (() => {
    let _board = new Array(9);
    // let _board = ["x", "o", "x", "x", "o", "x", "o", "x", "o"];
    const getField = (i) => _board[i];
    const setField = (i, player) => {
        const htmlField = document.querySelector(`.gameBoard button:nth-child(${i + 1})`);
        htmlField.textContent = player.getSign();
        _board[i] = player.getSign();
    }



    return {
        getField,
        setField
    };
})();




const Player = (sign) => {
    const getSign = () => sign;

    return { getSign };
}


const gameController = (() => {

    const _humanPlayer = Player('x');

    const getHumanPlayer = () => _humanPlayer;

    const playerTurn = (i) => {
        const field = gameBoard.getField(i);

        if (field == undefined) {
            gameBoard.setField(i, _humanPlayer)
        } else {
            alert("square is already filled")
        }
    }

    return {
        playerTurn,
        getHumanPlayer,
    }
})();


const displayController = (() => {
    const htmlBoard = Array.from(document.querySelectorAll('button.field'));



    //setting up the board with what's in the _board array
    const _init = (() => {
        for (let i = 0; i < htmlBoard.length; i++) {
            field = htmlBoard[i]
            field.textContent = gameBoard.getField(i)
            field.addEventListener('click', gameController.playerTurn.bind(field, i))
        }
    })();


    return { htmlBoard }
})();


