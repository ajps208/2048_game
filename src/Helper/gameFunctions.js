import { range, reverse, transpose } from "./utilityFunctions";

// function to create an empty board
export const createEmptyBoard = (size) =>
  range(size).map(() => range(size).map(() => 0));

// function to get empty positions
export const getEmptyPositions = (board) => {
  const empty = [];
  board.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 0) empty.push([i, j]);
    });
  });
  return empty;
};
// function to add random tile
export const addRandomTile = (board) => {
  const empty = getEmptyPositions(board);
  if (empty.length === 0) return board;

  const [row, col] = empty[Math.floor(Math.random() * empty.length)];
  const value = Math.random() < 0.9 ? 2 : 4;

  return board.map((r, i) =>
    r.map((cell, j) => (i === row && j === col ? value : cell))
  );
};
// function to initialize the board
export const initializeBoard = (size) => {
  let board = createEmptyBoard(size);
  board = addRandomTile(board);
  board = addRandomTile(board);
  return board;
};
// function to slide and merge row
export const slideAndMergeRow = (row) => {
  const filtered = row.filter((cell) => cell !== 0);
  const merged = [];
  let score = 0;
  let i = 0;

  while (i < filtered.length) {
    if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
      const mergedValue = filtered[i] * 2;
      merged.push(mergedValue);
      score += mergedValue;
      i += 2;
    } else {
      merged.push(filtered[i]);
      i += 1;
    }
  }

  while (merged.length < row.length) {
    merged.push(0);
  }

  return { row: merged, score };
};
// function to move left
export const moveLeft = (board) => {
  let totalScore = 0;
  const newBoard = board.map((row) => {
    const { row: newRow, score } = slideAndMergeRow(row);
    totalScore += score;
    return newRow;
  });
  return { board: newBoard, score: totalScore };
};
// function to move right
export const moveRight = (board) => {
  let totalScore = 0;
  const newBoard = board.map((row) => {
    const reversed = reverse(row);
    const { row: newRow, score } = slideAndMergeRow(reversed);
    totalScore += score;
    return reverse(newRow);
  });
  return { board: newBoard, score: totalScore };
};
// function to move up
export const moveUp = (board) => {
  const transposed = transpose(board);
  const { board: moved, score } = moveLeft(transposed);
  return { board: transpose(moved), score };
};
// function to move down
export const moveDown = (board) => {
  const transposed = transpose(board);
  const { board: moved, score } = moveRight(transposed);
  return { board: transpose(moved), score };
};
// function to check if two boards are equal
export const boardsEqual = (board1, board2) => {
  return board1.every((row, i) =>
    row.every((cell, j) => cell === board2[i][j])
  );
};
// function to check if player has won
export const hasWon = (board) => {
  return board.some((row) => row.some((cell) => cell === 2048));
};
// function to check if player can move
export const canMove = (board) => {
  if (getEmptyPositions(board).length > 0) return true;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length - 1; j++) {
      if (board[i][j] === board[i][j + 1]) return true;
    }
  }

  for (let i = 0; i < board.length - 1; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === board[i + 1][j]) return true;
    }
  }

  return false;
};
// function to get tile style
export const getTileStyle = (value) => {
  const styles = {
    0: { backgroundColor: "#e0e0e0", color: "#000" },
    2: { backgroundColor: "#fff3e0", color: "#424242" },
    4: { backgroundColor: "#ffe0b2", color: "#424242" },
    8: { backgroundColor: "#ffb74d", color: "#fff" },
    16: { backgroundColor: "#ffa726", color: "#fff" },
    32: { backgroundColor: "#ff9800", color: "#fff" },
    64: { backgroundColor: "#ef5350", color: "#fff" },
    128: { backgroundColor: "#ffee58", color: "#fff" },
    256: { backgroundColor: "#fdd835", color: "#fff" },
    512: { backgroundColor: "#fbc02d", color: "#fff" },
    1024: { backgroundColor: "#f9a825", color: "#fff" },
    2048: { backgroundColor: "#f57f17", color: "#fff" },
  };
  return styles[value] || { backgroundColor: "#7e57c2", color: "#fff" };
};
