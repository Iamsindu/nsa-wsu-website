import { pool } from "../config/db.js"

export async function getPublishedUpdates() {
    const result = await pool.query(`
        SELECT
            id,
            title,
            slug,
            category,
            summary,
            content,
            image_url,
            image_caption,
            author_name,
            author_title,
            featured,
            published,
            published_at,
            created_at,
            updated_at
        FROM updates
        WHERE published = TRUE
        ORDER BY published_at DESC NULLS LAST, created_at DESC
    `)

    return result.rows
}

export async function getPublishedUpdateBySlug(slug) {
    const result = await pool.query(
        `
        SELECT
            id,
            title,
            slug,
            category,
            summary,
            content,
            image_url,
            image_caption,
            author_name,
            author_title,
            featured,
            published,
            published_at,
            created_at,
            updated_at
        FROM updates
        WHERE slug = $1
          AND published = TRUE
        LIMIT 1
        `,
        [slug]
    )

    return result.rows[0]
}

export async function getAllAdminUpdates() {
    const result = await pool.query(
        `
        SELECT *
        FROM updates
        WHERE is_archived = FALSE
        ORDER BY created_at DESC
        `
    );

    return result.rows;
}

export async function createUpdate({
    title,
    slug,
    category,
    summary,
    content,
    imageUrl,
    imageCaption,
    authorName,
    authorTitle,
    featured,
    published,
    publishedAt,
    createdBy,
}) {
    const result = await pool.query(
        `
        INSERT INTO updates (
            title,
            slug,
            category,
            summary,
            content,
            image_url,
            image_caption,
            author_name,
            author_title,
            featured,
            published,
            published_at,
            created_by
        )
        VALUES (
            $1, $2, $3, $4, $5,
            $6, $7, $8, $9, $10,
            $11, $12, $13
        )
        RETURNING *
        `,
        [
            title,
            slug,
            category,
            summary,
            content,
            imageUrl,
            imageCaption,
            authorName,
            authorTitle,
            featured,
            published,
            publishedAt,
            createdBy,
        ]
    );

    return result.rows[0];
}

export async function getAdminUpdateById(id) {
    const result = await pool.query(
        `
        SELECT *
        FROM updates
        WHERE id = $1
          AND is_archived = FALSE
        `,
        [id]
    );

    return result.rows[0];
}

export async function updateAdminUpdate(
    id,
    {
        title,
        slug,
        category,
        summary,
        content,
        imageUrl,
        imageCaption,
        authorName,
        authorTitle,
        featured,
        published,
        publishedAt,
        updatedBy,
    }
) {
    const result = await pool.query(
        `
        UPDATE updates
        SET
            title = $2,
            slug = $3,
            category = $4,
            summary = $5,
            content = $6,
            image_url = $7,
            image_caption = $8,
            author_name = $9,
            author_title = $10,
            featured = $11,
            published = $12,
            published_at = $13,
            updated_by = $14,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
          AND is_archived = FALSE
        RETURNING *
        `,
        [
            id,
            title,
            slug,
            category,
            summary,
            content,
            imageUrl,
            imageCaption,
            authorName,
            authorTitle,
            featured,
            published,
            publishedAt,
            updatedBy,
        ]
    );

    return result.rows[0];
}