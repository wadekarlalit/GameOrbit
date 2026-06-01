import { X, LogIn } from "lucide-react";
import "../styles/loginRequiredModal.scss";

type Props = {
    onClose: () => void;
    onLogin: () => void;
};

function LoginRequiredModal({ onClose, onLogin }: Props) {

    return (
        <div
            className="login-required-overlay"
            onClick={onClose}
        >

            <div
                className="login-required-modal"
                onClick={(e) => e.stopPropagation()}
            >

                <button
                    className="close-modal-btn"
                    onClick={onClose}
                >
                    <X size={22} />
                </button>

                <div className="modal-icon">
                    🔒
                </div>

                <h2>
                    Login Required
                </h2>

                <p>
                    You need to login first to access this feature.
                    Create an account or login to continue your
                    gaming journey.
                </p>

                <button
                    className="login-now-btn"
                    onClick={onLogin}
                // onClick={() => navigate("/login")}
                >
                    <LogIn size={18} />
                    Login Now
                </button>

            </div>

        </div>
    );
}

export default LoginRequiredModal;