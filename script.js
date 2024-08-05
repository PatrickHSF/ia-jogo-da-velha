const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const handleClick = (e) => {
    const index = e.target.dataset.index;
    if (boardState[index] !== '' || !gameActive) return;

    boardState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin()) {
        status.textContent = `Jogador ${currentPlayer} venceu!`;
        gameActive = false;
        return;
    }

    if (boardState.every(cell => cell !== '')) {
        status.textContent = 'Empate!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `É a vez do jogador ${currentPlayer}`;
};

const checkWin = () => {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
};

const resetGame = () => {
    boardState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    status.textContent = `É a vez do jogador ${currentPlayer}`;
    cells.forEach(cell => cell.textContent = '');
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

status.textContent = `É a vez do jogador ${currentPlayer}`;
