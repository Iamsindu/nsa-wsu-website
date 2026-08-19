import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const menuItems = [
    {
        label: "Dashboard",
        path: "/admin/dashboard",
        roles: ["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER"],
    },
    {
        label: "Updates",
        path: "/admin/updates",
        roles: ["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER"],
    },
    {
        label: "Events",
        path: "/admin/events",
        roles: ["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER"],
    },
    {
        label: "Gallery",
        path: "/admin/gallery",
        roles: ["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER"],
    },
    {
        label: "Team",
        path: "/admin/team",
        roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
        label: "Constitution",
        path: "/admin/constitution",
        roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
        label: "Admins",
        path: "/admin/admins",
        roles: ["SUPER_ADMIN"],
    },
];

function AdminSidebar() {
    const { admin } = useAuth();

    const visibleItems = menuItems.filter((item) =>
        item.roles.includes(admin?.role)
    );

    return (
        <aside className="admin-sidebar">
            <div className="admin-sidebar-brand">
                <h2>NSA WSU</h2>
                <span>Admin Portal</span>
            </div>

            <nav className="admin-sidebar-nav">
                {visibleItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div className="admin-sidebar-user">
                <p>
                    {admin?.first_name} {admin?.last_name}
                </p>

                <span>{admin?.role}</span>
            </div>
        </aside>
    );
}

export default AdminSidebar;