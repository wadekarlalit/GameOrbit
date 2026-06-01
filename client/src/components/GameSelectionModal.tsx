import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { games, type Game } from "../data/games";
import "../styles/gameSelectionModal.scss";
// import { games, type Game } from "../../data/games";

type Props = {
    mode: "bot" | "friend" | "online";
    onClose: () => void;
};

function GameSelectionModal({
    mode,
    onClose,
}: Props) {

    const navigate = useNavigate();

    function handleSelect(game: Game) {

        if (game.status !== "active") {
            return;
        }

        onClose();

        navigate(
            `/game/${game.id}?mode=${mode}`
        );
    }

    return (
        <div
            className="game-select-overlay"
            onClick={onClose}
        >
            <div
                className="game-select-modal"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="modal-header">

                    <h2>
                        {
                            mode === "bot"
                                ? "🤖 Play with Robot"
                                : mode === "friend"
                                    ? "👥 Play with Friend"
                                    : "🌐 Play Online"
                        }
                    </h2>

                    <button onClick={onClose}>
                        <X />
                    </button>

                </div>

                <div className="modal-body">

                    <label>
                        Select Game
                    </label>

                    <div className="game-list">

                        {
                            games.map((game) => (
                                <button
                                    key={game.id}
                                    className={`game-item ${game.status !== "active"
                                        ? "disabled"
                                        : ""
                                        }`}
                                    onClick={() => handleSelect(game)}
                                >
                                    {game.name}

                                    {
                                        game.status !== "active" && (
                                            <span>
                                                Coming Soon
                                            </span>
                                        )
                                    }
                                </button>
                            ))
                        }
                    </div>

                </div>

            </div>
        </div>
    );
}

export default GameSelectionModal;