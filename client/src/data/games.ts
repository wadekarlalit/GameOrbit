import ticTacToe from "../assets/tic-tac-toe.png";
import chess from "../assets/chess.png";
import battleships from "../assets/battleships.png";
import connect4 from "../assets/connect4.png";
import checkers from "../assets/checkers.png";

// MyAccount.tsx
export type Game = {
    id: string;
    name: string;
    image: string;
    status: "active" | "coming-soon";
};

export const games: Game[] = [
    {
        id: "tic-tac-toe",
        name: "Tic Tac Toe",
        image: ticTacToe,
        status: "active",
    },
    {
        id: "chess",
        name: "Chess",
        image: chess,
        status: "coming-soon",
    },
    {
        id: "battleships",
        name: "Battleships",
        image: battleships,
        status: "coming-soon",
    },
    {
        id: "connect-4",
        name: "Connect 4",
        image: connect4,
        status: "coming-soon",
    },
    {
        id: "checkers",
        name: "Checkers",
        image: checkers,
        status: "coming-soon",
    },
];

// MyProfile.tsx
export const profileData = {
    displayName: "Lalit",
    userId: "USR_123456",

    games: [
        {
            id: "tic-tac-toe",
            name: "Tic Tac Toe",
            level: 2,
            wins: 12,
            losses: 4,
            draws: 3,
            played: true,
        },
        {
            id: "chess",
            name: "Chess",
            played: false,
        },
        {
            id: "battleships",
            name: "Battleships",
            played: false,
        },
        {
            id: "connect-4",
            name: "Connect 4",
            played: false,
        },
        {
            id: "checkers",
            name: "Checkers",
            played: false,
        },
    ],
};