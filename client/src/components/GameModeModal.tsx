import {
    Bot,
    Users,
    Globe,
    X,
} from "lucide-react";

import "../styles/gameModeModal.scss";

interface Props {
    onSelectMode: (mode: string) => void;
    onClose: () => void;
}

function GameModeModal({
    onSelectMode,
    onClose,
}: Props) {

    return (
        <div className="mode-overlay">

            <div className="mode-modal">

                {/* HEADER */}
                <div className="mode-header">

                    <h2>Select Game Mode</h2>

                    <button onClick={onClose}>
                        <X size={28} />
                    </button>
                </div>

                {/* BODY */}
                <div className="mode-body">

                    <button
                        className="mode-card bot"
                        onClick={() => onSelectMode("bot")}
                    >
                        <div className="icon">
                            <Bot size={32} />
                        </div>

                        <div className="content">
                            <h3>Play with Bot</h3>
                            <p>Practice against AI</p>
                        </div>
                    </button>

                    <button
                        className="mode-card friend"
                        onClick={() => onSelectMode("friend")}
                    >
                        <div className="icon">
                            <Users size={32} />
                        </div>

                        <div className="content">
                            <h3>Play with Friend</h3>
                            <p>Create private room</p>
                        </div>
                    </button>

                    <button
                        className="mode-card online"
                        onClick={() => onSelectMode("online")}
                    >
                        <div className="icon">
                            <Globe size={32} />
                        </div>

                        <div className="content">
                            <h3>Play Online</h3>
                            <p>Find random opponent</p>
                        </div>
                    </button>

                </div>

            </div>

        </div>
    );
}

export default GameModeModal;