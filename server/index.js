const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

const games = {}; // roomId -> game state
let waitingPlayer = null;
const userSocketMap = {}; // userId -> socket.id
let onlineUsers = 0;

function checkWinner(board) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    for (let [a, b, c] of winPatterns) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    return null;
}

function isDraw(board) {
    return board.every(cell => cell !== null);
}


io.on("connection", (socket) => {
    onlineUsers++;

    io.emit("online-count", onlineUsers);

    socket.on("reconnect-game", ({ userId }) => {

        socket.userId = userId; // ✅ important

        let found = false; // ✅ ADD

        for (let roomId in games) {
            const game = games[roomId];

            if (game.players[userId]) {
                found = true;

                socket.join(roomId);

                userSocketMap[userId] = socket.id;

                socket.emit("reconnected", {
                    roomId,
                    player: game.players[userId].role, // ✅ role only
                    players: game.players,             // ✅ ADD THIS LINE
                });

                socket.emit("game-update", {
                    board: game.board,
                    currentPlayer: game.currentPlayer,
                    winner: game.winner,
                    isDraw: false,
                    score: game.score,
                });

                break;
            }
        }

        // 👇 VERY IMPORTANT
        if (!found) {
            socket.emit("no-game-found");
        }
    });

    // ✅ 1. matchmaking
    socket.on("find-match", ({ userId }) => {

        userSocketMap[userId] = socket.id;
        socket.userId = userId; // attach to socket

        if (waitingPlayer && waitingPlayer.id !== socket.id) {

            const roomId = waitingPlayer.id + "#" + socket.id;

            socket.join(roomId);
            waitingPlayer.join(roomId);

            // 🔥 STEP 1: assign players
            const players = {
                [waitingPlayer.userId]: { role: "X", name: waitingPlayer.userId },
                [userId]: { role: "O", name: userId },
            };

            // 🔥 STEP 2: create game state
            games[roomId] = {
                board: Array(9).fill(null),
                currentPlayer: "X",
                players,
                winner: null,
                score: { X: 0, O: 0, draw: 0 }, // ✅ ADD
            };

            // 🔥 STEP 3: send to client
            io.to(roomId).emit("start-game", {
                roomId,
                players,
            });

            waitingPlayer = null;

        } else {
            socket.userId = userId;
            waitingPlayer = socket;
        }
    });

    // ✅ 2. 🔥 YAHAN ADD KARO (make-move)
    socket.on("make-move", ({ roomId, index }) => {

        const game = games[roomId];
        if (!game) return;


        const player = game.players[socket.userId].role;
        if (!player) return;

        if (game.winner) return; // block moves after win

        if (player !== game.currentPlayer) {
            console.log("Invalid turn");
            return;
        }

        if (game.board[index]) return;

        // ✅ apply move
        game.board[index] = player;

        // 🧠 CHECK WINNER
        const winner = checkWinner(game.board);
        if (winner) {
            game.winner = winner;

            // ✅ UPDATE SCORE
            game.score[winner]++;

            io.to(roomId).emit("game-update", {
                board: game.board,
                currentPlayer: game.currentPlayer,
                winner,
                isDraw: false,
                score: game.score, // ✅ send
            });

            return;
        }

        // 🧠 CHECK DRAW
        if (isDraw(game.board)) {
            game.score.draw++;

            io.to(roomId).emit("game-update", {
                board: game.board,
                currentPlayer: game.currentPlayer,
                winner: null,
                isDraw: true,
                score: game.score,
            });

            return;
        }

        // 🔄 switch turn
        game.currentPlayer = player === "X" ? "O" : "X";

        io.to(roomId).emit("game-update", {
            board: game.board,
            currentPlayer: game.currentPlayer,
            winner: null,
            isDraw: false,
            score: game.score,
        });
    });

    // 🔄 RESTART GAME
    socket.on("restart-game", ({ roomId }) => {
        const game = games[roomId];
        if (!game) return;

        // reset state
        game.board = Array(9).fill(null);
        game.currentPlayer = "X";
        game.winner = null;

        io.to(roomId).emit("game-update", {
            board: game.board,
            currentPlayer: game.currentPlayer,
            winner: null,
            isDraw: false,
        });
    });

    socket.on("reset-score", ({ roomId }) => {
        const game = games[roomId];
        if (!game) return;

        game.score = { X: 0, O: 0, draw: 0 };

        io.to(roomId).emit("game-update", {
            board: game.board,
            currentPlayer: game.currentPlayer,
            winner: game.winner,
            isDraw: false,
            score: game.score,
        });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.userId);

        // ✅ GLOBAL: online users update
        onlineUsers--;
        io.emit("online-count", onlineUsers);

        // ✅ remove from waiting queue
        if (waitingPlayer?.id === socket.id) {
            waitingPlayer = null;
        }

        // 🔥 IMPORTANT: GAME CLEANUP + OPPONENT NOTIFY
        for (let roomId in games) {
            const game = games[roomId];

            if (game.players[socket.userId]) {
                console.log("Player left game:", roomId);

                // 👇 opponent ko notify karo
                socket.to(roomId).emit("opponent-left");

                // 👇 game delete karo (memory leak avoid)
                delete games[roomId];

                break;
            }
        }
    });

});

server.listen(5000, () => {
    console.log("Server running on port 5000")
})