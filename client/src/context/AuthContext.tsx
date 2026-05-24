import { createContext, useContext, useEffect, useState } from "react";

type User = {
    name: string;
    email: string | null;
    password?: string;
    coins: number;
    avatar: string;
};

interface AuthContextType {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {

    const [user, setUser] = useState<User | null>(null);

    // ✅ load user from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // ✅ login
    function login(userData: User) {
        setUser(userData);

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );
    }

    // ✅ logout
    function logout() {
        localStorage.removeItem("user");
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// ✅ custom hook
export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}