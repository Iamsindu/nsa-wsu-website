import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar.jsx";
import "../../styles/AdminLayout.css";

function AdminLayout() {
    return (
        <div className="admin-layout">
            <AdminSidebar />

            <div className="admin-main">
                <header className="admin-header">
                    <h3>Admin Portal</h3>
                </header>

                <main className="admin-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;