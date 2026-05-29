import "../styles/friends.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import {
    MoreVertical,
    MessageCircle,
    Sword,
    ShieldBan,
    Flag,
    Copy,
    History
} from "lucide-react";

function Friends() {

    const navigate = useNavigate();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const friends = [
        {
            id: 1,
            name: "Hana",
            avatar: "🐶",
            lastSeen: "22 hours ago",
            flag: ""
        },
        {
            id: 2,
            name: "Rahul",
            avatar: "👻",
            lastSeen: "1 day ago",
            flag: ""
        },
        {
            id: 3,
            name: "natasha",
            avatar: "👾",
            lastSeen: "1 day ago",
            flag: ""
        }
    ];

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

                <div className="friends-page">

                    {/* TOP NOTICE */}
                    <div className="pending-box">
                        No pending invitations.
                    </div>

                    {/* FRIENDS CARD */}
                    <div className="friends-card">

                        <h2>Friends</h2>

                        <div className="friends-list">

                            {
                                friends.map((friend) => (

                                    <div
                                        className="friend-row"
                                        key={friend.id}
                                    >

                                        {/* LEFT */}
                                        <div className="friend-left">

                                            <div className="friend-avatar">
                                                {friend.avatar}
                                            </div>

                                            <div className="friend-info">

                                                <h3>
                                                    {friend.name}

                                                    <span>
                                                        {friend.flag}
                                                    </span>
                                                </h3>

                                                <p>
                                                    {friend.lastSeen}
                                                </p>

                                            </div>

                                        </div>

                                        {/* RIGHT */}
                                        <div className="friend-actions">

                                            <button
                                                className="challenge-btn"
                                            >
                                                <Sword size={18} />
                                                Challenge
                                            </button>

                                            <button
                                                className="message-btn"
                                                onClick={() => navigate("/chat")}
                                            >
                                                <MessageCircle size={18} />
                                                Send message
                                            </button>

                                            {/* DROPDOWN */}
                                            <div className="menu-wrapper">

                                                <button className="menu-btn">
                                                    <MoreVertical size={20} />
                                                </button>

                                                <div className="dropdown-menu">

                                                    <div className="dropdown-item">
                                                        <MessageCircle size={17} />
                                                        Send message
                                                    </div>

                                                    <div className="dropdown-item">
                                                        <Sword size={17} />
                                                        Challenge
                                                    </div>

                                                    <div className="dropdown-item">
                                                        <History size={17} />
                                                        History
                                                    </div>

                                                    <div className="dropdown-item danger">
                                                        <ShieldBan size={17} />
                                                        Block
                                                    </div>

                                                    <div className="dropdown-item danger">
                                                        <Flag size={17} />
                                                        Report
                                                    </div>

                                                    <div className="dropdown-item">
                                                        <Copy size={17} />
                                                        Copy ID
                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                ))
                            }

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Friends;