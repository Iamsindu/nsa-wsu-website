import { useEffect, useState } from "react";
import { getAdminUpdates } from "../../services/updateService.js";
import { FaPen, FaTrash } from "react-icons/fa";
import "../../styles/ManageUpdates.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ADMIN_UPDATE_EDIT, ADMIN_UPDATE_NEW } from "../../constants/route.js";


function ManageUpdates() {
    const [updates, setUpdates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        async function loadUpdates() {
            try {
                const response = await getAdminUpdates();
                setUpdates(response.data);
            } catch (error) {
                console.error("Failed to load updates:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadUpdates();
    }, []);

    if (loading) {
        return <p>Loading updates...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="manage-updates">
            <div className="manage-updates-header">
                <div>
                    <h1>Manage Updates</h1>
                    <p>
                        Create, edit, publish, and manage NSA WSU updates.
                    </p>
                </div>

                <Link
                    to={ADMIN_UPDATE_NEW}
                    className="create-update-btn"
                >
                    + Create Update
                </Link>
            </div>

            <div className="updates-table-container">
                <table className="updates-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Published</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {updates.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="no-updates">
                                    No updates found.
                                </td>
                            </tr>
                        ) : (
                            updates.map((update) => (
                                <tr key={update.id}>
                                    <td>
                                        <div className="update-title-cell">
                                            <strong>{update.title}</strong>
                                            <span>{update.summary}</span>
                                        </div>
                                    </td>

                                    <td>{update.category}</td>

                                    <td>
                                        <span
                                            className={
                                                update.published
                                                    ? "status-badge published"
                                                    : "status-badge draft"
                                            }
                                        >
                                            {update.published
                                                ? "Published"
                                                : "Draft"}
                                        </span>
                                    </td>

                                    <td>
                                        {update.published_at
                                            ? new Date(
                                                update.published_at
                                            ).toLocaleDateString()
                                            : "—"}
                                    </td>

                                    <td>
                                        <div className="update-actions">
                                            <button
                                                type="button"
                                                className="icon-action edit"
                                                aria-label={`Edit ${update.title}`}
                                                title="Edit"
                                                onClick={() =>
                                                    navigate(
                                                        ADMIN_UPDATE_EDIT.replace(":id", update.id)
                                                    )
                                                }
                                            >
                                                <FaPen />
                                            </button>

                                            <button
                                                type="button"
                                                className="icon-action delete"
                                                aria-label={`Delete ${update.title}`}
                                                title="Delete"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManageUpdates;