import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
    const [username, setUsername] = useState("");
    const { login } = useAuth()
    const navigate = useNavigate();

    function handleLogin() {
        if (!username) return;

        // login(username)
        login({
            name: username,
            email: null,
            coins: 0,
            avatar: "👤",
        });
        navigate("/dashboard");
    }

    return (
        <div>
            <h1> Login </h1>

            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username" />

            <button onClick={handleLogin}> Login </button>
        </div>
    );
};

export default Login;