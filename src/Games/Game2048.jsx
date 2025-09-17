// //------------------- all imports and constants at the top-------------------------
// import React, { useState, useEffect, useRef } from "react";
// import first from "../assets/sound/arrow.mp3";
// import second from "../assets/sound/merge.mp3";
// import third from "../assets/sound/new-tile.mp3";

// // Grid size
// const GRID_SIZE = 4;

// // Tile colors (Tailwind classes)
// const tileColors = {
//   2: "bg-yellow-100 text-gray-800",
//   4: "bg-yellow-200 text-gray-800",
//   8: "bg-orange-400 text-white",
//   16: "bg-orange-500 text-white",
//   32: "bg-red-400 text-white",
//   64: "bg-red-500 text-white",
//   128: "bg-green-400 text-white",
//   256: "bg-green-500 text-white",
//   512: "bg-teal-400 text-white",
//   1024: "bg-teal-500 text-white",
//   2048: "bg-purple-600 text-white",
// };

// // Helper function to play sounds safely
// const playSound = (sound) => {
//   if (!sound) return;
//   try {
//     sound.currentTime = 0; // restart if already playing
//     sound.play().catch((err) => {
//       console.log("Sound blocked:", err);
//     });
//   } catch (err) {
//     console.log("Sound play error:", err);
//   }
// };

// // --------------------all helper functions and game logic next-----------------------

// // Helper functions
// const getEmptyGrid = () =>
//   Array(GRID_SIZE)
//     .fill()
//     .map(() => Array(GRID_SIZE).fill(0));
// const getRandomTile = () => (Math.random() < 0.9 ? 2 : 4);
// const getEmptyCells = (grid) => {
//   const empty = [];
//   grid.forEach((row, r) =>
//     row.forEach((val, c) => {
//       if (val === 0) empty.push([r, c]);
//     })
//   );
//   return empty;
// };

// const addNewTile = (grid, newTileSoundRef) => {
//   const newGrid = grid.map((row) => [...row]);
//   const empty = getEmptyCells(newGrid);
//   if (empty.length === 0) return newGrid;
//   const [r, c] = empty[Math.floor(Math.random() * empty.length)];
//   newGrid[r][c] = getRandomTile();

//   if (newTileSoundRef && newTileSoundRef.current) {
//     playSound(newTileSoundRef.current);
//   }

//   return newGrid;
// };

// // Slide an array left
// const slide = (row, setScore, mergeSoundRef) => {
//   let newRow = row.filter((n) => n !== 0);
//   for (let i = 0; i < newRow.length - 1; i++) {
//     if (newRow[i] === newRow[i + 1]) {
//       newRow[i] *= 2;
//       setScore((prev) => prev + newRow[i]);

//       if (mergeSoundRef && mergeSoundRef.current) {
//         playSound(mergeSoundRef.current);
//       }

//       newRow[i + 1] = 0;
//     }
//   }
//   newRow = newRow.filter((n) => n !== 0);
//   while (newRow.length < GRID_SIZE) newRow.push(0);
//   return newRow;
// };

// // Move functions
// const moveLeft = (grid, setScore, mergeSoundRef) =>
//   grid.map((row) => slide(row, setScore, mergeSoundRef));
// const moveRight = (grid, setScore, mergeSoundRef) =>
//   grid.map((row) =>
//     slide([...row].reverse(), setScore, mergeSoundRef).reverse()
//   );
// const moveUp = (grid, setScore, mergeSoundRef) => {
//   const transposed = grid[0].map((_, i) => grid.map((row) => row[i]));
//   const moved = moveLeft(transposed, setScore, mergeSoundRef);
//   return moved[0].map((_, i) => moved.map((row) => row[i]));
// };
// const moveDown = (grid, setScore, mergeSoundRef) => {
//   const transposed = grid[0].map((_, i) => grid.map((row) => row[i]));
//   const moved = moveRight(transposed, setScore, mergeSoundRef);
//   return moved[0].map((_, i) => moved.map((row) => row[i]));
// };

// // Check if game is over
// const checkGameOver = (grid) => {
//   const empty = getEmptyCells(grid);
//   if (empty.length > 0) return false;
//   for (let r = 0; r < GRID_SIZE; r++) {
//     for (let c = 0; c < GRID_SIZE; c++) {
//       const val = grid[r][c];
//       if (
//         (r < GRID_SIZE - 1 && val === grid[r + 1][c]) ||
//         (c < GRID_SIZE - 1 && val === grid[r][c + 1])
//       )
//         return false;
//     }
//   }
//   return true;
// };

// //----------------- Component with state and handlers---------------------

// const Game2048 = () => {
//   const newTileSound = useRef(new Audio(first));
//   const arrowSound = useRef(new Audio(second));
//   const mergeSound = useRef(new Audio(third));

//   useEffect(() => {
//     if (newTileSound.current) newTileSound.current.volume = 0.5;
//     if (arrowSound.current) arrowSound.current.volume = 0.3;
//     if (mergeSound.current) mergeSound.current.volume = 0.5;
//   }, []);

//   const [grid, setGrid] = useState(() =>
//     addNewTile(addNewTile(getEmptyGrid(), newTileSound), newTileSound)
//   );
//   const [score, setScore] = useState(0);
//   const [gameOver, setGameOver] = useState(false);
//   const gameRef = useRef(null);

//   useEffect(() => {
//     gameRef.current?.focus();
//   }, []);

//   const move = (direction) => {
//     if (gameOver) return;
//     let newGrid;
//     if (direction === "left") newGrid = moveLeft(grid, setScore, mergeSound);
//     if (direction === "right") newGrid = moveRight(grid, setScore, mergeSound);
//     if (direction === "up") newGrid = moveUp(grid, setScore, mergeSound);
//     if (direction === "down") newGrid = moveDown(grid, setScore, mergeSound);

//     if (JSON.stringify(newGrid) !== JSON.stringify(grid)) {
//       setGrid(addNewTile(newGrid, newTileSound));
//       if (checkGameOver(newGrid)) setGameOver(true);
//     } else if (checkGameOver(newGrid)) {
//       setGameOver(true);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (gameOver) return;

//     if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
//       if (arrowSound.current) playSound(arrowSound.current);
//     }

//     if (e.key === "ArrowLeft") move("left");
//     else if (e.key === "ArrowRight") move("right");
//     else if (e.key === "ArrowUp") move("up");
//     else if (e.key === "ArrowDown") move("down");
//   };

//   const resetGame = () => {
//     setScore(0);
//     setGameOver(false);
//     setGrid(addNewTile(addNewTile(getEmptyGrid(), newTileSound), newTileSound));
//     gameRef.current?.focus();
//   };

//   return (
//     <div
//       ref={gameRef}
//       tabIndex={0}
//       onKeyDown={handleKeyDown}
//       className="relative flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-br from-purple-500 via-pink-400 to-orange-300 p-6 overflow-hidden scrollbar-hide"
//     >
//       <BubbleBackground /> {/* 🎈 bubble animation background */}

//       <h1 className="text-10xl font-bold mb-6 text-white drop-shadow-lg">
//         Game2048
//       </h1>
//       <div className="mb-4 text-lg text-white font-semibold">
//         Score: {score}
//       </div>

//       <div className="grid grid-cols-4 gap-3 bg-purple-200 p-4 rounded-2xl shadow-xl">
//         {grid.map((row, r) =>
//           row.map((val, c) => (
//             <div
//               key={`${r}-${c}`}
//               className={`h-20 w-20 flex items-center justify-center rounded-xl font-bold text-xl transition-all duration-200 ${
//                 val === 0
//                   ? "bg-purple-100"
//                   : tileColors[val] || "bg-gray-700 text-white"
//               }`}
//             >
//               {val !== 0 ? val : ""}
//             </div>
//           ))
//         )}
//       </div>

//       {gameOver && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
//             <h2 className="text-2xl font-bold mb-4">Game Over</h2>
//             <p className="mb-4">Final Score: {score}</p>
//             <button
//               onClick={resetGame}
//               className="px-6 py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600"
//             >
//               Play Again
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Game2048;

// // ---------------- Additional Component for Bubble Animation ----------------

// const BubbleBackground = () => {
//   const [bubbles, setBubbles] = useState([]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const id = Math.random();
//       const size = Math.random() * 40 + 10;
//       const left = Math.random() * 100;
//       const duration = Math.random() * 5 + 5;
//       setBubbles((prev) => [...prev, { id, size, left, duration }]);

//       setTimeout(() => {
//         setBubbles((prev) => prev.filter((b) => b.id !== id));
//       }, duration * 1000);
//     }, 600);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       {bubbles.map((bubble) => (
//         <span
//           key={bubble.id}
//           className="absolute bottom-0 rounded-full bg-white opacity-30 animate-bubble"
//           style={{
//             "--duration": `${bubble.duration}s`,
//             width: bubble.size,
//             height: bubble.size,
//             left: `${bubble.left}%`,
//           }}
//         />
//       ))}
//     </div>
//   );
// };



//------------------- all imports and constants at the top-------------------------
import React, { useState, useEffect, useRef } from "react";
import first from "../assets/sound/arrow.mp3";
import second from "../assets/sound/merge.mp3";
import third from "../assets/sound/new-tile.mp3";

// Grid size
const GRID_SIZE = 4;

// Tile colors (Tailwind classes)
const tileColors = {
  2: "bg-yellow-100 text-gray-800",
  4: "bg-yellow-200 text-gray-800",
  8: "bg-orange-400 text-white",
  16: "bg-orange-500 text-white",
  32: "bg-red-400 text-white",
  64: "bg-red-500 text-white",
  128: "bg-green-400 text-white",
  256: "bg-green-500 text-white",
  512: "bg-teal-400 text-white",
  1024: "bg-teal-500 text-white",
  2048: "bg-purple-600 text-white",
};

// Helper function to play sounds safely
const playSound = (sound) => {
  if (!sound) return;
  try {
    sound.currentTime = 0;
    sound.play().catch((err) => {
      console.log("Sound blocked:", err);
    });
  } catch (err) {
    console.log("Sound play error:", err);
  }
};

// --------------------all helper functions and game logic next-----------------------

// Helper functions
const getEmptyGrid = () =>
  Array(GRID_SIZE)
    .fill()
    .map(() => Array(GRID_SIZE).fill(0));
const getRandomTile = () => (Math.random() < 0.9 ? 2 : 4);
const getEmptyCells = (grid) => {
  const empty = [];
  grid.forEach((row, r) =>
    row.forEach((val, c) => {
      if (val === 0) empty.push([r, c]);
    })
  );
  return empty;
};

const addNewTile = (grid, newTileSoundRef) => {
  const newGrid = grid.map((row) => [...row]);
  const empty = getEmptyCells(newGrid);
  if (empty.length === 0) return newGrid;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  newGrid[r][c] = getRandomTile();

  if (newTileSoundRef && newTileSoundRef.current) {
    playSound(newTileSoundRef.current);
  }

  return newGrid;
};

// Slide an array left
const slide = (row, setScore, mergeSoundRef) => {
  let newRow = row.filter((n) => n !== 0);
  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i] === newRow[i + 1]) {
      newRow[i] *= 2;
      setScore((prev) => prev + newRow[i]);

      if (mergeSoundRef && mergeSoundRef.current) {
        playSound(mergeSoundRef.current);
      }

      newRow[i + 1] = 0;
    }
  }
  newRow = newRow.filter((n) => n !== 0);
  while (newRow.length < GRID_SIZE) newRow.push(0);
  return newRow;
};

// Move functions
const moveLeft = (grid, setScore, mergeSoundRef) =>
  grid.map((row) => slide(row, setScore, mergeSoundRef));
const moveRight = (grid, setScore, mergeSoundRef) =>
  grid.map((row) =>
    slide([...row].reverse(), setScore, mergeSoundRef).reverse()
  );
const moveUp = (grid, setScore, mergeSoundRef) => {
  const transposed = grid[0].map((_, i) => grid.map((row) => row[i]));
  const moved = moveLeft(transposed, setScore, mergeSoundRef);
  return moved[0].map((_, i) => moved.map((row) => row[i]));
};
const moveDown = (grid, setScore, mergeSoundRef) => {
  const transposed = grid[0].map((_, i) => grid.map((row) => row[i]));
  const moved = moveRight(transposed, setScore, mergeSoundRef);
  return moved[0].map((_, i) => moved.map((row) => row[i]));
};

// Check if game is over
const checkGameOver = (grid) => {
  const empty = getEmptyCells(grid);
  if (empty.length > 0) return false;
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const val = grid[r][c];
      if (
        (r < GRID_SIZE - 1 && val === grid[r + 1][c]) ||
        (c < GRID_SIZE - 1 && val === grid[r][c + 1])
      )
        return false;
    }
  }
  return true;
};

//----------------- Component with state and handlers---------------------

const Game2048 = () => {
  const newTileSound = useRef(new Audio(first));
  const arrowSound = useRef(new Audio(second));
  const mergeSound = useRef(new Audio(third));

  useEffect(() => {
    if (newTileSound.current) newTileSound.current.volume = 0.5;
    if (arrowSound.current) arrowSound.current.volume = 0.3;
    if (mergeSound.current) mergeSound.current.volume = 0.5;
  }, []);

  const [grid, setGrid] = useState(() =>
    addNewTile(addNewTile(getEmptyGrid(), newTileSound), newTileSound)
  );
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameRef = useRef(null);

  useEffect(() => {
    gameRef.current?.focus();
  }, []);

  const move = (direction) => {
    if (gameOver) return;
    let newGrid;
    if (direction === "left") newGrid = moveLeft(grid, setScore, mergeSound);
    if (direction === "right") newGrid = moveRight(grid, setScore, mergeSound);
    if (direction === "up") newGrid = moveUp(grid, setScore, mergeSound);
    if (direction === "down") newGrid = moveDown(grid, setScore, mergeSound);

    if (JSON.stringify(newGrid) !== JSON.stringify(grid)) {
      setGrid(addNewTile(newGrid, newTileSound));
      if (checkGameOver(newGrid)) setGameOver(true);
    } else if (checkGameOver(newGrid)) {
      setGameOver(true);
    }
  };

  const handleKeyDown = (e) => {
    if (gameOver) return;

    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
      if (arrowSound.current) playSound(arrowSound.current);
    }

    if (e.key === "ArrowLeft") move("left");
    else if (e.key === "ArrowRight") move("right");
    else if (e.key === "ArrowUp") move("up");
    else if (e.key === "ArrowDown") move("down");
  };

  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    setGrid(addNewTile(addNewTile(getEmptyGrid(), newTileSound), newTileSound));
    gameRef.current?.focus();
  };

  return (
    <div
      ref={gameRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-6 overflow-hidden"
    >
      <BubbleBackground /> {/* 🎈 bubble animation background */}

      <h1 className="text-6xl font-extrabold mb-6 text-white drop-shadow-lg tracking-wide">
        2048
      </h1>
      <div className="mb-4 text-xl text-white font-semibold bg-black/30 px-6 py-2 rounded-lg shadow-md">
        Score: {score}
      </div>

      <div className="grid grid-cols-4 gap-3 bg-purple-300/40 backdrop-blur-md p-4 rounded-2xl shadow-2xl">
        {grid.map((row, r) =>
          row.map((val, c) => (
            <div
              key={`${r}-${c}`}
              className={`h-20 w-20 flex items-center justify-center rounded-xl font-bold text-2xl transition-all duration-300 transform ${
                val === 0
                  ? "bg-purple-200/50"
                  : `${tileColors[val] || "bg-gray-700 text-white"} shadow-lg scale-105`
              }`}
            >
              {val !== 0 ? val : ""}
            </div>
          ))
        )}
      </div>

      {gameOver && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
            <h2 className="text-2xl font-bold mb-4">Game Over</h2>
            <p className="mb-4">Final Score: {score}</p>
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game2048;

// ---------------- Additional Component for Bubble Animation ----------------

const BubbleBackground = () => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Math.random();
      const size = Math.random() * 40 + 15;
      const left = Math.random() * 100;
      const duration = Math.random() * 6 + 4;
      setBubbles((prev) => [...prev, { id, size, left, duration }]);

      setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => b.id !== id));
      }, duration * 1000);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style>
        {`
          @keyframes floatUp {
            0% { transform: translateY(100%); opacity: 0.6; }
            50% { opacity: 0.8; }
            100% { transform: translateY(-120%); opacity: 0; }
          }
          .animate-bubble {
            animation: floatUp var(--duration) linear forwards;
          }
        `}
      </style>

      {bubbles.map((bubble) => (
        <span
          key={bubble.id}
          className="absolute bottom-0 rounded-full bg-white opacity-30 animate-bubble"
          style={{
            "--duration": `${bubble.duration}s`,
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
          }}
        />
      ))}
    </div>
  );
};
