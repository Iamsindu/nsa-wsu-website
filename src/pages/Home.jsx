import { Link } from "react-router-dom"
import "../styles/Home.css"
import { pastEvents } from "../data/eventsData";

function Home() {
    return (
        <main className="home-page">
            <section className="hero-section">
                <div className="hero-overlay"></div>

                <div className="hero-content">
                    <p className="hero-tagline">
                        Nepalese Student Association
                    </p>

                    <h1>
                        Building <span className="nepal-red">C</span>ommunity,
                        <br />
                        Celebrating <span className="nepal-blue">C</span>ulture.
                    </h1>

                    <p className="hero-description">
                        The Nepalese Student Association at Wright State University brings
                        students together to celebrate Nepali culture, create meaningful
                        connections, and build a home away from home.
                    </p>

                    <div className="hero-buttons">
                        <Link to="/about" className="primary-btn">
                            Learn More
                        </Link>

                        <Link to="/events" className="secondary-btn">
                            View Events
                        </Link>
                    </div>

                    <div className="hero-location">

                        Established 2023 • Wright State University • Dayton, Ohio
                    </div>
                </div>
            </section>

            <section className="home-about">
                <div className="home-about-content">
                    <p className="section-label">Who We Are</p>

                    <h2>Bringing Nepal Together at Wright State</h2>

                    <p>
                        Founded in 2023, the Nepalese Student Association at Wright State
                        University brings students together through culture, friendship, and
                        community. We create a welcoming space where Nepali students can feel
                        connected, supported, and proud to share their heritage.
                    </p>

                    Creating a home away from home since 2023.
                </div>

                <div className="home-about-highlights">
                    <div className="highlight-item">
                        <strong>500+</strong>
                        <span>Community Members</span>
                    </div>

                    <div className="highlight-item">
                        <strong> 9+ </strong>
                        <span>Events Hosted</span>
                    </div>

                    <div className="highlight-item">
                        <strong>3+</strong>
                        <span>Years Growing</span>
                    </div>
                </div>
            </section>

            <section className="featured-events">
                <div className="featured-events-header">
                    <div>
                        <p className="section-label">WHAT WE DO</p>
                        <h2>Moments That Bring Us Together</h2>
                        <p>
                            Explore some of the memorable cultural celebrations, community
                            gatherings, and events organized by NSA WSU.
                        </p>
                    </div>
                </div>

                <div className="featured-events-grid">
                    {pastEvents?.map((event) => (
                        <article className="featured-event-card" key={event.title}>
                            <img
                                src={event.image}
                                alt={event.title}
                                className="featured-event-image"
                            />

                            <div className="featured-event-content">
                                <h3>{event.title}</h3>

                                <p className="featured-event-date">
                                    {event.date} | {event.location}
                                </p>


                                <p className="featured-event-description">
                                    {event.description}
                                </p>

                                <Link
                                    to="/events"
                                    className="home-about-link"
                                >
                                    Learn More →
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="journey">
                <div className="journey-content">
                    <div className="journey-text">
                        <span className="section-label">JOIN OUR COMMUNITY</span>
                        <h2>Your Journey Starts Here</h2>

                        <p>
                            Starting university in a new country can feel overwhelming,
                            but you don't have to do it alone.
                        </p>

                        <p>
                            At NSA WSU, you'll find friendship, cultural celebrations,
                            leadership opportunities, and a family that supports you
                            every step of the way. Whether you're arriving at Wright
                            State for the first time or simply looking to connect with
                            fellow Nepali students, there's always a place for you here.
                        </p>

                        <div className="journey-buttons">
                            <a href="https://wright.campuslabs.com/engage/organization/nsa" target="_blank" className="primary-btn">
                                Become a Member
                            </a>

                            <a href="/contact" className="secondary-btn">
                                Contact Us
                            </a>
                        </div>

                    </div>

                    <div className="journey-image">
                        <img
                            src="/images/team.jpg"
                            alt="NSA WSU Students"
                        />
                    </div>

                </div>
            </section>

            <section className="quote-section">
                <div className="quote-overlay">
                    <div className="quote-content">
                        <p className="quote-text">
                            No matter how far we are from Nepal, we carry our culture,
                            traditions, and sense of home wherever we go.                        </p>
                        <div className="quote-divider"></div>
                        <p className="quote-author">
                            Nepalese Student Association <br />
                            Wright State University
                        </p>
                    </div>
                </div>
            </section>
        </main >
    )
}

export default Home