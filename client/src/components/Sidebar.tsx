import { Bell, Settings, Home, MessageCircle, Users, History, User, UserCircle, Image, LogOut } from "lucide-react";
import "../styles/sidebar.scss";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./AuthModal";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

function Sidebar({ isOpen, onClose }: Props) {

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { logout, login } = useAuth();

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showAuth, setShowAuth] = useState(false);
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
                                    <li onClick={onClose}><User /> My Account</li>
                                    <li onClick={onClose}><UserCircle /> My Profile</li>
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
                        <Settings />
                    </div>
                </div>

                {/* 🔹 Divider */}
                <div className="divider" />

                {/* 🔹 Main Menu */}
                <ul className="menu">
                    <li className="active" onClick={onClose}><Home /> Home</li>
                    <li onClick={onClose}><MessageCircle /> Messaging</li>
                    <li onClick={onClose}><Users /> Friends</li>
                    <li onClick={onClose}><History /> History</li>
                </ul>

                <div className="divider" />

                {/* 🔹 Play Section */}
                <div className="section">
                    <p className="section-title">Play online</p>
                    <ul>
                        <li onClick={onClose}>👥 Play with a friend</li>
                        <li onClick={onClose}>🤖 Play vs robot</li>
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
                        onClose={() => setShowAuth(false)}
                        onLogin={() => window.location.reload()}
                    />
                )
            }
        </>
    );
}

export default Sidebar;