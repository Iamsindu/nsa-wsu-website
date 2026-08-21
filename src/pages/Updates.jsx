import { Link } from "react-router-dom";
import { upcomingDeadlines } from "../data/updates";
import "../styles/Updates.css";
import { getCurrentDate } from "../utils/date";
import { useEffect, useState } from "react";
import { getUpdates } from "../services/updateService";
import { truncateText } from "../constants/common";

function formatUpdateDate(date) {
    if (!date) {
        return {
            month: "",
            day: "",
            fullDate: "",
        };
    }

    const updateDate = new Date(date);

    if (Number.isNaN(updateDate.getTime())) {
        return {
            month: "",
            day: "",
            fullDate: "",
        };
    }

    return {
        month: updateDate
            .toLocaleDateString("en-US", {
                month: "short",
            })
            .toUpperCase(),

        day: updateDate.toLocaleDateString("en-US", {
            day: "2-digit",
        }),

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
    return (
        <Link
            to={`/updates/${update.slug}`}
            className={className}
        >
            {children}
        </Link>
    );
}

function Updates() {
    const currentDate = getCurrentDate();

    const [updates, setUpdates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        async function loadUpdates() {
            try {
                const data = await getUpdates();

                setUpdates(data);
            } catch (error) {
                console.error("Failed to load updates:", error);

                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadUpdates();
    }, []);


    // Featured article:
    // Use an explicitly featured update first.
    // Otherwise use the newest published update.
    const featuredUpdate =
        updates.find((update) => update.featured) ||
        updates[0];


    // Next 3 articles become headlines.
    const headlineUpdates = updates
        .filter(
            (update) =>
                update.id !== featuredUpdate?.id
        )
        .slice(0, 3);


    // Prevent headline articles from being repeated
    // immediately under Recent Updates.
    const headlineIds = headlineUpdates.map(
        (update) => update.id
    );


    const recentUpdates = updates.filter(
        (update) =>
            update.id !== featuredUpdate?.id &&
            !headlineIds.includes(update.id)
    );


    if (loading) {
        return (
            <main className="updates-page">
                <div className="updates-container">
                    <p>Loading updates...</p>
                </div>
            </main>
        );
    }


    if (error) {
        return (
            <main className="updates-page">
                <div className="updates-container">
                    <p>{error}</p>
                </div>
            </main>
        );
    }


    return (
        <main className="updates-page">

            {/* PAGE HEADER */}
            <section className="updates-page-header">
                <div className="updates-container updates-header-layout">

                    <div className="updates-header-content">
                        <p className="updates-kicker">
                            NSA WSU NEWSROOM
                        </p>

                        <h1>Latest Updates</h1>

                        <p className="updates-header-description">
                            Announcements, events, achievements,
                            and community news from NSA WSU.
                        </p>
                    </div>


                    <div className="updates-header-date">
                        <span>{currentDate.weekday}</span>
                        <strong>{currentDate.date}</strong>
                    </div>

                </div>
            </section>


            {/* FEATURED + HEADLINES */}
            <section className="newsroom-main-section">
                <div className="updates-container newsroom-layout">

                    {featuredUpdate && (
                        <article className="featured-story">

                            <div className="featured-story-image">

                                {featuredUpdate.image_url && (
                                    <img
                                        src={featuredUpdate.image_url}
                                        alt={featuredUpdate.title}
                                    />
                                )}

                                <div className="featured-story-overlay">

                                    <span className="featured-story-label">
                                        Featured Update
                                    </span>

                                    <h2>
                                        {featuredUpdate.title}
                                    </h2>

                                    <p>
                                        {featuredUpdate.summary}
                                    </p>

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

                            {headlineUpdates.length === 0 ? (
                                <p>No additional headlines yet.</p>
                            ) : (
                                headlineUpdates.map((update) => {

                                    const date =
                                        formatUpdateDate(
                                            update.published_at
                                        );

                                    return (
                                        <article
                                            className="headline-item"
                                            key={update.id}
                                        >

                                            <div className="headline-date">

                                                {date.month && (
                                                    <>
                                                        <span>
                                                            {date.month}
                                                        </span>

                                                        <strong>
                                                            {date.day}
                                                        </strong>
                                                    </>
                                                )}

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

                                                {update.summary && (
                                                    <p>
                                                        {truncateText(update.summary)}
                                                    </p>
                                                )}

                                            </div>

                                        </article>
                                    );
                                })
                            )}

                        </div>
                    </aside>

                </div>
            </section>


            {/* RECENT UPDATES */}
            <section className="recent-updates-section">
                <div className="updates-container">

                    <div className="updates-section-header">

                        <div>
                            <p className="updates-kicker">
                                More from NSA WSU
                            </p>

                            <h2>Recent Updates</h2>
                        </div>

                    </div>


                    <div className="updates-content-layout">

                        <div className="recent-updates-list">

                            {recentUpdates.length === 0 ? (
                                <p>
                                    More updates will be added soon.
                                </p>
                            ) : (
                                recentUpdates.map((update) => {

                                    const date =
                                        formatUpdateDate(
                                            update.published_at
                                        );

                                    return (
                                        <article
                                            className="news-list-card"
                                            key={update.id}
                                        >

                                            <UpdateLink
                                                update={update}
                                                className="news-list-card-image"
                                            >
                                                {update.image_url && (
                                                    <img
                                                        src={
                                                            update.image_url
                                                        }
                                                        alt={
                                                            update.title
                                                        }
                                                    />
                                                )}
                                            </UpdateLink>


                                            <div className="news-list-card-content">

                                                <div className="news-list-card-meta">

                                                    <span className="news-list-category">
                                                        {update.category}
                                                    </span>

                                                    {date.fullDate && (
                                                        <span>
                                                            {
                                                                date.fullDate
                                                            }
                                                        </span>
                                                    )}

                                                </div>


                                                <h3>
                                                    <UpdateLink
                                                        update={update}
                                                        className="news-list-title"
                                                    >
                                                        {update.title}
                                                    </UpdateLink>
                                                </h3>


                                                {update.summary && (
                                                    <p>
                                                        {update.summary}
                                                    </p>
                                                )}


                                                <UpdateLink
                                                    update={update}
                                                    className="news-list-link"
                                                >
                                                    Read More →
                                                </UpdateLink>

                                            </div>

                                        </article>
                                    );
                                })
                            )}

                        </div>


                        {/* SIDEBAR */}
                        <aside className="updates-sidebar">

                            {/* DEADLINES */}
                            <div className="deadline-panel">

                                <div className="sidebar-heading">
                                    <span>◆</span>
                                    <h2>
                                        Upcoming Deadlines
                                    </h2>
                                </div>


                                <div className="deadline-list">

                                    {upcomingDeadlines.map(
                                        (deadline) => (
                                            <div
                                                className="deadline-item"
                                                key={deadline.id}
                                            >

                                                <div className="deadline-date">

                                                    <span>
                                                        {
                                                            deadline.month
                                                        }
                                                    </span>

                                                    <strong>
                                                        {
                                                            deadline.day
                                                        }
                                                    </strong>

                                                </div>


                                                <p>
                                                    {
                                                        deadline.title
                                                    }
                                                </p>

                                            </div>
                                        )
                                    )}

                                </div>

                            </div>


                            {/* GET INVOLVED */}
                            <div className="community-panel">

                                <span className="community-panel-label">
                                    Get Involved
                                </span>

                                <h2>
                                    Have an idea for NSA WSU?
                                </h2>

                                <p>
                                    Share your suggestions for future
                                    programs, workshops, social
                                    gatherings, and community
                                    initiatives.
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