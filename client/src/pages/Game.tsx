import { useSearchParams } from "react-router-dom";
import Board from "../components/Board";
import { useGame } from "../hooks/useGame";
import { useEffect, useState } from "react";
import { getRandomMove } from "../utils/bot";
import { getSocket } from "../socket";
import { useNavigate } from "react-router-dom";
import MatchResultModal from "../components/MatchResultModal";
import "../styles/game.scss";
import PlayerCard from "../components/PlayerCard";

type PlayerInfo = {
    role: "X" | "O";
    name: string;
};

type Players = {
    [key: string]: PlayerInfo;
};

function Game() {
    const [matchWinner, setMatchWinner] = useState<
        "win" | "lose" | "draw" | null
    >(null);
    const [matchVictory, setMatchVictory] = useState(false);
    const [roomId, setRoomId] = useState<string | null>(null);
    const { board, setBoard, winner, setWinner, currentPlayer, setCurrentPlayer, makeMove, isDrawGame, setIsDrawGame, score, setScore } = useGame();
    const [params] = useSearchParams();
    const mode = params.get("mode");
    const socket = getSocket();
    const [myPlayer, setMyPlayer] = useState<"X" | "O" | null>(null);
    const [popupText, setPopupText] = useState("");
    const [gameStarted, setGameStarted] = useState(false);
    const [players, setPlayers] = useState<Players | null>(null);

    // Timer
    const [turnTime, setTurnTime] = useState(30);
    // const [turnTime, setTurnTime] = useState(999);

    const [roundProcessed, setRoundProcessed] = useState(false);
    const navigate = useNavigate();
    const playerXName = players
        ? Object.values(players).find(p => p.role === "X")?.name
        : "";
    const playerOName = players
        ? Object.values(players).find(p => p.role === "O")?.name
        : "";
    
    // Timer
    const [gameTime, setGameTime] = useState({
        X: 120,
        O: 120,
    });
    // const [gameTime, setGameTime] = useState({
    //     X: 9999,
    //     O: 9999,
    // });

    useEffect(() => {
        if (mode !== "online") return;

        const user = localStorage.getItem("user");
        if (!user) return;

        const handleReconnected = ({ 
            roomId, player 
        }: {
            roomId: string;
            player: "X" | "O";
        }) => {
            setRoomId(roomId);
            setMyPlayer(player);
            setPlayers(players);
        };

        const handleNoGame = () => {
            socket.emit("find-match", { userId: user });
        };

        const handleStartGame = (data: any) => {
            setRoomId(data.roomId);
            setPlayers(data.players);
            if (!user) return;
            setMyPlayer(data.players[user].role);
        };

        socket.emit("reconnect-game", { userId: user });

        socket.on("reconnected", handleReconnected);
        socket.on("no-game-found", handleNoGame);
        socket.on("start-game", handleStartGame);

        return () => {
            socket.off("reconnected", handleReconnected);
            socket.off("no-game-found", handleNoGame);
            socket.off("start-game", handleStartGame);
        };
    }, [mode]);


    useEffect(() => {
        socket.on("game-update", ({ board, currentPlayer, winner, isDraw, score }) => {
            setBoard(board);
            setCurrentPlayer(currentPlayer);

            setWinner(winner || null);
            setIsDrawGame(isDraw || false);

            if (score) setScore(score); // ✅ ADD
        });

        return () => {
            socket.off("game-update");
        };
    }, []);

    console.log("ROOM:", roomId);

    function handleMove(index: number) {

        if (winner || isDrawGame) return;

        // ❌ Wrong turn → block (UI level safety)
        if (mode === "online" && myPlayer && currentPlayer !== myPlayer) {
            console.log("Not your turn");
            return;
        }

        // ✅ reset turn timer
        setTurnTime(30);

        if (mode === "online") {
            if (!roomId) {
                console.log("No room yet");
                return;
            }

            console.log("Sending move:", index);

            // ✅ ONLY send to server
            socket.emit("make-move", {
                roomId,
                index,
            });

        } else {
            // offline/bot mode
            makeMove(index);
        }
    }

    useEffect(() => {
        if (mode === "bot" && currentPlayer === "O" && !winner) {
            const emptyCells = board.filter((cell) => cell === null);

            if (emptyCells.length === 0) return;

            const timeout = setTimeout(() => {
                const move = getRandomMove(board);
                makeMove(move);
            }, 500);

            return () => clearTimeout(timeout);
        }
    }, [board, currentPlayer, mode, winner]);

    useEffect(() => {
        const handleOpponentLeft = () => {
            alert("Opponent left the game 😢");
            setRoomId(null);
        };

        socket.on("opponent-left", handleOpponentLeft);

        return () => {
            socket.off("opponent-left", handleOpponentLeft);
        };
    }, []);

    useEffect(() => {

        // already shown once
        if (gameStarted) return;

        // wait until player assigned in online mode
        if (mode === "online" && !myPlayer) return;

        // wait until room ready in online mode
        if (mode === "online" && !roomId) return;

        // currentPlayer ready
        if (!currentPlayer) return;

        const timeout = setTimeout(() => {

            // ONLINE MODE
            if (mode === "online") {

                if (currentPlayer === myPlayer) {
                    setPopupText("YOUR TURN");
                } else {
                    setPopupText("GAME STARTED");
                }

            }

            // BOT / FRIEND MODE
            else {

                // X always starts
                if (currentPlayer === "X") {
                    setPopupText("YOUR TURN");
                } else {
                    setPopupText("GAME STARTED");
                }
            }

            setGameStarted(true);

            setTimeout(() => {
                setPopupText("");
            }, 2000);

        }, 500);

        return () => clearTimeout(timeout);

    }, [
        roomId,
        myPlayer,
        currentPlayer,
        gameStarted,
        mode,
    ]);

    if (mode === "online" && !roomId) {
        return (
            <div>
                <h2>Finding opponent...</h2>
                <p>Please wait ⏳</p>
            </div>
        );
    }

    function resetMatch() {

        const isMatchFinished =
            score.X >= 2 || score.O >= 2;

        setBoard(Array(9).fill(null));

        setWinner(null);

        setIsDrawGame(false);

        setCurrentPlayer("X");

        setMatchWinner(null);

        setMatchVictory(false);

        setTurnTime(30);
        // setTurnTime(999);

        setRoundProcessed(false);

        // Timer
        setGameTime({
            X: 120,
            O: 120,
        });
        // setGameTime({
        //     X: 9999,
        //     O: 9999,
        // });

        setPopupText("");

        // ✅ ONLY reset after BO3 completed
        if (isMatchFinished) {

            setScore({
                X: 0,
                O: 0,
                draw: 0,
            });
        }
    }

    useEffect(() => {

        if (winner || isDrawGame) return;

        const interval = setInterval(() => {

            // ================= TOTAL TIMER =================
            setGameTime(prev => {

                const updated = {
                    ...prev,
                    [currentPlayer]:
                        prev[currentPlayer] - 1,
                };

                const currentTime =
                    updated[currentPlayer];

                // TOTAL TIME END
                if (currentTime <= 0 && !winner) {

                    const nextPlayer =
                        currentPlayer === "X"
                            ? "O"
                            : "X";

                    setWinner(nextPlayer);

                    return updated;
                }

                return updated;
            });

            // ================= TURN TIMER =================
            setTurnTime(prev => {

                const updatedTime = prev - 1;

                // TURN TIME END
                if (updatedTime <= 0 && !winner) {

                    const nextPlayer =
                        currentPlayer === "X"
                            ? "O"
                            : "X";

                    setWinner(nextPlayer);

                    return 0;
                }

                return updatedTime;
            });

        }, 1000);

        return () => clearInterval(interval);

    }, [
        currentPlayer,
        winner,
        isDrawGame
    ]);

    useEffect(() => {

        // nothing finished
        if (!winner && !isDrawGame) return;

        // already processed
        if (roundProcessed) {
            console.log("⛔ already processed");
            return;
        }

        console.log("🔥 RESULT EFFECT RUN");

        setRoundProcessed(true);

        // ================= DRAW =================
        if (isDrawGame) {

            console.log("🤝 DRAW");

            setMatchWinner("draw");

            return;
        }

        console.log("🏆 WINNER:", winner);

        console.log("📈 CURRENT SCORE:", score);

        // ================= USER WON =================
        const userWon =
            mode === "online"
                ? winner === myPlayer
                : winner === "X";

        console.log("🎯 USER WON:", userWon);

        // ================= RESULT =================
        setMatchWinner(
            userWon
                ? "win"
                : "lose"
        );

        // ================= BEST OF 3 =================
        const totalWins =
            winner === "X"
                ? score.X
                : score.O;

        console.log("🥇 TOTAL WINS:", totalWins);

        // only after 2 wins
        if (totalWins >= 2) {

            if (userWon) {

                console.log("🎉 MATCH VICTORY");

                setMatchVictory(true);

            } else {

                console.log("💀 MATCH LOST");
            }
        }

    }, [
        winner,
        isDrawGame
    ]);

    return (

        <>
            {/* ================= POPUP ================= */}
            {
                popupText && (
                    <div className="game-popup">
                        {popupText}
                    </div>
                )
            }

            {/* ================= MAIN LAYOUT ================= */}
            <div className="game-layout">

                {/* ================================================= */}
                {/* LEFT PANEL */}
                {/* ================================================= */}
                <div className="left-panel">

                    <div className="online-header">
                        ONLINE PLAYERS
                    </div>

                    <div className="online-users-list">

                        <div className="online-user active">

                            <div className="online-avatar">
                                👤
                            </div>

                            <div className="online-user-info">
                                <h4>You</h4>
                                <p>Level 1</p>
                            </div>

                        </div>

                        <div className="online-user">

                            <div className="online-avatar">
                                😎
                            </div>

                            <div className="online-user-info">
                                <h4>{playerXName || "Player X"}</h4>
                                <p>Online</p>
                            </div>

                        </div>

                        <div className="online-user">

                            <div className="online-avatar">
                                🤖
                            </div>

                            <div className="online-user-info">
                                <h4>{playerOName || "Player O"}</h4>
                                <p>{mode === "bot" ? "BOT" : "Online"}</p>
                            </div>

                        </div>

                    </div>

                </div>

                {/* ================================================= */}
                {/* CENTER GAME AREA */}
                {/* ================================================= */}
                <div className="game-center-layout">

                    {/* ================= TOP HUD ================= */}
                    <div className="top-hud">

                        {/* PLAYER X */}
                        <PlayerCard
                            name={playerXName || "Player X"}
                            avatar="❌"
                            score={score.X}
                            active={currentPlayer === "X"}
                            totalTime={gameTime.X}
                            turnTime={turnTime}
                        />

                        {/* ================= SCORE ================= */}
                        <div className="match-score">

                            <span>{score.X}</span>

                            <p>VS</p>

                            <span>{score.O}</span>

                        </div>

                        {/* PLAYER O */}
                        <PlayerCard
                            name={playerOName || "Player O"}
                            avatar="⭕"
                            score={score.O}
                            active={currentPlayer === "O"}
                            totalTime={gameTime.O}
                            turnTime={turnTime}
                        />

                    </div>

                    {/* ================= BOARD ================= */}
                    <div className="game-board-container">

                        <Board
                            board={board}
                            onCellClick={handleMove}
                            currentPlayer={currentPlayer}
                        />

                    </div>

                    {/* ================= BOTTOM BAR ================= */}
                    <div className="bottom-bar">

                        <button className="abort-btn" onClick={() => navigate("/dashboard")}>
                            Abort Game
                        </button>

                        <button className="setting-btn">
                            ⚙
                        </button>

                    </div>

                </div>

                {/* ================================================= */}
                {/* RIGHT CHAT PANEL */}
                {/* ================================================= */}
                {
                    mode !== "bot" && (
                        <div className="chat-panel">

                            <div className="chat-header">
                                MATCH CHAT
                            </div>

                            <div className="chat-messages">

                                <div className="message mine">
                                    Nice move 🔥
                                </div>

                                <div className="message">
                                    Thanks 😄
                                </div>

                            </div>

                            <div className="chat-input">

                                <input
                                    placeholder="Write a message..."
                                />

                                <button>
                                    ➤
                                </button>

                            </div>

                        </div>
                    )
                }

            </div>

            {/* ================= RESULT MODAL ================= */}
            {
                matchWinner && (
                    <MatchResultModal

                        result={matchWinner}

                        victory={matchVictory}

                        level={2}

                        coins={
                            matchVictory
                                ? 50
                                : 0
                        }

                        onPlayAgain={resetMatch}

                        onLeave={() => navigate("/dashboard")}
                    />
                )
            }

        </>
    );
}

export default Game;