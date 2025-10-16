import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  Paper,
  Container,
  Dialog,
  DialogContent,
  DialogActions,
  FormControl,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  EmojiEvents as TrophyIcon,
  Cancel as XCircleIcon,
} from "@mui/icons-material";
import {
  addRandomTile,
  boardsEqual,
  canMove,
  getTileStyle,
  hasWon,
  initializeBoard,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
} from "../Helper/gameFunctions";

const Game2048 = () => {
  // state of the board
  const [boardSize, setBoardSize] = useState(4);
  // state of the board
  const [board, setBoard] = useState(() => initializeBoard(4));
  // state of the score
  const [score, setScore] = useState(0);
  // state of the game
  const [gameOver, setGameOver] = useState(false);
  // state of the win
  const [won, setWon] = useState(false);
  // state of the continue
  const [continueAfterWin, setContinueAfterWin] = useState(false);

  // function to handle move
  const handleMove = useCallback(
    (moveFunction) => {
      if (gameOver || (won && !continueAfterWin)) return;

      const { board: newBoard, score: moveScore } = moveFunction(board);

      if (!boardsEqual(board, newBoard)) {
        const boardWithNewTile = addRandomTile(newBoard);
        setBoard(boardWithNewTile);
        setScore((prev) => prev + moveScore);

        if (!won && hasWon(boardWithNewTile)) {
          setWon(true);
        }

        if (!canMove(boardWithNewTile)) {
          setGameOver(true);
        }
      }
    },
    [board, gameOver, won, continueAfterWin]
  );

  // function to handle key press
  useEffect(() => {
    const handleKeyPress = (e) => {
      e.preventDefault();
      switch (e.key) {
        case "ArrowLeft":
          handleMove(moveLeft);
          break;
        case "ArrowRight":
          handleMove(moveRight);
          break;
        case "ArrowUp":
          handleMove(moveUp);
          break;
        case "ArrowDown":
          handleMove(moveDown);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleMove]);

  // function to restart the game
  const restartGame = () => {
    setBoard(initializeBoard(boardSize));
    setScore(0);
    setGameOver(false);
    setWon(false);
    setContinueAfterWin(false);
  };

  // function to change the board size
  const changeBoardSize = (newSize) => {
    setBoardSize(newSize);
    setBoard(initializeBoard(newSize));
    setScore(0);
    setGameOver(false);
    setWon(false);
    setContinueAfterWin(false);
  };

  // function to continue the game
  const continueGame = () => {
    setContinueAfterWin(true);
  };

  return (
    // main box
    <Box
      sx={{
        height: "100vh",
        background: "linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 1,
        overflow: "hidden",
      }}
    >
      {/* main container */}
      <Container
        maxWidth="md"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* header */}
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", sm: "3rem" },
              fontWeight: "bold",
              color: "#424242",
              mb: 0.5,
            }}
          >
            2048
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#757575", fontSize: "0.875rem" }}
          >
            Join the tiles to reach 2048!
          </Typography>
        </Box>
        {/* game board */}
        <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              {/* score */}
              <Paper
                sx={{
                  bgcolor: "grey",
                  color: "white",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 600, display: "block", fontSize: "0.7rem" }}
                >
                  SCORE
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", fontSize: "1.25rem" }}
                >
                  {score}
                </Typography>
              </Paper>
              {/* board size */}
              <Paper
                sx={{
                  bgcolor: "#e0e0e0",
                  color: "#616161",
                  px: 1.5,
                  py: 1,
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 600, display: "block", fontSize: "0.7rem" }}
                >
                  SIZE
                </Typography>
                <FormControl variant="standard">
                  <Select
                    value={boardSize}
                    onChange={(e) => changeBoardSize(Number(e.target.value))}
                    sx={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      "&:before": { border: "none" },
                      "&:after": { border: "none" },
                    }}
                    disableUnderline
                  >
                    {[3, 4, 5, 6].map((size) => (
                      <MenuItem key={size} value={size}>
                        {size}x{size}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Paper>
            </Box>
            {/* new game button */}
            <Button
              variant="contained"
              onClick={restartGame}
              startIcon={<RefreshIcon />}
              sx={{
                bgcolor: "#424242",
                "&:hover": { bgcolor: "#616161" },
                px: 2,
                py: 1,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "0.875rem",
              }}
            >
              New Game
            </Button>
          </Box>
          {/* board */}
          <Box
            sx={{
              bgcolor: "grey",
              borderRadius: 2,
              p: 1,
              width: "fit-content",
              mx: "auto",
              display: "grid",
              gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
              gap: 1,
            }}
          >
            {board.map((row, i) =>
              row.map((cell, j) => (
                <Box
                  key={`${i}-${j}`}
                  sx={{
                    ...getTileStyle(cell),
                    borderRadius: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize:
                      boardSize <= 4
                        ? "1.5rem"
                        : boardSize === 5
                        ? "1.25rem"
                        : "1rem",
                    transition: "all 0.15s",
                    width:
                      boardSize <= 4
                        ? "70px"
                        : boardSize === 5
                        ? "60px"
                        : "50px",
                    height:
                      boardSize <= 4
                        ? "70px"
                        : boardSize === 5
                        ? "60px"
                        : "50px",
                  }}
                >
                  {cell !== 0 && cell}
                </Box>
              ))
            )}
          </Box>
          {/* instructions */}
          <Box sx={{ mt: 2, textAlign: "center", color: "#757575" }}>
            <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
              Use arrow keys to move tiles
            </Typography>
            <Typography
              variant="caption"
              sx={{ display: "block", mt: 0.5, fontSize: "0.7rem" }}
            >
              Tiles with the same number merge into one
            </Typography>
          </Box>
        </Paper>
        {/* win dialog */}
        <Dialog open={won && !continueAfterWin} maxWidth="xs" fullWidth>
          <DialogContent sx={{ textAlign: "center", pt: 4 }}>
            <TrophyIcon sx={{ fontSize: 64, color: "#fdd835", mb: 2 }} />
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#424242", mb: 1 }}
            >
              You Win!
            </Typography>
            <Typography variant="body1" sx={{ color: "#757575", mb: 3 }}>
              You reached 2048!
            </Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", pb: 3, gap: 2 }}>
            <Button
              variant="contained"
              onClick={continueGame}
              sx={{
                bgcolor: "#43a047",
                "&:hover": { bgcolor: "#388e3c" },
                px: 3,
              }}
            >
              Keep Playing
            </Button>
            <Button
              variant="contained"
              onClick={restartGame}
              sx={{
                bgcolor: "#757575",
                "&:hover": { bgcolor: "#616161" },
                px: 3,
              }}
            >
              New Game
            </Button>
          </DialogActions>
        </Dialog>
        {/* game over dialog */}
        <Dialog open={gameOver} maxWidth="xs" fullWidth>
          <DialogContent sx={{ textAlign: "center", pt: 4 }}>
            <XCircleIcon sx={{ fontSize: 64, color: "#ef5350", mb: 2 }} />
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#424242", mb: 1 }}
            >
              Game Over!
            </Typography>
            <Typography variant="body1" sx={{ color: "#757575", mb: 1 }}>
              No more moves available
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#ffa726", mb: 3 }}
            >
              Final Score: {score}
            </Typography>
          </DialogContent>
          {/* try again button */}
          <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
            <Button
              variant="contained"
              onClick={restartGame}
              sx={{
                bgcolor: "#ffa726",
                "&:hover": { bgcolor: "#fb8c00" },
                px: 4,
              }}
            >
              Try Again
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Game2048;
