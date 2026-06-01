import { Bell, Settings, Home, MessageCircle, Users, History, User, UserCircle, Image, LogOut } from "lucide-react";
import "../styles/sidebar.scss";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";
import { useLocation, useNavigate } from "react-router-dom";
import GameSelectionModal from "./GameSelectionModal";
import SettingsModal from "./SettingsModal";
import LoginRequiredModal from "./LoginRequiredModal";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

function Sidebar({ isOpen, onClose }: Props) {

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { logout, login } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showAuth, setShowAuth] = useState(false);
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const [showGameSelector, setShowGameSelector] = useState(false);
    const [selectedMode, setSelectedMode] = useState<"bot" | "friend" | "online">("bot");
    const [showSettings, setShowSettings] = useState(false);

    const [showLoginRequired, setShowLoginRequired] = useState(false);
    const [pendingRoute, setPendingRoute] = useState<string | null>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function handleProtectedNavigation(route: string) {

        if (!user) {

            setPendingRoute(route);

            setShowLoginRequired(true);

            return;
        }

        onClose();

        navigate(route);
    }

    function handleProtectedGameMode(
        mode: "bot" | "friend" | "online"
    ) {

        if (!user) {

            setPendingRoute("game-selector");

            setSelectedMode(mode);

            setShowLoginRequired(true);

            return;
        }

        setSelectedMode(mode);

        setShowGameSelector(true);
    }

    console.log("storedUser:", storedUser);
    console.log("type:", typeof storedUser);

    return (
        <>
            {isOpen && <div className="overlay" onClick={onClose}></div>}

            <div className={`sidebar ${isOpen ? "open" : ""}`}>

                <div className="sidebar-top">

                    {user ? (

                        // ✅ Logged In UI
                        <div className="profile" ref={dropdownRef}>

                            <div className="avatar">😎</div>

                            <div
                                className="user-info clickable"
                                onClick={() => setOpen(prev => !prev)}
                            >
                                <h3>{user.name}</h3>
                                <p>3410 💰</p>
                            </div>

                            <div className={`dropdown ${open ? "show" : ""}`}>
                                <ul>
                                    <li onClick={() => {
                                        onClose();
                                        navigate("/my-account");
                                    }}><User /> My Account</li>
                                    <li onClick={() => {
                                        onClose();
                                        navigate("/my-profile");
                                    }}><UserCircle /> My Profile</li>
                                    {/* <li onClick={onClose}><UserCircle /> My Profile</li> */}
                                    <li onClick={onClose}><Image /> Change Avatar</li>

                                    <li
                                        className="danger"
                                        onClick={() => {
                                            logout();
                                            onClose();
                                        }}
                                    >
                                        <LogOut /> Log Out
                                    </li>
                                </ul>
                            </div>
                        </div>

                    ) : (

                        // ✅ NOT LOGGED IN UI
                        <button
                            className="login-btn"
                            onClick={() => setShowAuth(true)}
                        >
                            Login
                        </button>
                    )}

                    <div className="icons">
                        <Bell />
                        <Settings onClick={() =>
                            setShowSettings(true)
                        } />
                    </div>
                </div>

                {/* 🔹 Divider */}
                <div className="divider" />

                {/* 🔹 Main Menu */}
                <ul className="menu">
                    <li className={location.pathname === "/dashboard" ? "active" : ""}
                        onClick={() => {
                            onClose();
                            navigate("/dashboard");
                        }}>
                        <Home />
                        Home
                    </li>

                    <li className={location.pathname === "/chat" ? "active" : ""}
                        onClick={() => {
                            handleProtectedNavigation("/chat")
                            // onClose();
                            // navigate("/chat")
                        }}>
                        <MessageCircle />
                        Messaging
                    </li>

                    <li className={location.pathname === "/friends" ? "active" : ""}
                        onClick={() => {
                            handleProtectedNavigation("/friends")
                            // onClose();
                            // navigate("/friends")
                        }}>
                        <Users />
                        Friends
                    </li>

                    <li className={location.pathname === "/history" ? "active" : ""}
                        onClick={() => {
                            handleProtectedNavigation("/history")
                            // onClose();
                            // navigate("/history")
                        }}>
                        <History />
                        History
                    </li>

                    {/* <li onClick={onClose}><History /> History</li> */}
                </ul>

                <div className="divider" />

                {/* 🔹 Play Section */}
                <div className="section">
                    <p className="section-title">Play online</p>
                    <ul>
                        <li
                            onClick={() => {
                                // setSelectedMode("bot");
                                // setShowGameSelector(true);
                                handleProtectedGameMode("bot")
                            }}
                        >
                            🤖 Play with robot
                        </li>

                        <li
                            onClick={() => {
                                // setSelectedMode("friend");
                                // setShowGameSelector(true);
                                handleProtectedGameMode("friend")
                            }}
                        >
                            👥 Play with a friend
                        </li>

                        <li
                            onClick={() => {
                                // setSelectedMode("online");
                                // setShowGameSelector(true);
                                handleProtectedGameMode("online")
                            }}
                        >
                            🌐 Play Online
                        </li>
                    </ul>
                </div>

                <div className="divider" />

                {/* 🔹 Games Section */}
                <div className="section">
                    <p className="section-title">Games</p>
                    <ul>
                        <li onClick={onClose}>Tic Tac Toe</li>
                        <li onClick={onClose}>Battleship</li>
                        <li onClick={onClose}>Connect 4</li>
                        <li onClick={onClose}>Gomoku</li>
                        <li onClick={onClose}>Chess</li>
                        <li onClick={onClose}>Checkers</li>
                        <li onClick={onClose}>Game guides</li>
                    </ul>
                </div>

            </div>

            {
                showLoginModal && (
                    <div
                        className="login-modal-overlay"
                        onClick={() => setShowLoginModal(false)}
                    >
                        <div
                            className="login-modal"
                            onClick={(e) => e.stopPropagation()}
                        >

                            <button
                                className="close-btn"
                                onClick={() => setShowLoginModal(false)}
                            >
                                ✕
                            </button>

                            <h1>Welcome Back!</h1>

                            <p className="sub-text">
                                Login to continue playing
                            </p>

                            <input
                                type="text"
                                placeholder="Enter username"
                                className="login-input"
                                id="guest-name"
                            />

                            <button
                                className="main-login-btn"
                                onClick={() => {
                                    const input =
                                        document.getElementById("guest-name") as HTMLInputElement;

                                    if (!input.value.trim()) return;

                                    const user: any = {
                                        name: input.value.trim(),
                                        email: null,
                                        coins: 1000,
                                        avatar: "👤",
                                    };

                                    localStorage.setItem(
                                        "user",
                                        JSON.stringify(user)
                                    );

                                    login(user);

                                    setShowLoginModal(false);
                                }}
                            >
                                Login
                            </button>

                            <div className="divider-text">
                                OR
                            </div>

                            <button
                                className="guest-btn"
                                onClick={() => {

                                    const guestName =
                                        "Guest_" +
                                        Math.floor(Math.random() * 10000);

                                    const guestUser: any = {
                                        name: guestName,
                                        email: null,
                                        coins: 1000,
                                        avatar: "👤",
                                    };

                                    localStorage.setItem(
                                        "user",
                                        JSON.stringify(guestUser)
                                    );

                                    login(guestUser);

                                    setShowLoginModal(false);
                                }}
                            >
                                Continue as Guest
                            </button>

                            <button className="google-btn">
                                Continue with Google
                            </button>

                        </div>
                    </div>
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

                            if (pendingRoute === "game-selector") {

                                setShowGameSelector(true);

                                setPendingRoute(null);

                                return;
                            }

                            if (pendingRoute) {

                                navigate(pendingRoute);

                                setPendingRoute(null);
                            }
                        }}
                    />
                )
            }

            {
                showGameSelector && (
                    <GameSelectionModal
                        mode={selectedMode}
                        onClose={() =>
                            setShowGameSelector(false)
                        }
                    />
                )
            }

            {
                showSettings && (
                    <SettingsModal
                        onClose={() =>
                            setShowSettings(false)
                        }
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
        </>
    );
}

export default Sidebar;