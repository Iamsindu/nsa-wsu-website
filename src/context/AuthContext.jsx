import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    getCurrentAdmin,
    logout as logoutRequest,
} from "../services/authService.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = useCallback (async () => {
        setLoading(true);
        try {
            const response = await getCurrentAdmin();
            setAdmin(response.admin);
        } catch (error) {
            setAdmin(null);
        } finally {
            setLoading(false);
        }
    }, []);

    async function logout() {
        try {
            await logoutRequest();
            setAdmin(null);
        } catch (error) {
            console.error("Logout error:", error);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                admin,
                loading,
                checkAuth,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}