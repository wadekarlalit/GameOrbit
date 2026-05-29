import "../styles/history.scss";

import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function History() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // document.title = "hhhhhhhhhh";
    // ================= DUMMY DATA =================
    // Later DB se ye data aa jayega
    const historyData = [
        {
            id: 1,
            user: {
                name: "lala1",
                rating: 1500,
                flag: "🇮🇳"
            },
            opponent: {
                name: "Paper Man",
                rating: 1112
            },
            userScore: 1,
            opponentScore: 0,
            game: "Tic Tac Toe",
            createdAt: "May 26, 2026, 7:56:22 PM"
        },

        {
            id: 2,
            user: {
                name: "lala2",
                rating: 1500,
                flag: "🇮🇳"
            },
            opponent: {
                name: "Paper Man",
                rating: 1112
            },
            userScore: 1,
            opponentScore: 0,
            game: "Tic Tac Toe",
            createdAt: "May 26, 2026, 7:55:44 PM"
        },

        {
            id: 3,
            user: {
                name: "lala3",
                rating: 1500,
                flag: "🇮🇳"
            },
            opponent: {
                name: "Paper Man",
                rating: 1112
            },
            userScore: 1,
            opponentScore: 0,
            game: "Tic Tac Toe",
            createdAt: "May 26, 2026, 7:55:12 PM"
        },

        {
            id: 4,
            user: {
                name: "lala4",
                rating: 1500,
                flag: "🇮🇳"
            },
            opponent: {
                name: "Paper Man",
                rating: 1680
            },
            userScore: 0,
            opponentScore: 1,
            game: "Battleship",
            createdAt: "May 26, 2026, 7:47:45 PM"
        },
        {
            id: 5,
            user: {
                name: "lala5",
                rating: 1500,
                flag: "🇮🇳"
            },
            opponent: {
                name: "Paper Man",
                rating: 1680
            },
            userScore: 0,
            opponentScore: 1,
            game: "Battleship",
            createdAt: "May 26, 2026, 7:47:45 PM"
        },
        {
            id: 6,
            user: {
                name: "lala6",
                rating: 1500,
                flag: "🇮🇳"
            },
            opponent: {
                name: "Paper Man",
                rating: 1680
            },
            userScore: 0,
            opponentScore: 1,
            game: "Battleship",
            createdAt: "May 26, 2026, 7:47:45 PM"
        },
        {
            id: 7,
            user: {
                name: "lala7",
                rating: 1500,
                flag: "🇮🇳"
            },
            opponent: {
                name: "Paper Man",
                rating: 1680
            },
            userScore: 0,
            opponentScore: 1,
            game: "Battleship",
            createdAt: "May 26, 2026, 7:47:45 PM"
        },
        {
            id: 8,
            user: {
                name: "lala8",
                rating: 1500,
                flag: "🇮🇳"
            },
            opponent: {
                name: "Paper Man",
                rating: 1680
            },
            userScore: 0,
            opponentScore: 1,
            game: "Battleship",
            createdAt: "May 26, 2026, 7:47:45 PM"
        },
        {
            id: 9,
            user: {
                name: "lala9",
                rating: 1500,
                flag: "🇮🇳"
            },
            opponent: {
                name: "Paper Man",
                rating: 1680
            },
            userScore: 0,
            opponentScore: 1,
            game: "Battleship",
            createdAt: "May 26, 2026, 7:47:45 PM"
        },
        {
            id: 10,
            user: {
                name: "lala10",
                rating: 1500,
                flag: "🇮🇳"
            },
            opponent: {
                name: "Paper Man",
                rating: 1680
            },
            userScore: 0,
            opponentScore: 1,
            game: "Battleship",
            createdAt: "May 26, 2026, 7:47:45 PM"
        },
        {
            id: 11,
            user: {
                name: "lala11",
                rating: 1500,
                flag: "🇮🇳"
            },
            opponent: {
                name: "Paper Man",
                rating: 1680
            },
            userScore: 0,
            opponentScore: 1,
            game: "Battleship",
            createdAt: "May 26, 2026, 7:47:45 PM"
        },
        {
            id: 12,
            user: {
                name: "lala12",
                rating: 1500,
                flag: "🇮🇳"
            },
            opponent: {
                name: "Paper Man",
                rating: 1680
            },
            userScore: 0,
            opponentScore: 1,
            game: "Battleship",
            createdAt: "May 26, 2026, 7:47:45 PM"
        },
        {
            id: 13,
            user: {
                name: "lala13",
                rating: 1500,
                flag: "🇮🇳"
            },
            opponent: {
                name: "Paper Man",
                rating: 1680
            },
            userScore: 0,
            opponentScore: 1,
            game: "Battleship",
            createdAt: "May 26, 2026, 7:47:45 PM"
        },
        {
            id: 14,
            user: {
                name: "lala14",
                rating: 1500,
                flag: "🇮🇳"
            },
            opponent: {
                name: "Paper Man",
                rating: 1680
            },
            userScore: 0,
            opponentScore: 1,
            game: "Battleship",
            createdAt: "May 26, 2026, 7:47:45 PM"
        },
        {
            id: 15,
            user: {
                name: "lala15",
                rating: 1500,
                flag: "🇮🇳"
            },
            opponent: {
                name: "Paper Man",
                rating: 1680
            },
            userScore: 0,
            opponentScore: 1,
            game: "Battleship",
            createdAt: "May 26, 2026, 7:47:45 PM"
        }
    ];

    // pagination logic
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    // const itemsPerPage = 5;
    const totalItems = historyData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = historyData.slice(startIndex, endIndex);

    return (

        <div className="layout">

            {/* ================= SIDEBAR ================= */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* ================= MAIN ================= */}
            <div className="main">

                {/* MOBILE HEADER */}
                <Header
                    onMenuClick={() => setIsSidebarOpen(true)}
                />

                {/* ================= PAGE ================= */}
                <div className="history-page">

                    <h1 className="history-title">
                        History
                    </h1>

                    {/* ================= TABLE ================= */}
                    <div className="history-table-wrapper">

                        <table className="history-table">

                            <thead>

                                <tr>
                                    <th>Players</th>
                                    <th>Result</th>
                                    <th>Game</th>
                                    <th>Date</th>
                                </tr>

                            </thead>

                            <tbody>

                                {
                                    currentItems.map((match) => (

                                        <tr key={match.id}>

                                            {/* PLAYERS */}
                                            <td>

                                                <div className="players-column">

                                                    <div className="player-row">

                                                        <span className="player-name">
                                                            {match.user.name}
                                                        </span>

                                                        <span className="rating">
                                                            ({match.user.rating})
                                                        </span>

                                                        <span className="flag">
                                                            {match.user.flag}
                                                        </span>

                                                    </div>

                                                    <div className="player-row opponent">

                                                        <span className="player-name">
                                                            {match.opponent.name}
                                                        </span>

                                                        <span className="rating">
                                                            ({match.opponent.rating})
                                                        </span>

                                                    </div>

                                                </div>

                                            </td>

                                            {/* RESULT */}
                                            <td>

                                                <div className="result-column">

                                                    <div className="score-box winner">
                                                        {match.userScore}
                                                    </div>

                                                    <div className="score-box loser">
                                                        {match.opponentScore}
                                                    </div>

                                                </div>

                                            </td>

                                            {/* GAME */}
                                            <td>

                                                <span className="game-name">
                                                    {match.game}
                                                </span>

                                            </td>

                                            {/* DATE */}
                                            <td>

                                                <span className="date-text">
                                                    {match.createdAt}
                                                </span>

                                            </td>

                                        </tr>
                                    ))
                                }

                            </tbody>

                        </table>

                        {/* ================= PAGINATION ================= */}
                        <div className="pagination">

                            {/* LEFT */}
                            <div className="page-size">

                                <span>
                                    Items per page:
                                </span>

                                <select defaultValue={5}>

                                    <option value={5} onClick={() =>
                                        setItemsPerPage(5)
                                    }>5</option>

                                    <option value={10} onClick={() =>
                                        setItemsPerPage(10)
                                    }>10</option>

                                    <option value={20}>20</option>

                                    <option value={30}>50</option>

                                </select>
                            </div>

                            {/* CENTER */}
                            <div className="page-info">
                                {startIndex + 1}
                                {"-"}
                                {Math.min(endIndex, totalItems)}
                                {"of"}
                                {totalItems}
                            </div>

                            {/* RIGHT */}
                            <div className="page-buttons">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() =>
                                        setCurrentPage(prev => prev - 1)
                                    }
                                >
                                    ❮
                                </button>

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() =>
                                        setCurrentPage(prev => prev + 1)
                                    }
                                >
                                    ❯
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default History;
