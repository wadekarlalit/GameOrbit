import "../styles/matchResultModal.scss";
import { useEffect, useState } from "react";

type Props = {
    result: "win" | "lose" | "draw";
    victory: boolean;
    level: number;
    coins: number;
    onPlayAgain: () => void;
    onLeave: () => void;
};

function MatchResultModal({
    result,
    victory,
    level,
    coins,
    onPlayAgain,
    onLeave,
}: Props) {

    const [countdown, setCountdown] = useState(15);
    const [progress, setProgress] = useState(0);

    // ✅ countdown timer
    useEffect(() => {

        const timer = setInterval(() => {

            setCountdown(prev => {

                if (prev <= 1) {

                    clearInterval(timer);

                    onLeave();

                    return 0;
                }

                return prev - 1;
            });

        }, 1000);

        return () => clearInterval(timer);

    }, []);

    // ✅ level progress animation
    useEffect(() => {

        const interval = setInterval(() => {

            setProgress(prev => {

                if (prev >= 75) {

                    clearInterval(interval);

                    return 75;
                }

                return prev + 1;
            });

        }, 20);

        return () => clearInterval(interval);

    }, []);

    return (

        <div className="result-overlay">

            <div className="result-modal">

                {/* ================= RESULT ================= */}
                <h1
                    className={`
                        victory-text
                        ${result === "win" ? "win" : ""}
                        ${result === "lose" ? "lose" : ""}
                        ${result === "draw" ? "draw" : ""}
                    `}
                >

                    {
                        result === "win"
                            ? "🎉 YOU WON 🎉"
                            : result === "lose"
                                ? "😢 YOU LOST"
                                : "🤝 DRAW"
                    }

                </h1>

                {/* ================= SUB TEXT ================= */}
                <p className="winner-name">

                    {
                        result === "win"
                            ? "Amazing Performance!"
                            : result === "lose"
                                ? "Better Luck Next Time"
                                : "Nobody Won This Match"
                    }

                </p>

                {/* ================= MATCH VICTORY ================= */}
                {
                    victory && (

                        <div className="victory-box">

                            <h2 className="victory-title">
                                🏆 VICTORY 🏆
                            </h2>

                            {/* LEVEL */}
                            <div className="level-section">

                                <div className="level-header">

                                    <span>LEVEL</span>

                                    <span>{level}</span>

                                </div>

                                <div className="xp-bar">

                                    <div
                                        className="xp-fill"
                                        style={{
                                            width: `${progress}%`
                                        }}
                                    />

                                    <div
                                        className="xp-circle"
                                        style={{
                                            left: `calc(${progress}% - 18px)`
                                        }}
                                    >
                                        {level}
                                    </div>

                                </div>

                            </div>

                            {/* COINS */}
                            <div className="coins-reward">
                                +{coins} Coins
                            </div>

                        </div>
                    )
                }

                {/* ================= BUTTONS ================= */}
                <div className="result-buttons">

                    <button
                        className="play-btn"
                        onClick={onPlayAgain}
                    >
                        Play Again
                    </button>

                    <button
                        className="leave-btn"
                        onClick={onLeave}
                    >
                        Leave Room ({countdown})
                    </button>

                </div>

            </div>

        </div>
    );
}

export default MatchResultModal;