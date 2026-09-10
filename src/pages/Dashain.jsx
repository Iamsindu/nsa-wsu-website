import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getEvents } from "../services/eventService";
import Card from "../components/Card";

import "../styles/Events.css";
import { formatDate } from "../constants/common";


function Dashain() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function loadDashainEvents() {
            try {
                const data = await getEvents();

                const dashainEvents = data
                    .filter(
                        (event) =>
                            event.recurring_event === "dashain"
                    )
                    .sort(
                        (a, b) =>
                            new Date(b.event_date) -
                            new Date(a.event_date)
                    );

                setEvents(dashainEvents);
            } catch (error) {
                console.error(
                    "Failed to load Dashain events:",
                    error
                );
            } finally {
                setLoading(false);
            }
        }

        loadDashainEvents();
    }, []);

    if (loading) {
        return <main>Loading Dashain events...</main>;
    }


    return (
        <main>

            <section className="page-header">

                <p className="event-label">
                    NSA WSU Signature Event
                </p>

                <h1>Dashain</h1>

                <p className="events-description">
                    Dashain is one of Nepal’s most cherished
                    festivals—a celebration of family,
                    blessings, tradition, and togetherness.
                    NSA WSU brings the spirit of Dashain to
                    Wright State University, creating a sense
                    of home for Nepali students living far
                    from Nepal.
                </p>

            </section>


            <section className="events-section">

                <h2>Dashain Through the Years</h2>

                <div className="past-events-grid">

                    {events.map((event) => (
                        <Card
                            key={event.id}
                            className="event-card"
                        >

                            <h3>{event.title}</h3>

                            <p className="event-date">
                                {formatDate(
                                    event.event_date
                                )}
                            </p>

                            <p>{event.summary}</p>

                            <Link
                                to={`/events/${event.slug}`}
                                className="event-link"
                            >
                                View Event
                            </Link>

                        </Card>
                    ))}

                </div>

            </section>


            <section className="events-section">
                <Link
                    to="/events"
                    className="event-card-link"
                >
                    ← Back to Events
                </Link>
            </section>

        </main>
    );
}


export default Dashain;