# 2048 Game - React Implementation

A modern, responsive implementation of the classic 2048 puzzle game built with React and Material-UI.

## 🎮 About the Game

2048 is a sliding block puzzle game where you combine tiles with the same numbers to create larger numbers. The goal is to create a tile with the number 2048!

### Features

- 🎯 **Multiple Board Sizes**: Play on 3x3, 4x4, 5x5, or 6x6 grids
- 🎨 **Beautiful UI**: Modern design with smooth animations and color-coded tiles
- 📱 **Responsive Design**: Fits perfectly in your viewport without scrolling
- ⌨️ **Keyboard Controls**: Use arrow keys for seamless gameplay
- 🏆 **Win Detection**: Automatically detects when you reach 2048
- 🔄 **Continue After Win**: Option to keep playing after reaching 2048
- 💯 **Score Tracking**: Real-time score updates as you merge tiles

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd 2048-game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 How to Play

1. **Use arrow keys** (↑ ↓ ← →) to move all tiles in that direction
2. **When two tiles** with the same number touch, they merge into one
3. **After each move**, a new tile (2 or 4) appears randomly on the board
4. **Goal**: Create a tile with the number 2048
5. **Game Over**: When no more moves are possible

### Pro Tips

- Keep your highest tile in a corner
- Build tiles in a cascading pattern
- Don't randomly spam keys - plan your moves
- Try to keep the board as empty as possible

## 🛠️ Built With

- **React** - Frontend framework
- **Material-UI (MUI)** - UI component library
- **Functional Programming** - Pure functions for game logic
- **React Hooks** - useState, useEffect, useCallback for state management

## 📁 Project Structure
```
src/
├── App.js              # Main game component
├── index.js            # Entry point
└── ...
```

## 🎨 Game Logic Highlights

- **Pure Functions**: All game logic uses pure, side-effect-free functions
- **Immutable State**: Board state is never mutated directly
- **Functional Utilities**: Transpose, reverse, and range operations
- **Move Algorithm**: Efficient slide and merge logic for all directions

## 🔧 Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

## 🎮 Keyboard Controls

| Key | Action |
|-----|--------|
| ↑ | Move tiles up |
| ↓ | Move tiles down |
| ← | Move tiles left |
| → | Move tiles right |

## 🌟 Game Features Implementation

### Tile Merging
When two tiles with the same value collide, they merge into one tile with double the value, and your score increases by the merged tile's value.

### Random Tile Generation
After each valid move, a new tile (90% chance of 2, 10% chance of 4) appears in a random empty position.

### Win/Lose Detection
- **Win**: Detected when any tile reaches 2048
- **Lose**: Detected when the board is full and no adjacent tiles can merge

## 🎨 Color Scheme

Each tile value has a unique color:
- 2, 4: Light orange shades
- 8-64: Orange to red gradient
- 128-512: Yellow shades
- 1024-2048: Dark yellow/gold
- 4096+: Purple

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or feedback, feel free to reach out or open an issue.

---

**Enjoy the game! Can you reach 2048?** 🎯