import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

function RoleProtectedRoute({ allowedRoles, children }) {
    const { admin, loading } = useAuth();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!admin) {
        return <Navigate to="/admin/login" replace />;
    }

    if (!allowedRoles.includes(admin.role)) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return children;
}

export default RoleProtectedRoute;