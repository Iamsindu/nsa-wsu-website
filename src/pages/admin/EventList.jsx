import { useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { deleteEvent, getAdminEvents } from "../../services/eventService.js";
import {
    ADMIN_EVENTS_EDIT,
    ADMIN_EVENTS_NEW,
} from "../../constants/route.js";

import "../../styles/ManageUpdates.css";


function EventList() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function loadEvents() {
            try {
                const response = await getAdminEvents();
                setEvents(response);
            } catch (error) {
                console.error("Failed to load events:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadEvents();
    }, []);

    if (loading) {
        return <p>Loading events...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }


    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this event?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await deleteEvent(id);
            setEvents((current) =>
                current.filter((event) => event.id !== id)
            );
            toast.success("Event deleted successfully.");
        } catch (error) {
            console.error("Delete event error:", error);
            toast.error("Failed to delete event.");
        }
    };

    return (
        <div className="manage-updates">
            <div className="manage-updates-header">
                <div>
                    <h1>Manage Events</h1>
                    <p>
                        Create, edit, publish, and manage NSA WSU events.
                    </p>
                </div>

                <Link
                    to={ADMIN_EVENTS_NEW}
                    className="create-update-btn"
                >
                    + Create Event
                </Link>

            </div>


            <div className="updates-table-container">
                <table className="updates-table">
                    <thead>
                        <tr>
                            <th>Event</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>


                    <tbody>
                        {events?.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="no-updates">
                                    No events found.
                                </td>
                            </tr>
                        ) : (
                            events?.map((event) => (
                                <tr key={`${event.type}-${event.id}`}>
                                    <td>
                                        <div className="update-title-cell">
                                            <strong> {event.title} </strong>
                                            <span>{event.summary}</span>
                                        </div>
                                    </td>

                                    <td>
                                        {event.event_date
                                            ? new Date(
                                                event.event_date
                                            ).toLocaleDateString()
                                            : "—"}
                                    </td>

                                    <td>
                                        <span
                                            className={
                                                event.published
                                                    ? "status-badge published"
                                                    : "status-badge draft"
                                            }
                                        >
                                            {event.published
                                                ? "Published"
                                                : "Draft"}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="update-actions">

                                            <button
                                                type="button"
                                                className="icon-action edit"
                                                aria-label={`Edit ${event.title}`}
                                                title="Edit"
                                                onClick={() =>
                                                    navigate(
                                                        ADMIN_EVENTS_EDIT.replace(
                                                            ":id",
                                                            event.id
                                                        )
                                                    )
                                                }
                                            >
                                                <FaPen />
                                            </button>


                                            <button
                                                type="button"
                                                className="icon-action delete"
                                                aria-label={`Delete ${event.title}`}
                                                title="Delete"
                                                onClick={() => handleDelete(event.id)}
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


export default EventList;