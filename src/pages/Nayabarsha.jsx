import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getEvents } from "../services/eventService";
import Card from "../components/Card";

import "../styles/Events.css";
import { formatDate } from "../constants/common";


function NayaBarsha() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function loadNayaBarshaEvents() {
            try {
                const data = await getEvents();

                const nayaBarshaEvents = data
                    .filter(
                        (event) =>
                            event.recurring_event ===
                            "naya-barsha"
                    )
                    .sort(
                        (a, b) =>
                            new Date(b.event_date) -
                            new Date(a.event_date)
                    );

                setEvents(nayaBarshaEvents);
            } catch (error) {
                console.error(
                    "Failed to load Naya Barsha events:",
                    error
                );
            } finally {
                setLoading(false);
            }
        }

        loadNayaBarshaEvents();
    }, []);

    if (loading) {
        return (
            <main>
                Loading Naya Barsha events...
            </main>
        );
    }


    return (
        <main>

            <section className="page-header">

                <p className="event-label">
                    NSA WSU Signature Event
                </p>

                <h1>Naya Barsha</h1>

                <p className="events-description">
                    Naya Barsha is NSA WSU’s celebration of
                    the Nepali New Year, bringing students,
                    friends, and community members together
                    through Nepali culture, traditions, food,
                    music, performances, and shared
                    experiences.
                </p>

            </section>


            <section className="events-section">

                <h2>Naya Barsha Through the Years</h2>

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


export default NayaBarsha;