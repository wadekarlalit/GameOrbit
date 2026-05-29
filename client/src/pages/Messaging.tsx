// // Messaging.tsx

// import "../styles/messaging.scss";

// function Messaging() {

//     return (

//         <div className="messaging-page">

//             {/* ================= LEFT SIDEBAR ================= */}
//             <div className="chat-sidebar">

//                 <div className="chat-sidebar-header">
//                     Messages
//                 </div>

//                 <div className="chat-search">

//                     <input
//                         type="text"
//                         placeholder="Search friends..."
//                     />

//                 </div>

//                 {/* EMPTY STATE */}
//                 <div className="no-messages">
//                     No messages
//                 </div>

//             </div>

//             {/* ================= RIGHT CONTENT ================= */}
//             <div className="chat-empty-state">

//                 <div className="empty-icon">
//                     💬
//                 </div>

//                 <h2>
//                     Add friends to start chatting!
//                 </h2>

//                 <p>
//                     Invite your friends or browse our community
//                     and send friend requests to make new connections.
//                 </p>

//                 <button className="browse-btn">
//                     Browse Players
//                 </button>

//             </div>

//         </div>
//     );
// }

// export default Messaging;

//............................................................................................

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/messaging.scss";
import { useState } from "react";

function Messaging() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (

        <div className="layout">

            {/* ✅ Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* ✅ Main */}
            <div className="main">

                {/* ✅ Mobile Header */}
                <Header
                    onMenuClick={() => setIsSidebarOpen(true)}
                />

                {/* ✅ Messaging Content */}
                <div className="messaging-page">

                    <div className="messages-sidebar">

                        <div className="messages-title">
                            Messages
                        </div>

                        <div className="empty-messages">
                            No messages
                        </div>

                    </div>

                    <div className="chat-preview">

                        <div className="chat-preview-content">

                            <div className="chat-icon">
                                💬
                            </div>

                            <h2>
                                Add friends to start chatting!
                            </h2>

                            <p>
                                Invite your friends or browse our
                                community and send friend requests
                                to make new connections.
                            </p>

                            <button className="browse-btn">
                                Browse Friends
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Messaging;