import { X, Volume2, Music, Smartphone, Moon, Languages } from "lucide-react";
import "../styles/settingModal.scss";

type Props = {
    onClose: () => void;
};

function SettingsModal({
    onClose,
}: Props) {

    const settings = JSON.parse(
        localStorage.getItem("settings") || "{}"
    );

    const sound = settings.sound ?? true;
    const music = settings.music ?? true;
    const vibration = settings.vibration ?? true;
    const theme = settings.theme ?? "dark";

    function updateSetting(key: string, value: any) {

        const updated = {
            ...settings,
            [key]: value,
        };

        localStorage.setItem(
            "settings",
            JSON.stringify(updated)
        );

        // Dark Mode / Light Mode
        if (key === "theme") {

            if (value === "light") {
                document.body.classList.add("light-theme");
            }
            else {
                document.body.classList.remove("light-theme");
            }
        }

        window.location.reload();
    }

    return (
        <div
            className="settings-overlay"
            onClick={onClose}
        >
            <div
                className="settings-modal"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="settings-header">

                    <h2>Settings</h2>

                    <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        <X size={30} />
                    </button>

                </div>

                <div className="settings-body">

                    {/* SOUND */}
                    <div className="setting-row">

                        <div className="setting-left">
                            <Volume2 size={22} />
                            <span>Sound</span>
                        </div>

                        <label className="switch">

                            <input
                                type="checkbox"
                                checked={sound}
                                onChange={(e) =>
                                    updateSetting(
                                        "sound",
                                        e.target.checked
                                    )
                                }
                            />

                            <span className="slider"></span>

                        </label>

                    </div>

                    {/* MUSIC */}
                    <div className="setting-row">

                        <div className="setting-left">
                            <Music size={22} />
                            <span>Music</span>
                        </div>

                        <label className="switch">

                            <input
                                type="checkbox"
                                checked={music}
                                onChange={(e) =>
                                    updateSetting(
                                        "music",
                                        e.target.checked
                                    )
                                }
                            />

                            <span className="slider"></span>

                        </label>

                    </div>

                    {/* VIBRATION */}
                    <div className="setting-row">

                        <div className="setting-left">
                            <Smartphone size={22} />
                            <span>Vibration</span>
                        </div>

                        <label className="switch">

                            <input
                                type="checkbox"
                                checked={vibration}
                                onChange={(e) =>
                                    updateSetting(
                                        "vibration",
                                        e.target.checked
                                    )
                                }
                            />

                            <span className="slider"></span>

                        </label>

                    </div>

                    {/* THEME */}
                    <div className="setting-row">

                        <div className="setting-left">
                            <Moon size={22} />
                            <span>Dark Mode</span>
                        </div>

                        <label className="switch">

                            <input
                                type="checkbox"
                                checked={theme === "dark"}
                                onChange={(e) =>
                                    updateSetting(
                                        "theme",
                                        e.target.checked
                                            ? "dark"
                                            : "light"
                                    )
                                }
                            />

                            <span className="slider"></span>

                        </label>

                    </div>

                    {/* LANGUAGE */}
                    <div className="setting-row">

                        <div className="setting-left">
                            <Languages size={22} />
                            <span>Language</span>
                        </div>

                        <div className="language-box">
                            English
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default SettingsModal;