export const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  
  export function checkWin(board, currentPlayer) {
    return winningCombinations.some(combination =>
      combination.every(index => board[index] === currentPlayer)
    );
  }
  
  export function isBoardFull(board) {
    return board.every(square => square !== '');
  }
  
  export function initializeBoard() {
    return Array(9).fill('');
  }
  
  export function switchPlayer(currentPlayer) {
    return currentPlayer === 'X' ? 'O' : 'X';
  }
  