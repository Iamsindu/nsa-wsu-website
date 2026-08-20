import { Link, useParams } from "react-router-dom";
import "../styles/UpdateDetails.css";
import { useEffect, useState } from "react";
import { getUpdateBySlug } from "../services/updateService";
import { UPDATES } from "../constants/route";

export function formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function NewsDetail() {
    const { slug } = useParams();
    const [update, setUpdate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadUpdateBySlug() {
            try {
                const data = await getUpdateBySlug(slug)
                setUpdate(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadUpdateBySlug()
    }, [])

    if (loading) {
        return <p>Loading updates...</p>
    }
    if (error) {
        return <p>{error}</p>
    }

    if (!update) {
        return (
            <>
                <h1>Update Not Found</h1>
                <Link to={UPDATES}>Back to Updates</Link>
            </>
        )
    }

    // const relatedUpdates = update
    //     .filter((item) => item.slug !== update.slug)
    //     .slice(0, 4);

    console.log(update);

    return (
        <main className="news-detail-page">
            <div className="news-detail-container">
                <Link to={UPDATES} className="news-detail-back">
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
                                    {update.summary}
                                </p>
                            )}

                            <div className="news-article-meta">
                                <span>{update.author_name}</span>
                                <span>{formatDate(update.published_at)}</span>
                            </div>
                        </header>

                        {update.image_url && (
                            <figure className="news-detail-image">
                                <img src={update.image_url} alt={update.title} />

                                {update.image_caption && (
                                    <figcaption>{update.image_caption}</figcaption>
                                )}
                            </figure>
                        )}

                        <div className="news-detail-content">
                            {update.content.split("\n").map((paragraph, index) => (
                                paragraph.trim() && <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </article>

                    <aside className="news-detail-sidebar">
                        <div className="news-detail-sidebar-header">
                            <span className="news-detail-sidebar-icon">◆</span>
                            <h2>Recent Headlines</h2>
                        </div>

                        <div className="news-detail-headlines">
                            {/* {relatedUpdates.map((item) => {
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
                            })} */}
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}

export default NewsDetail;