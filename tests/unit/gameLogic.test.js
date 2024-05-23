import { expect, test, describe, beforeEach } from 'vitest';
import { checkWin, isBoardFull, initializeBoard, switchPlayer, winningCombinations } from '../../src/gameLogic';

describe('Tic Tac Toe Game Logic', () => {
  let board;

  beforeEach(() => {
    board = initializeBoard();
  });

  test('should initialize the board correctly', () => {
    expect(board).toEqual(['', '', '', '', '', '', '', '', '']);
  });

  test('should switch player correctly', () => {
    expect(switchPlayer('X')).toBe('O');
    expect(switchPlayer('O')).toBe('X');
  });

  test('should identify a win for X', () => {
    board = ['X', 'X', 'X', '', '', '', '', '', ''];
    expect(checkWin(board, 'X')).toBe(true);
  });

  test('should identify a win for O', () => {
    board = ['', '', '', 'O', 'O', 'O', '', '', ''];
    expect(checkWin(board, 'O')).toBe(true);
  });

  test('should not identify a win if there is no winning combination', () => {
    board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    expect(checkWin(board, 'X')).toBe(false);
    expect(checkWin(board, 'O')).toBe(false);
  });

  test('should identify if the board is full', () => {
    board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    expect(isBoardFull(board)).toBe(true);
  });

  test('should identify if the board is not full', () => {
    board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', ''];
    expect(isBoardFull(board)).toBe(false);
  });

  test('should contain valid winning combinations', () => {
    expect(winningCombinations).toContainEqual([0, 1, 2]);
    expect(winningCombinations).toContainEqual([3, 4, 5]);
    expect(winningCombinations).toContainEqual([6, 7, 8]);
    expect(winningCombinations).toContainEqual([0, 3, 6]);
    expect(winningCombinations).toContainEqual([1, 4, 7]);
    expect(winningCombinations).toContainEqual([2, 5, 8]);
    expect(winningCombinations).toContainEqual([0, 4, 8]);
    expect(winningCombinations).toContainEqual([2, 4, 6]);
  });
});
