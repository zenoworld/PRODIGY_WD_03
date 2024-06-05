const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');
const message = document.getElementById('message');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (gameState[cellIndex] || !gameActive) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        message.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes(null)) {
        message.textContent = 'Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `${currentPlayer}'s turn`;
}

function checkWin() {
    let win = false;
    winningConditions.forEach(condition => {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            cells[a].classList.add('winning-cell');
            cells[b].classList.add('winning-cell');
            cells[c].classList.add('winning-cell');
            win = true;
        }
    });
    return win;
}

function resetGame() {
    currentPlayer = 'X';
    gameState = Array(9).fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning-cell');
    });
    gameActive = true;
    message.textContent = `${currentPlayer}'s turn`;
}
