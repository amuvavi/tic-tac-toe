import { initializeBoard, checkWin, isBoardFull, switchPlayer } from './gameLogic.js';

document.addEventListener('DOMContentLoaded', () => {
  const boardElement = document.querySelector('#board');
  const squares = document.querySelectorAll('.square');
  const messageElement = document.querySelector('#message');
  const resetButton = document.querySelector('#reset');
  let board = initializeBoard();
  let currentPlayer = 'X';
  let gameActive = true;

  const handleSquareClick = (e) => {
    const index = e.target.getAttribute('data-index');
    if (!gameActive || board[index] !== '') return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin(board, currentPlayer)) {
      messageElement.textContent = `Player ${currentPlayer} wins!`;
      gameActive = false;
    } else if (isBoardFull(board)) {
      messageElement.textContent = 'It\'s a tie!';
      gameActive = false;
    } else {
      currentPlayer = switchPlayer(currentPlayer);
    }
  };

  const resetGame = () => {
    board = initializeBoard();
    squares.forEach(square => (square.textContent = ''));
    currentPlayer = 'X';
    gameActive = true;
    messageElement.textContent = '';
  };

  squares.forEach(square => square.addEventListener('click', handleSquareClick));
  resetButton.addEventListener('click', resetGame);
});
