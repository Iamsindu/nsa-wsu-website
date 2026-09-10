import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/EventDetail.css";
import { EVENTS } from "../constants/route";
import {
    getEvents,
    getEventsBySlug,
} from "../services/eventService";


function formatEventDate(date) {
    if (!date) return "";
    return new Date(date).toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        }
    );
}

function EventDetail() {
    const { slug } = useParams();

    const [event, setEvent] = useState(null);
    const [otherEvents, setOtherEvents] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        async function loadEvent() {
            try {
                setLoading(true);

                const eventData =
                    await getEventsBySlug(slug);

                const allEvents =
                    await getEvents();

                setEvent(eventData);

                const filteredEvents = allEvents
                    .filter(
                        (item) =>
                            item.slug !== slug
                    )
                    .slice(0, 3);

                setOtherEvents(filteredEvents);

            } catch (error) {
                console.error(
                    "Failed to load event:",
                    error
                );

                setError(
                    "The event you are looking for does not exist."
                );
            } finally {
                setLoading(false);
            }
        }

        loadEvent();
    }, [slug]);


    if (loading) {
        return (
            <main className="event-detail-not-found">
                <p>Loading event...</p>
            </main>
        );
    }


    if (error || !event) {
        return (
            <main className="event-detail-not-found">

                <h1>Event Not Found</h1>

                <p>
                    {error ||
                        "The event you are looking for does not exist."}
                </p>

                <Link to={EVENTS}>
                    Back to Events
                </Link>

            </main>
        );
    }


    return (
        <main className="event-detail-page">

            <div className="event-detail-container">

                <Link
                    to={EVENTS}
                    className="event-detail-back"
                >
                    ← Back to Events
                </Link>


                <div className="event-detail-layout">


                    {/* MAIN CONTENT */}

                    <article className="event-detail-main">


                        {/* HEADER */}

                        <header className="event-detail-header">

                            {event.recurring_event && (
                                <span className="event-detail-category">
                                    Signature Event
                                </span>
                            )}

                            <h1>
                                {event.title}
                            </h1>

                            <p className="event-detail-intro">
                                {event.summary}
                            </p>

                        </header>


                        {/* IMAGE */}

                        {event.image_url && (

                            <figure className="event-detail-image">

                                <img
                                    src={event.image_url}
                                    alt={
                                        event.image_caption ||
                                        event.title
                                    }
                                />

                                {event.image_caption && (
                                    <figcaption>
                                        {event.image_caption}
                                    </figcaption>
                                )}

                            </figure>

                        )}


                        {/* ABOUT */}

                        <section className="event-detail-content">

                            <h2>
                                About This Event
                            </h2>

                            {event.description &&
                                event.description
                                    .split("\n")
                                    .filter(
                                        (paragraph) =>
                                            paragraph.trim() !== ""
                                    )
                                    .map(
                                        (paragraph, index) => (
                                            <p key={index}>
                                                {paragraph}
                                            </p>
                                        )
                                    )}

                        </section>


                        {/* EXTERNAL LINK */}

                        {event.external_link && (

                            <section className="event-action-section">

                                <h2>
                                    Learn More
                                </h2>

                                <div className="event-action-buttons">

                                    <a
                                        href={event.external_link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="event-primary-button"
                                    >
                                        Visit Related Link
                                    </a>

                                </div>

                            </section>

                        )}

                    </article>


                    {/* SIDEBAR */}

                    <aside className="event-detail-sidebar">


                        {/* EVENT INFORMATION */}

                        <div className="event-information-card">

                            <h2>
                                Event Information
                            </h2>


                            {event.event_date && (
                                <div className="event-information-item">

                                    <span>
                                        Date
                                    </span>

                                    <strong>
                                        {formatEventDate(
                                            event.event_date
                                        )}
                                    </strong>

                                </div>
                            )}


                            {event.location && (
                                <div className="event-information-item">

                                    <span>
                                        Location
                                    </span>

                                    <strong>
                                        {event.location}
                                    </strong>

                                </div>
                            )}


                            {event.recurring_event && (
                                <div className="event-information-item">

                                    <span>
                                        Signature Event
                                    </span>

                                    <strong>
                                        {event.recurring_event ===
                                            "naya-barsha"
                                            ? "Naya Barsha"
                                            : event.recurring_event ===
                                                "dashain"
                                                ? "Dashain"
                                                : event.recurring_event}
                                    </strong>

                                </div>
                            )}

                        </div>


                        {/* WHAT TO EXPECT */}

                        <div className="event-information-card">

                            <h2>
                                WHAT TO EXPECT
                            </h2>

                            <div className="event-information-item">
                                Cultural experiences
                            </div>

                            <div className="event-information-item">
                                Community gathering
                            </div>

                            <div className="event-information-item">
                                Nepali culture and traditions
                            </div>

                        </div>


                        {/* OTHER EVENTS */}

                        {otherEvents.length > 0 && (

                            <div className="other-events-card">

                                <h2>
                                    Other Events
                                </h2>


                                {otherEvents.map(
                                    (otherEvent) => (

                                        <article
                                            className="other-event-item"
                                            key={otherEvent.id}
                                        >

                                            {otherEvent.recurring_event && (
                                                <span>
                                                    Signature Event
                                                </span>
                                            )}

                                            <h3>

                                                <Link
                                                    to={`/events/${otherEvent.slug}`}
                                                >
                                                    {otherEvent.title}
                                                </Link>

                                            </h3>

                                            {otherEvent.event_date && (
                                                <p>
                                                    {formatEventDate(
                                                        otherEvent.event_date
                                                    )}
                                                </p>
                                            )}

                                        </article>

                                    )
                                )}

                            </div>

                        )}

                    </aside>

                </div>

            </div>

        </main>
    );
}

export default EventDetail;