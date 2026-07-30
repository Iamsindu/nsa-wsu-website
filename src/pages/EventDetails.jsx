import { Link, useParams } from "react-router-dom";
import { signatureEvents } from "../data/eventsData"
import "../styles/EventDetail.css";

function formatEventDate(date) {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    });
}

function EventDetail() {
    const { slug } = useParams();

    const event = signatureEvents.find((item) => item.slug === slug);

    if (!event) {
        return (
            <main className="event-detail-not-found">
                <h1>Event Not Found</h1>
                <p>The event you are looking for does not exist.</p>

                <Link to="/events">
                    Back to Events
                </Link>
            </main>
        );
    }

    const otherEvents = signatureEvents
        .filter((item) => item.slug !== event.slug)
        .slice(0, 3);

    return (
        <main className="event-detail-page">
            <div className="event-detail-container">
                <Link to="/events" className="event-detail-back">
                    ← Back to Events
                </Link>

                <div className="event-detail-layout">
                    <article className="event-detail-main">
                        <header className="event-detail-header">
                            <span className="event-detail-category">
                                {event.category}
                            </span>

                            <h1>{event.title}</h1>

                            <p className="event-detail-intro">
                                {event.shortDescription}
                            </p>
                        </header>

                        {event.image && (
                            <figure className="event-detail-image">
                                <img src={event.image} alt={event.title} />
                            </figure>
                        )}

                        <section className="event-detail-content">
                            <h2>About This Event</h2>

                            {event.description && <p>{event.description}</p>}

                            {event.details?.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </section>

                        {(event.registrationLink ||
                            event.performerLink ||
                            event.volunteerLink) && (
                                <section className="event-action-section">
                                    <h2>Get Involved</h2>

                                    <div className="event-action-buttons">
                                        {event.registrationLink && (
                                            <a
                                                href={event.registrationLink}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="event-primary-button"
                                            >
                                                Register for Event
                                            </a>
                                        )}

                                        {event.performerLink && (
                                            <a
                                                href={event.performerLink}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="event-secondary-button"
                                            >
                                                Performer Registration
                                            </a>
                                        )}

                                        {event.volunteerLink && (
                                            <a
                                                href={event.volunteerLink}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="event-secondary-button"
                                            >
                                                Volunteer Registration
                                            </a>
                                        )}
                                    </div>
                                </section>
                            )}
                    </article>

                    <aside className="event-detail-sidebar">
                        <div className="event-information-card">
                            <h2>Program Overview</h2>

                            <div className="event-information-item">
                                <span>Semester</span>
                                <strong>{event.season}</strong>
                            </div>

                            <div className="event-information-item">
                                <span>Audience</span>
                                <strong>Everyone at WSU</strong>
                            </div>
                        </div>
                        <div className="event-information-card">
                            <h2>WHAT TO EXPECT</h2>

                            <div className="event-information-item">
                                Cultural performances
                            </div>

                            <div className="event-information-item">
                                Traditional food
                            </div>

                            <div className="event-information-item">
                                Community gathering
                            </div>
                        </div>

                        {otherEvents.length > 0 && (
                            <div className="other-events-card">
                                <h2>Other Events</h2>

                                {otherEvents.map((otherEvent) => (
                                    <article
                                        className="other-event-item"
                                        key={otherEvent.id}
                                    >
                                        <span>{otherEvent.category}</span>

                                        <h3>
                                            <Link to={`/events/${otherEvent.slug}`}>
                                                {otherEvent.title}
                                            </Link>
                                        </h3>

                                        <p>{formatEventDate(otherEvent.date)}</p>
                                    </article>
                                ))}
                            </div>
                        )}
                    </aside>
                </div>
            </div>
        </main>
    );
}

export default EventDetail;