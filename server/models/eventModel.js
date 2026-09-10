import { pool } from "../config/db.js";


export async function getPublishedEvents() {
    const result = await pool.query(`
        SELECT
            id,
            title,
            slug,
            summary,
            description,
            image_url,
            image_caption,
            event_date,
            recurring_event,
            location,
            external_link,
            featured,
            published,
            published_at,
            created_at,
            updated_at
        FROM events
        WHERE published = TRUE
          AND is_archived = FALSE
        ORDER BY event_date ASC
    `);

    return result.rows;
}


export async function getPublishedEventBySlug(slug) {
    const result = await pool.query(
        `
        SELECT
            id,
            title,
            slug,
            summary,
            description,
            image_url,
            image_caption,
            event_date,
            recurring_event,
            location,
            external_link,
            featured,
            published,
            published_at,
            created_at,
            updated_at
        FROM events
        WHERE slug = $1
          AND published = TRUE
          AND is_archived = FALSE
        `,
        [slug]
    );

    return result.rows[0];
}

export async function getAllAdminEvents() {
    const result = await pool.query(
        `
        SELECT *
        FROM events
        WHERE is_archived = FALSE
        ORDER BY created_at DESC
        `
    );

    return result.rows;
}

export async function getAdminEventById(id) {
    const result = await pool.query(
        `
        SELECT *
        FROM events
        WHERE id = $1
          AND is_archived = FALSE
        `,
        [id]
    );

    return result.rows[0];
}

export async function createEvent({
    title,
    slug,
    summary,
    description,

    imageUrl,
    imageCaption,

    eventDate,
    location,

    recurringEvent,
    externalLink,

    featured,
    published,
    publishedAt,

    createdBy,
}) {
    const result = await pool.query(
        `
        INSERT INTO events (
            title,
            slug,
            summary,
            description,

            image_url,
            image_caption,

            event_date,
            location,

            recurring_event,
            external_link,

            featured,
            published,
            published_at,

            created_by
        )
        VALUES (
            $1, $2, $3, $4,
            $5, $6,
            $7, $8,
            $9, $10,
            $11, $12, $13,
            $14
        )
        RETURNING *
        `,
        [
            title,
            slug,
            summary,
            description,

            imageUrl,
            imageCaption,

            eventDate,
            location,

            recurringEvent,
            externalLink,

            featured,
            published,
            publishedAt,

            createdBy,
        ]
    );

    return result.rows[0];
}

export async function archiveEvent(id, archivedBy) {
    const result = await pool.query(
        `
        UPDATE events
        SET
            is_archived = TRUE,
            archived_at = CURRENT_TIMESTAMP,
            archived_by = $2,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
          AND is_archived = FALSE
        RETURNING *
        `,
        [id, archivedBy]
    );

    return result.rows[0];
}

export async function getEventBySlug(slug) {
    const result = await pool.query(
        `
        SELECT id
        FROM events
        WHERE slug = $1
        LIMIT 1
        `,
        [slug]
    );

    return result.rows[0];
}

export async function updateAdminEvent(
    id,
    {
        title,
        slug,
        summary,
        description,

        imageUrl,
        imageCaption,

        eventDate,
        location,

        recurringEvent,
        externalLink,

        featured,
        published,
        publishedAt,

        updatedBy,
    }
) {
    const result = await pool.query(
        `
        UPDATE events
        SET
            title = $2,
            slug = $3,
            summary = $4,
            description = $5,

            image_url = $6,
            image_caption = $7,

            event_date = $8,
            location = $9,

            recurring_event = $10,
            external_link = $11,

            featured = $12,
            published = $13,
            published_at = $14,

            updated_by = $15,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
          AND is_archived = FALSE
        RETURNING *
        `,
        [
            id,
            title,
            slug,
            summary,
            description,
            imageUrl,
            imageCaption,
            eventDate,
            location,
            recurringEvent,
            externalLink,
            featured,
            published,
            publishedAt,
            updatedBy,
        ]
    );

    return result.rows[0];
}