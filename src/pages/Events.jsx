import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Card from "../components/Card";
import { getEvents } from "../services/eventService";

import "../styles/Events.css";
import { DASHAIN, NAYABARSHA } from "../constants/route";
import { formatDate } from "../constants/common";


function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        async function loadEvents() {
            try {
                const data = await getEvents();
                setEvents(data);
            } catch (error) {
                console.error("Failed to load events:", error);
                setError("Unable to load events.");
            } finally {
                setLoading(false);
            }
        }

        loadEvents();
    }, []);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // -----------------------------
    // SIGNATURE EVENT GROUP INFO
    // -----------------------------
    const signatureGroups = [
        {
            key: "naya-barsha",
            title: "Naya Barsha",
            season: "Spring Semester",
            time: "Around April",
            route: NAYABARSHA,
            description:
                "Naya Barsha is one of NSA WSU’s signature celebrations, bringing the community together to celebrate the Nepali New Year through culture, food, music, performances, and shared traditions.",
        },
        {
            key: "dashain",
            title: "Dashain",
            season: "Fall Semester",
            time: "Around September / October",
            route: DASHAIN,
            description:
                "Dashain is one of NSA WSU’s most meaningful annual celebrations, bringing the community together through tika, jamara, food, music, traditions, and the feeling of home away from home.",
        },
    ];


    // -----------------------------
    // BUILD SIGNATURE EVENTS
    // -----------------------------
    const signatureEvents = signatureGroups.map(
        (group) => {
            const relatedEvents = events
                .filter(
                    (event) =>
                        event.recurring_event ===
                        group.key
                )
                .sort(
                    (a, b) =>
                        new Date(b.event_date) -
                        new Date(a.event_date)
                );

            return {
                ...group,
                events: relatedEvents,
            };
        }
    );


    // -----------------------------
    // PAST NON-SIGNATURE EVENTS
    // -----------------------------
    const pastEvents = events
        .filter((event) => {
            if (!event.event_date) return false;

            // Signature events are handled separately
            if (event.recurring_event) return false;

            const eventDate = new Date(
                event.event_date
            );

            return eventDate < today;
        })
        .sort(
            (a, b) =>
                new Date(b.event_date) -
                new Date(a.event_date)
        );


    // -----------------------------
    // UPCOMING NON-SIGNATURE EVENTS
    // -----------------------------
    const upcomingEvents = events
        .filter((event) => {
            if (!event.event_date) return false;

            // Signature events are handled separately
            if (event.recurring_event) return false;

            const eventDate = new Date(
                event.event_date
            );

            return eventDate >= today;
        })
        .sort(
            (a, b) =>
                new Date(a.event_date) -
                new Date(b.event_date)
        );

    // -----------------------------
    // GET UNIQUE YEARS
    // -----------------------------
    const getEventYears = (groupEvents) => {
        const years = groupEvents
            .filter((event) => event.event_date)
            .map((event) =>
                new Date(
                    event.event_date
                ).getFullYear()
            );

        return [...new Set(years)].sort(
            (a, b) => b - a
        );
    };


    if (loading) {
        return (
            <main>
                <p>Loading events...</p>
            </main>
        );
    }


    if (error) {
        return (
            <main>
                <p>{error}</p>
            </main>
        );
    }


    return (
        <main>

            {/* PAGE HEADER */}
            <section className="page-header">
                <p className="events-description">
                    Nepalese Student Association at WSU hosts
                    and participates in cultural, social, and
                    community events that bring Nepali students
                    and friends of Nepal together.
                </p>
            </section>


            {/* SIGNATURE EVENTS */}
            <section className="events-section">
                <h2>Our Signature Events</h2>
                <div className="signature-grid">
                    {signatureEvents.map((group) => {
                        const years =
                            getEventYears(group.events);
                        return (
                            <Card
                                key={group.key}
                                className="event-card"
                            >
                                <p className="event-label">
                                    {group.season}
                                </p>
                                <h3>{group.title}</h3>
                                <p className="event-date">
                                    {group.time}
                                </p>
                                <p>
                                    {group.description}
                                </p>

                                <Link
                                    to={group.route}
                                    className="event-card-link"
                                >
                                    See our Past Memories →
                                </Link>

                            </Card>
                        );
                    })}

                </div>

            </section>


            {/* PAST EVENTS */}

            <section className="events-section">
                <h2>Our Past Events</h2>
                <div className="past-events-grid">
                    {pastEvents.length > 0 ? (
                        pastEvents.map((event) => (
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
                                <p> {event.summary}</p>
                                <Link
                                    to={`/events/${event.slug}`}
                                    className="event-link"
                                >
                                    View Event
                                </Link>
                            </Card>
                        ))
                    ) : (
                        <p>
                            No past events available.
                        </p>

                    )}

                </div>

            </section>


            {/* UPCOMING EVENTS */}
            <section className="events-section">
                <h2>Our Upcoming Events</h2>
                <div className="past-events-grid">
                    {upcomingEvents.length > 0 ? (
                        upcomingEvents.map((event) => (
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

                                <p>
                                    {event.summary}
                                </p>

                                <Link
                                    to={`/events/${event.slug}`}
                                    className="event-link"
                                >
                                    View Event
                                </Link>

                            </Card>
                        ))
                    ) : (
                        <p>
                            No upcoming events announced yet.
                        </p>
                    )}

                </div>

            </section>

        </main>
    );
}


export default Events;