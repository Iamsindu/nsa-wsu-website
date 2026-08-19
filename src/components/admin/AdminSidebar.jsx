import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { ADMIN_ADMINLIST, ADMIN_CONSTITUTION, ADMIN_DASHBOARD, ADMIN_EVENTS, ADMIN_GALLERY, ADMIN_TEAM, ADMIN_UPDATES } from "../../constants/route.js";

const menuItems = [
    {
        label: "Dashboard",
        path: ADMIN_DASHBOARD,
        roles: ["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER"],
    },
    {
        label: "Updates",
        path: ADMIN_UPDATES,
        roles: ["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER"],
    },
    {
        label: "Events",
        path: ADMIN_EVENTS,
        roles: ["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER"],
    },
    {
        label: "Gallery",
        path: ADMIN_GALLERY,
        roles: ["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER"],
    },
    {
        label: "Team",
        path: ADMIN_TEAM,
        roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
        label: "Constitution",
        path: ADMIN_CONSTITUTION,
        roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
        label: "Admins",
        path: ADMIN_ADMINLIST,
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