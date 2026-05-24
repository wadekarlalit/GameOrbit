import "../styles/playerCard.scss"

type Props = {
    name: string;
    avatar: string;
    score: number;
    active: boolean;
    totalTime: number;
    turnTime: number;
};

function PlayerCard({
    name,
    avatar,
    score,
    active,
    totalTime,
    turnTime,
}: Props) {

    return (

        <div className={`hud-player ${active ? "turn" : ""}`}>

            {/* TIMER RING */}
            <div
                className={`hud-avatar-wrapper
                ${active && turnTime <= 10 ? "danger" : ""}
                ${active && turnTime <= 20 && turnTime > 10 ? "warning" : ""}
            `}
            >

                <svg className="timer-ring">

                    <circle
                        className="ring-bg"
                        cx="40"
                        cy="40"
                        r="34"
                    />

                    <circle
                        className="ring-progress"
                        cx="40"
                        cy="40"
                        r="34"
                        style={{
                            strokeDashoffset:
                                active
                                    ? 213 - (213 * turnTime) / 30
                                    : 0
                        }}
                    />

                </svg>

                <div className="hud-avatar">
                    {avatar}
                </div>

            </div>

            {/* INFO */}
            <div className="hud-info">

                <h3>{name}</h3>

                <span>
                    {Math.floor(totalTime / 60)}:
                    {(totalTime % 60)
                        .toString()
                        .padStart(2, "0")}
                </span>

                <p>
                    Score: {score}
                </p>

            </div>

        </div>
    );
}

export default PlayerCard;