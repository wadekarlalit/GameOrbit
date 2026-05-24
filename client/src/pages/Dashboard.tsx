import { useNavigate } from "react-router-dom";
import GameCard from "../components/GameCard";
import "../styles/dashboard.scss";
import { useState } from "react";
import GameModeModal from "../components/GameModeModal";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ticTacToe from "../assets/tic-tac-toe.png";
import chess from "../assets/chess.png";
import battleships from "../assets/battleships.png";
import connect4 from "../assets/connect4.png";
import checkers from "../assets/checkers.png";
import "../styles/global.scss";

function Dashboard() {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    function handleModeSelect(mode: string) {
        setShowModal(false);

        navigate(`/game/tic-tac-toe?mode=${mode}`)
    }
    console.log("showModal", showModal)
    return (
        <>
            <div className="layout">

                {/* ✅ Sidebar */}
                <div className="">
                    <Sidebar
                        isOpen={isSidebarOpen}
                        onClose={() => setIsSidebarOpen(false)}
                    />
                </div>

                {/* ✅ Main Content */}
                <div className="main">
                    <div className="">
                        <Header onMenuClick={() => setIsSidebarOpen(true)} />
                    </div>
                    <div className="content">

                        <h1>Play Games</h1>

                        <div className="games-grid">
                            <GameCard
                                title="Tic Tac Toe"
                                onClick={() => setShowModal(true)}
                                image={ticTacToe}
                            />
                        </div>

                    </div>
                    <div className="content">

                        <h1>Comming Soon</h1>

                        <div className="games-grid">
                            <GameCard title="Chess" onClick={() => { }} image={chess} />
                            <GameCard title="battleships" onClick={() => { }} image={battleships} />
                            <GameCard title="Connect 4" onClick={() => { }} image={connect4} />
                            <GameCard title="Checkers" onClick={() => { }} image={checkers} />
                        </div>

                    </div>
                </div>

            </div>

            {/* ✅ Modal (same as before) */}
            {showModal && (
                <GameModeModal
                    onSelectMode={handleModeSelect}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    )
}

export default Dashboard;