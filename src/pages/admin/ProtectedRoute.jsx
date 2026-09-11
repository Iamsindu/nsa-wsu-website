import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { ADMIN_LOGIN } from "../../constants/route.js";

function ProtectedRoute({ children }) {
    const { admin, loading, checkAuth } = useAuth();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!admin) {
        return <Navigate to={ADMIN_LOGIN} replace />;
    }

    return children;
}

export default ProtectedRoute;