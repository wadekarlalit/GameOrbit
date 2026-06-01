import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { profileData } from "../data/games"

import "../styles/myProfile.scss";
import SettingsModal from "../components/SettingsModal";

function MyProfile() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    return (
        <>
            <div className="layout">

                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />

                <div className="main">

                    <Header
                        onMenuClick={() => setIsSidebarOpen(true)}
                        onSettingsClick={() => setShowSettings(true)}
                    />

                    <div className="content">

                        <div className="profile-page">

                            {/* Profile Header */}

                            <div className="profile-header">

                                <div className="profile-avatar">
                                    😎
                                </div>

                                <div className="profile-info">

                                    <h1>
                                        {profileData.displayName}
                                    </h1>

                                    <p>
                                        Player ID:
                                        {" "}
                                        {profileData.userId}
                                    </p>

                                </div>

                            </div>

                            {/* Game Cards */}

                            <div className="profile-games-grid">

                                {
                                    profileData.games.map(game => (

                                        <div
                                            key={game.id}
                                            className="profile-game-card"
                                        >

                                            <h3>
                                                {game.name}
                                            </h3>

                                            {
                                                game.played ? (

                                                    <>

                                                        <div className="profile-level">

                                                            Level
                                                            {" "}
                                                            {game.level}

                                                        </div>

                                                        <div className="profile-stats">

                                                            <div className="profile-stat-row">

                                                                <span className="wins">
                                                                    Wins
                                                                </span>

                                                                <strong className="wins">
                                                                    {game.wins}
                                                                </strong>

                                                            </div>

                                                            <div className="profile-stat-row">

                                                                <span className="losses">
                                                                    Losses
                                                                </span>

                                                                <strong className="losses">
                                                                    {game.losses}
                                                                </strong>

                                                            </div>

                                                            <div className="profile-stat-row">

                                                                <span className="draws">
                                                                    Draws
                                                                </span>

                                                                <strong className="draws">
                                                                    {game.draws}
                                                                </strong>

                                                            </div>

                                                        </div>

                                                    </>

                                                ) : (

                                                    <div className="never-played">

                                                        Never Played

                                                    </div>

                                                )
                                            }

                                        </div>

                                    ))
                                }

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {
                showSettings && (
                    <SettingsModal
                        onClose={() => setShowSettings(false)}
                    />
                )
            }
        </>
    );
}

export default MyProfile;