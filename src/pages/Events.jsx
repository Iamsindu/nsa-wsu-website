import { signatureEvents, pastEvents, upcomingEvents } from "../data/eventsData"
import Card from "../components/Card"
import "../styles/Events.css"
import { Link } from "react-router-dom"

function Events() {
    return (
        <main>
            <section className="page-header">
                <p className="events-description">
                    Nepalese Student Association at WSU hosts and participates in cultural, social, and community events
                    that bring Nepali students and friends of Nepal together.
                </p>
            </section>

            <section className="events-section">
                <h2>Our Signature Events</h2>
                <div className="signature-grid">
                    {signatureEvents.map((event) => (
                        <Card key={event.title} className="event-card">
                            <p className="event-label">{event.season}</p>
                            <h3>{event.title}</h3>
                            <p className="event-date">{event.time}</p>
                            <p>{event.description}</p>
                            <div className="event-gallery-links">
                                <strong> See our Past Memories:</strong>
                                {event.galleries?.map((gallery) => (
                                    <a
                                        key={gallery.year}
                                        href={gallery.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {gallery.year}
                                    </a>
                                ))}
                            </div>
                            <Link to={`/events/${event.slug}`} className="event-card-link">
                                Learn More →
                            </Link>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="events-section">
                <h2>Our Past Events</h2>
                <div className="past-events-grid">
                    {pastEvents.map((event) => (
                        <Card key={event.title} className="event-card">
                            <h3>{event.title}</h3>
                            <p className="event-date">{event.date}</p>
                            <p>{event.description}</p>

                            {event.gallery && (
                                <a
                                    href={event.gallery}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="event-link"
                                >
                                    View Gallery
                                </a>
                            )}
                        </Card>
                    ))}
                </div>
            </section>

            <section className="events-section">
                <h2>Our Upcoming Events</h2>
                <div className="upcoming-list">
                    {upcomingEvents.map((event) => (
                        <span key={event}>{event}</span>
                    ))}
                </div>
                <p className="more-events">...and many exciting events coming up!</p>
            </section>
        </main>
    )
}

export default Events