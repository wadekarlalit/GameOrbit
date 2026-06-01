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
import SettingsModal from "../components/SettingsModal";
import AuthModal from "../components/AuthModal";
import LoginRequiredModal from "../components/LoginRequiredModal";

function Dashboard() {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showLoginRequired, setShowLoginRequired] = useState(false);
    const [showAuth, setShowAuth] = useState(false);
    const [pendingAction, setPendingAction] = useState<string | null>(null);

    function handleModeSelect(mode: string) {
        setShowModal(false);
        navigate(`/game/tic-tac-toe?mode=${mode}`)
    }

    function handleGameCardClick() {

        const storedUser =
            localStorage.getItem("user");

        if (!storedUser) {

            setPendingAction("open-game-mode");

            setShowLoginRequired(true);

            return;
        }

        setShowModal(true);
    }
    // console.log("showModal", showModal)

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
                        <Header onMenuClick={() => setIsSidebarOpen(true)} onSettingsClick={() => setShowSettings(true)} />
                    </div>
                    <div className="content">

                        <h1>Play Games</h1>

                        <div className="games-grid">
                            <GameCard
                                title="Tic Tac Toe"
                                image={ticTacToe}
                                // onClick={() => setShowModal(true)}
                                onClick={handleGameCardClick}
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

            {
                showSettings && (
                    <SettingsModal
                        onClose={() => setShowSettings(false)}
                    />
                )
            }

            {
                showLoginRequired && (

                    <LoginRequiredModal

                        onClose={() =>
                            setShowLoginRequired(false)
                        }

                        onLogin={() => {

                            setShowLoginRequired(false);

                            setShowAuth(true);
                        }}
                    />
                )
            }

            {
                showAuth && (

                    <AuthModal
                        type="login"

                        onClose={() =>
                            setShowAuth(false)
                        }

                        onLogin={() => {

                            setShowAuth(false);

                            if (
                                pendingAction ===
                                "open-game-mode"
                            ) {

                                setShowModal(true);

                                setPendingAction(null);

                                return;
                            }
                        }}
                    />
                )
            }
        </>
    )
}

export default Dashboard;