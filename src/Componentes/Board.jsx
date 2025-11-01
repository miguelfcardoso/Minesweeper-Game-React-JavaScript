import { useEffect, useState } from 'react';
import Celula from "./Celula";
import "../style/Board.css";

export default function Board({
    gameStatus,
    flagCount,
    gameMode,
    changeFlagAmount,
    endGame,
    onReset,
    onCellClick,
    reset
}) {
    const [grid, setGrid] = useState(null);
    const [flagsPlaced, setFlagsPlaced] = useState(0);

    useEffect(() => {
        function freshBoard() {
            const newBoard = createBoard(gameMode.rows, gameMode.columns, gameMode.mines);
            setGrid(newBoard);
            setFlagsPlaced(0);
        }
        freshBoard();
    }, [gameMode, reset]);

    useEffect(() => {
        checkWinAfterFlagPlacement();
    }, [flagCount]);

    const handleCellLeftClick = (x, y) => {
        handleCellClick(x, y);
    };

    const handleCellClick = (x, y) => {
        if (gameStatus === "win" || gameStatus === "lose") {
            return;
        }

        if (grid[x][y].hasFlag || grid[x][y].isOpen) {
            return;
        }

        if (grid[x][y].isBomb) {
            revealBombs();
            setTimeout(() => {
                endGame(false);
            }, 200);
            return;
        }

        const updatedGrid = [...grid];
        updatedGrid[x][y].isOpen = true;

        if (updatedGrid[x][y].bombsAdjacent === 0) {
            openAdjacentCells(x, y, updatedGrid);
        }

        setGrid(updatedGrid);

        if (checkWin(updatedGrid)) {
            endGame(true);
        }

        onCellClick();
    };

    const openAdjacentCells = (x, y, updatedGrid) => {
        const directions = [
            { dx: -1, dy: -1 }, { dx: -1, dy: 0 }, { dx: -1, dy: 1 },
            { dx: 0, dy: -1 }, { dx: 0, dy: 1 },
            { dx: 1, dy: -1 }, { dx: 1, dy: 0 }, { dx: 1, dy: 1 }
        ];

        for (const direction of directions) {
            const newX = x + direction.dx;
            const newY = y + direction.dy;

            if (isValidCell(newX, newY, updatedGrid.length, updatedGrid[0].length) && !updatedGrid[newX][newY].isOpen && !updatedGrid[newX][newY].isBomb) {
                updatedGrid[newX][newY].isOpen = true;

                if (updatedGrid[newX][newY].bombsAdjacent === 0) {
                    openAdjacentCells(newX, newY, updatedGrid);
                }
            }
        }
    };

    const isValidCell = (x, y, rows, columns) => {
        return x >= 0 && x < rows && y >= 0 && y < columns;
    };

    const checkWin = (grid) => {
        for (const row of grid) {
            for (const cell of row) {
                if (!cell.isBomb && !cell.isOpen) {
                    return false;
                }
                if (cell.isBomb && cell.isOpen) {
                    return false;
                }
            }
        }
        return true;
    };

    const checkWinAfterFlagPlacement = () => {
        if (!Array.isArray(grid)) {
            return;
        }

        let flaggedBombCount = 0;
        for (const row of grid) {
            for (const cell of row) {
                if (cell.isBomb && cell.hasFlag) {
                    flaggedBombCount++;
                }
            }
        }

        if (flaggedBombCount === gameMode.mines) {
            endGame(true);
        }
    };

    const revealBombs = () => {
        const updatedGrid = [...grid];
        updatedGrid.forEach((row) => {
            row.forEach((cell) => {
                if (cell.isBomb) {
                    cell.isOpen = true;
                }
            });
        });
        setGrid(updatedGrid);
    };

    const handleCellRightClick = (x, y, event) => {
        event.preventDefault(); 

        const updatedGrid = [...grid];
        let amount = 0;

        if (updatedGrid[x][y].hasFlag) {
            updatedGrid[x][y] = {
                ...updatedGrid[x][y],
                hasFlag: false,
                hasQuestion: true
            };
            amount = 1;
            setFlagsPlaced((prev) => prev - 1);
        } else if (updatedGrid[x][y].hasQuestion) {
            updatedGrid[x][y] = {
                ...updatedGrid[x][y],
                hasQuestion: false
            };
        } else {
            if (flagsPlaced < gameMode.mines) {
                updatedGrid[x][y] = {
                    ...updatedGrid[x][y],
                    hasFlag: true
                };
                amount = -1;
                setFlagsPlaced((prev) => prev + 1);
            }
        }
        setGrid(updatedGrid);

        changeFlagAmount(amount);
    };

    if (!grid) {
        return <div className='loading'>Loading...</div>;
    }

    return (
        <div className='Board'>
            {grid.map((singleRow, rowIndex) => (
                <div key={rowIndex} className='row'>
                    {singleRow.map((singleBlock, blockIndex) => (
                        <Celula
                            key={blockIndex}
                            details={singleBlock}
                            position={{ x: rowIndex, y: blockIndex }}
                            onLeftClick={handleCellLeftClick}
                            onRightClick={handleCellRightClick}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

function createBoard(height, width, mines) {
    const board = Array(height).fill().map((_, row) => {
        return Array(width).fill().map((_, col) => ({
            content: ' ',
            x: row,
            y: col,
            isOpen: false,
            isBomb: false,
            hasFlag: false,
            bombsAdjacent: 0,
        }));
    });

    for (let i = 0; i < mines; i++) {
        let row, col;
        do {
            row = Math.floor(Math.random() * height);
            col = Math.floor(Math.random() * width);
        } while (board[row][col].isBomb === true);
        board[row][col].isBomb = true;
    }

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            if (!board[row][col].isBomb) {
                board[row][col].bombsAdjacent = countAdjacentBombs(row, col, board);
            }
        }
    }

    return board;
}

function countAdjacentBombs(row, col, board) {
    const directions = [
        { dx: -1, dy: -1 }, { dx: -1, dy: 0 }, { dx: -1, dy: 1 },
        { dx: 0, dy: -1 }, { dx: 0, dy: 1 },
        { dx: 1, dy: -1 }, { dx: 1, dy: 0 }, { dx: 1, dy: 1 }
    ];

    let count = 0;
    for (const direction of directions) {
        const newRow = row + direction.dx;
        const newCol = col + direction.dy;
        if (isValidCell(newRow, newCol, board.length, board[0].length) && board[newRow][newCol].isBomb) {
            count++;
        }
    }
    return count;
}

function isValidCell(row, col, height, width) {
    return row >= 0 && row < height && col >= 0 && col < width;
}
