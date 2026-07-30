import { Link, useParams } from "react-router-dom";
import { updates } from "../data/updates";
import "../styles/UpdateDetails.css";

function formatDate(date) {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

function NewsDetail() {
    const { slug } = useParams();

    const update = updates.find((item) => item.slug === slug);

    if (!update) {
        return (
            <main className="news-detail-not-found">
                <h1>Update Not Found</h1>
                <Link to="/news">Back to Updates</Link>
            </main>
        );
    }

    const relatedUpdates = updates
        .filter((item) => item.slug !== update.slug)
        .slice(0, 4);

    return (
        <main className="news-detail-page">
            <div className="news-detail-container">
                <Link to="/news" className="news-detail-back">
                    ← Back to Updates
                </Link>

                <div className="news-detail-layout">
                    <article className="news-article">
                        <header className="news-article-header">
                            <span className="news-detail-category">
                                {update.category}
                            </span>

                            <h1>{update.title}</h1>

                            {update.subtitle && (
                                <p className="news-article-subtitle">
                                    {update.subtitle}
                                </p>
                            )}

                            <div className="news-article-meta">
                                <span>By NSA WSU</span>
                                <span>{formatDate(update.date)}</span>
                            </div>
                        </header>

                        {update.image && (
                            <figure className="news-detail-image">
                                <img src={update.image} alt={update.title} />

                                {update.imageCaption && (
                                    <figcaption>{update.imageCaption}</figcaption>
                                )}
                            </figure>
                        )}

                        <div className="news-detail-content">
                            {update.content?.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </article>

                    <aside className="news-detail-sidebar">
                        <div className="news-detail-sidebar-header">
                            <span className="news-detail-sidebar-icon">◆</span>
                            <h2>Recent Headlines</h2>
                        </div>

                        <div className="news-detail-headlines">
                            {relatedUpdates.map((item) => {
                                const date = new Date(`${item.date}T00:00:00`);

                                const month = date
                                    .toLocaleDateString("en-US", { month: "short" })
                                    .toUpperCase();

                                const day = date.toLocaleDateString("en-US", {
                                    day: "2-digit",
                                });

                                return (
                                    <article
                                        className="news-detail-headline"
                                        key={item.id}
                                    >
                                        <div className="news-detail-headline-date">
                                            <span>{month}</span>
                                            <strong>{day}</strong>
                                        </div>

                                        <div>
                                            <span className="news-detail-headline-category">
                                                {item.category}
                                            </span>

                                            <h3>
                                                <Link to={`/news/${item.slug}`}>
                                                    {item.title}
                                                </Link>
                                            </h3>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}

export default NewsDetail;