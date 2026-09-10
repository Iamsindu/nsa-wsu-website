import AdminLayout from "../../components/admin/AdminLayout.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

function AdminDashboard() {
    const { admin } = useAuth();

    return (
        <main>
            <h1>Admin Dashboard</h1>
            <p>
                Welcome, {admin?.first_name} {admin?.last_name}
            </p>
            <p>Role: {admin?.role}</p>
        </main>
    );
}

export default AdminDashboard;