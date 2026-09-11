import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { ADMIN_DASHBOARD, ADMIN_LOGIN } from "../../constants/route.js";

function RoleProtectedRoute({ allowedRoles, children }) {
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

    if (!allowedRoles.includes(admin.role)) {
        return <Navigate to={ADMIN_DASHBOARD} replace />;
    }

    return children;
}

export default RoleProtectedRoute;