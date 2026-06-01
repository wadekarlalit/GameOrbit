import { useState } from "react";
import { Copy, Eye, EyeOff, Trash2 } from "lucide-react";
import "../styles/myAccount.scss";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SettingsModal from "../components/SettingsModal";

interface UpdateProfilePayload {
    displayName: string;
    password?: string;
}

function MyAccount() {
    const user = {
        id: "USR_6A15AB87CE84",
        name: "Lala",
        email: "lala@gmail.com",
    };
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [displayName, setDisplayName] = useState(user.name);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    function handleUpdate() {
        const payload: UpdateProfilePayload = {
            displayName,
        };

        if (password.trim()) {
            payload.password = password;
        }

        console.log("Update User", payload);

        // future API
        // await updateUser(payload)

        alert("Profile updated successfully");
    }

    function handleDeleteAccount() {
        console.log("Delete Account");

        // future API
        // await deleteAccount()

        localStorage.removeItem("user");

        window.location.href = "/";
    }

    return (
        <>
            <div className="layout">

                {/* Sidebar */}
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />

                {/* Main Content */}
                <div className="main">

                    {/* Header */}
                    <Header
                        onMenuClick={() => setIsSidebarOpen(true)}
                        onSettingsClick={() => setShowSettings(true)}
                    />

                    <div className="content">

                        {/* My Account Page Content */}
                        <div className="my-account-page">

                            <h1 className="page-title">
                                My Account
                            </h1>

                            <div className="account-card">

                                {/* DISPLAY NAME */}
                                <div className="form-group">
                                    <label>
                                        Display Name
                                    </label>

                                    <input
                                        type="text"
                                        value={displayName}
                                        onChange={(e) =>
                                            setDisplayName(e.target.value)
                                        }
                                    />
                                </div>

                                {/* USER ID */}
                                <div className="form-group">

                                    <label>
                                        User ID
                                    </label>

                                    <div className="readonly-field">

                                        <input
                                            value={user.id}
                                            readOnly
                                        />

                                        <button
                                            type="button"
                                            className="field-action-btn"
                                            onClick={() =>
                                                navigator.clipboard.writeText(user.id)
                                            }
                                        >
                                            <Copy size={18} />
                                        </button>

                                    </div>

                                </div>

                                {/* EMAIL */}
                                <div className="form-group">
                                    <label>
                                        Email
                                    </label>

                                    <input
                                        value={user?.email || ""}
                                        readOnly
                                    />
                                </div>

                                {/* PASSWORD */}
                                <div className="form-group">
                                    <label>
                                        Password
                                    </label>

                                    <div className="readonly-field">

                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            placeholder="Enter new password"
                                        />

                                        <button
                                            type="button"
                                            className="field-action-btn"
                                            onClick={() =>
                                                setShowPassword(prev => !prev)
                                            }
                                        >
                                            {
                                                showPassword
                                                    ? <EyeOff size={20} />
                                                    : <Eye size={20} />
                                            }
                                        </button>

                                    </div>
                                </div>

                                <button
                                    className="update-btn"
                                    onClick={handleUpdate}
                                >
                                    Update
                                </button>

                            </div>

                            {/* DELETE SECTION */}
                            <div className="danger-zone">

                                <h2>
                                    Delete Account
                                </h2>

                                <p>
                                    Permanently delete your account and all
                                    associated game history, friends and data.
                                    This action cannot be undone.
                                </p>

                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        setShowDeleteModal(true)
                                    }
                                >
                                    Delete Account
                                </button>

                            </div>

                        </div>


                    </div>

                    {
                        showDeleteModal && (

                            <div
                                className="delete-overlay"
                                onClick={() =>
                                    setShowDeleteModal(false)
                                }
                            >

                                <div
                                    className="delete-modal"
                                    onClick={(e) =>
                                        e.stopPropagation()
                                    }
                                >
                                    <div className="delete-icon">
                                        <Trash2 size={48} />
                                    </div>

                                    <h3>
                                        Delete Account?
                                    </h3>

                                    <p>
                                        This action cannot be undone.
                                    </p>

                                    <div className="delete-actions">

                                        <button
                                            className="cancel-btn"
                                            onClick={() =>
                                                setShowDeleteModal(false)
                                            }
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            className="confirm-delete-btn"
                                            onClick={handleDeleteAccount}
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>
                        )
                    }

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

export default MyAccount;