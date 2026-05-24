import {
    X,
    Mail,
    Lock,
    User,
    UserRound,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import "../styles/auth-modal.scss";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function AuthModal({ type, onClose }: any) {

    const { login } = useAuth();
    const [mode, setMode] = useState(type);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isEmailVerified, setIsEmailVerified] = useState(false);

    const initialErrors = {
        name: "",
        email: "",
        password: "",
        general: "",
    };
    const [errors, setErrors] = useState(initialErrors);

    function handleRegister() {

        // reset old errors
        setErrors(initialErrors);

        let hasError = false;

        // ✅ Name Validation
        if (!name.trim()) {
            setErrors(prev => ({
                ...prev,
                name: "Username is required",
            }));

            hasError = true;
        }

        // ✅ Email Validation
        if (!email.trim()) {
            setErrors(prev => ({
                ...prev,
                email: "Email is required",
            }));

            hasError = true;
        }

        // ✅ Password Validation
        if (!password.trim()) {
            setErrors(prev => ({
                ...prev,
                password: "Password is required",
            }));

            hasError = true;
        }

        // password length
        if (password && password.length < 6) {
            setErrors(prev => ({
                ...prev,
                password: "Password must be at least 6 characters",
            }));

            hasError = true;
        }

        if (hasError) return;

        // ✅ get old users
        const users = JSON.parse(
            localStorage.getItem("users") || "[]"
        );

        // ✅ check duplicate email
        const userExists = users.find(
            (u: any) => u.email === email
        );

        if (userExists) {
            setErrors(prev => ({
                ...prev,
                email: "Email already exists",
            }));

            return;
        }

        // ✅ create new user
        const newUser: any = {
            name,
            email: email.trim(),
            password,
            coins: 3410,
            avatar: "👁",
        };

        // ✅ save users
        localStorage.setItem(
            "users",
            JSON.stringify([...users, newUser])
        );

        // ✅ current logged in user
        localStorage.setItem(
            "user",
            JSON.stringify(newUser)
        );

        // ✅ auth context login
        login(newUser);

        // ✅ close modal
        onClose();
    }

    function handleGuestLogin() {
        const guestName = "Guest_" + Math.floor(Math.random() * 9999);

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

        // onLogin(JSON.stringify(guestUser));
        login(guestUser);
        onClose();
    }

    function handleLogin() {

        // reset old errors
        setErrors(initialErrors);

        let hasError = false;

        if (!email.trim()) {
            setErrors(prev => ({
                ...prev,
                email: "Email is required",
            }));
            hasError = true;
        }

        if (!password.trim()) {
            setErrors(prev => ({
                ...prev,
                password: "Password is required",
            }));
            hasError = true;
        }

        if (hasError) return;

        // ✅ get users from localStorage
        const users = JSON.parse(
            localStorage.getItem("users") || "[]"
        );

        // ✅ find matching user
        const existingUser = users.find(
            (u: any) =>
                u.email === email.trim() &&
                u.password === password
        );

        // ❌ invalid login
        if (!existingUser) {
            setErrors(prev => ({
                ...prev,
                general: "Invalid email or password",
            }))

            return;
        }

        // ✅ login success
        localStorage.setItem(
            "user",
            JSON.stringify(existingUser)
        );

        login(existingUser);

        onClose();
    }

    function handleForgotPassword() {

        // reset errors
        setErrors(initialErrors);

        // ✅ email required
        if (!email.trim()) {
            setErrors(prev => ({
                ...prev,
                email: "Email is required",
            }));

            return;
        }

        // ✅ get users
        const users = JSON.parse(
            localStorage.getItem("users") || "[]"
        );

        // ✅ find user
        const existingUser = users.find(
            (u: any) => u.email === email.trim()
        );

        // ❌ user not found
        if (!existingUser) {
            setErrors(prev => ({
                ...prev,
                email: "No account found with this email",
            }));

            return;
        }

        // ✅ step 1 complete
        if (!isEmailVerified) {
            setIsEmailVerified(true);
            return;
        }

        // ✅ validate passwords
        if (!password.trim()) {
            setErrors(prev => ({
                ...prev,
                password: "New password is required",
            }));

            return;
        }

        if (password.length < 6) {
            setErrors(prev => ({
                ...prev,
                password: "Password must be at least 6 characters",
            }));

            return;
        }

        if (password !== confirmPassword) {
            setErrors(prev => ({
                ...prev,
                password: "Passwords do not match",
            }));

            return;
        }

        // ✅ update password
        const updatedUsers = users.map((u: any) => {
            if (u.email === email.trim()) {
                return {
                    ...u,
                    password,
                };
            }

            return u;
        });

        // ✅ save updated users
        localStorage.setItem(
            "users",
            JSON.stringify(updatedUsers)
        );

        // ✅ success
        alert("Password updated successfully");

        // reset states
        setMode("login");
        setIsEmailVerified(false);

        setPassword("");
        setConfirmPassword("");
    }

    return (
        <div className="auth-overlay">

            <div className="auth-modal">

                {/* Header */}
                <div className="auth-header">

                    <h2>
                        {mode === "login" && "Welcome back!"}
                        {mode === "register" && "Create an account"}
                        {mode === "forgot" && "Reset password"}
                    </h2>

                    <button onClick={onClose}>
                        <X />
                    </button>
                </div>

                {/* Body */}
                <div className="auth-body">

                    {/* REGISTER */}
                    {mode === "register" && (
                        <div className="input-group">
                            <User />
                            <input
                                placeholder="Display name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && (
                                <p className="error-text">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                    )}

                    {/* EMAIL */}
                    <div className="input-group">
                        <Mail />
                        <input
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                            <p className="error-text">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* PASSWORD */}
                    {mode !== "forgot" && (
                        <div className="input-group">
                            <Lock />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && (
                                <p className="error-text">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                    )}

                    {mode === "forgot" && isEmailVerified && (
                        <>
                            <div className="input-group">
                                <Lock />

                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />

                                {errors.password && (
                                    <p className="error-text">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="input-group">
                                <Lock />

                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </div>
                        </>
                    )}

                    {/* MAIN BUTTON */}
                    {errors.general && (
                        <p className="error-text center">
                            {errors.general}
                        </p>
                    )}
                    <button
                        className="main-btn"
                        onClick={() => {
                            if (mode === "login") {
                                handleLogin();
                            }

                            if (mode === "register") {
                                handleRegister();
                            }
                            if (mode === "forgot") {
                                handleForgotPassword();
                            }
                        }}
                    >
                        {mode === "login" && "Login"}
                        {mode === "register" && "Continue"}
                        {mode === "forgot" && "Request password change"}
                    </button>

                    {/* LINKS */}
                    <div className="auth-links">

                        {mode === "login" && (
                            <>
                                <button onClick={() => {
                                    setMode("forgot");
                                    setIsEmailVerified(false);
                                }}>
                                    Forgot your password?
                                </button>

                                <button onClick={() => setMode("register")}>
                                    Need an account? Register
                                </button>
                            </>
                        )}

                        {mode === "register" && (
                            <button onClick={() => setMode("login")}>
                                Already have an account?
                            </button>
                        )}

                        {mode === "forgot" && (
                            <button onClick={() => setMode("login")}>
                                Login
                            </button>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="divider">
                        <span>or</span>
                    </div>

                    {/* SOCIAL */}
                    <div className="socials">

                        <button>
                            <FcGoogle />
                            Continue with Google
                        </button>

                        <button onClick={handleGuestLogin}>
                            <UserRound />
                            Continue as Guest
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AuthModal;