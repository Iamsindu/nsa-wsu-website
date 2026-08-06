import { Link } from "react-router-dom";
import { updates, upcomingDeadlines } from "../data/updates";
import "../styles/Updates.css";
import { getCurrentDate } from "../utils/date";

function formatUpdateDate(date) {
    const updateDate = new Date(`${date}T00:00:00`);

    return {
        month: updateDate
            .toLocaleDateString("en-US", { month: "short" })
            .toUpperCase(),
        day: updateDate.toLocaleDateString("en-US", { day: "2-digit" }),
        fullDate: updateDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        }),
    };
}

function UpdateLink({
    update,
    className = "update-link",
    children,
}) {
    if (update.externalLink) {
        return (
            <a
                href={update.externalLink}
                target="_blank"
                rel="noreferrer"
                className={className}
            >
                {children}
            </a>
        );
    }

    return (
        <Link
            to={`/news/${update.slug}`}
            className={className}
        >
            {children}
        </Link>
    );
}

function Updates() {
    const featuredUpdate =
        updates.find((update) => update.featured) || updates[0];

    const headlineUpdates = updates
        .filter((update) => update.id !== featuredUpdate?.id)
        .slice(0, 3);

    const recentUpdates = updates.filter(
        (update) => update.id !== featuredUpdate?.id
    );

    const currentDate = getCurrentDate();

    return (
        <main className="updates-page">
            <section className="updates-page-header">
                <div className="updates-container updates-header-layout">
                    <div className="updates-header-content">
                        <p className="updates-kicker">NSA WSU NEWSROOM</p>

                        <h1>Latest Updates</h1>

                        <p className="updates-header-description">
                            Announcements, events, achievements, and community news from NSA WSU.
                        </p>
                    </div>

                    <div className="updates-header-date">
                        <span>{currentDate.weekday}</span>
                        <strong>{currentDate.date}</strong>
                    </div>
                </div>
            </section>

            <section className="newsroom-main-section">
                <div className="updates-container newsroom-layout">
                    {featuredUpdate && (
                        <article className="featured-story">
                            <div className="featured-story-image">
                                <img
                                    src={featuredUpdate.image}
                                    alt={featuredUpdate.title}
                                />

                                <div className="featured-story-overlay">
                                    <span className="featured-story-label">
                                        Featured Update
                                    </span>

                                    <h2>{featuredUpdate.title}</h2>

                                    <p>{featuredUpdate.description}</p>

                                    <UpdateLink
                                        update={featuredUpdate}
                                        className="featured-story-link"
                                    >
                                        Continue Reading →
                                    </UpdateLink>
                                </div>
                            </div>
                        </article>
                    )}

                    <aside className="headlines-panel">
                        <div className="section-title-row">
                            <h2>Recent Headlines</h2>
                        </div>

                        <div className="headline-list">
                            {headlineUpdates.map((update) => {
                                const date = formatUpdateDate(update.date);

                                return (
                                    <article className="headline-item" key={update.id}>
                                        <div className="headline-date">
                                            <span>{date.month}</span>
                                            <strong>{date.day}</strong>
                                        </div>

                                        <div className="headline-content">
                                            <span className="headline-category">
                                                {update.category}
                                            </span>

                                            <h3>
                                                <UpdateLink
                                                    update={update}
                                                    className="headline-title-link"
                                                >
                                                    {update.title}
                                                </UpdateLink>
                                            </h3>

                                            <p>{update.description}</p>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </aside>
                </div>
            </section>

            <section className="recent-updates-section">
                <div className="updates-container">
                    <div className="updates-section-header">
                        <div>
                            <p className="updates-kicker">More from NSA WSU</p>
                            <h2>Recent Updates</h2>
                        </div>

                    </div>

                    <div className="updates-content-layout">
                        <div className="recent-updates-list">
                            {recentUpdates.map((update) => {
                                const date = formatUpdateDate(update.date);

                                return (
                                    <article className="news-list-card" key={update.id}>
                                        <UpdateLink
                                            update={update}
                                            className="news-list-card-image"
                                        >
                                            <img src={update.image} alt={update.title} />
                                        </UpdateLink>

                                        <div className="news-list-card-content">
                                            <div className="news-list-card-meta">
                                                <span className="news-list-category">
                                                    {update.category}
                                                </span>

                                                <span>{date.fullDate}</span>
                                            </div>

                                            <h3>
                                                <UpdateLink
                                                    update={update}
                                                    className="news-list-title"
                                                >
                                                    {update.title}
                                                </UpdateLink>
                                            </h3>

                                            <p>{update.description}</p>

                                            <UpdateLink update={update} className="news-list-link">
                                                Read More →
                                            </UpdateLink>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>

                        <aside className="updates-sidebar">
                            <div className="deadline-panel">
                                <div className="sidebar-heading">
                                    <span>◆</span>
                                    <h2>Upcoming Deadlines</h2>
                                </div>

                                <div className="deadline-list">
                                    {upcomingDeadlines.map((deadline) => (
                                        <div className="deadline-item" key={deadline.id}>
                                            <div className="deadline-date">
                                                <span>{deadline.month}</span>
                                                <strong>{deadline.day}</strong>
                                            </div>

                                            <p>{deadline.title}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="community-panel">
                                <span className="community-panel-label">Get Involved</span>

                                <h2>Have an idea for NSA WSU?</h2>

                                <p>
                                    Share your suggestions for future programs, workshops, social
                                    gatherings, and community initiatives.
                                </p>

                                <a
                                    href="https://forms.gle/491MqeU1enDCF2K86"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="community-panel-button"
                                >
                                    Submit an Idea →
                                </a>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Updates;