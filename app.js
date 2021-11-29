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

    const _player1 = Player('x');
    const _player2 = Player('o');

    let _activePlayer = _player1;
    const _switchActivePlayer = () => {
        _activePlayer == _player1 ? _activePlayer = _player2 : _activePlayer = _player1
    };

    const _wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6],
    ]

    const _checkWin = () => {
        for (let i = 0; i < _wins.length; i++) {
            let Windex = _wins[i]
            let check = []

            Windex.forEach(fieldIndex => {
                let field = gameBoard.getField(fieldIndex);
                check.push(field)
            })

            if (check.every(field => field == check[0] && field)) {
                return true;
            }
        }
    }

    const _checkDraw = () => {
        if (_checkWin()) {
            return false;
        }
        for (let i = 0; i < 9; i++) {
            const field = gameBoard.getField(i);
            if (field == undefined) {
                return false;
            }
        }
        return true;
    }


    const playerTurn = (i) => {
        const field = gameBoard.getField(i);

        if (field == undefined) {
            gameBoard.setField(i, _activePlayer)

            if (_checkWin()) {
                alert(`${_activePlayer.getSign()} is winner`)
            } else if (_checkDraw()) {
                alert("It's a DRAW")
            }

        } else {
            alert("square is already filled")
        }
        _switchActivePlayer();
    }

    return {
        playerTurn,
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


