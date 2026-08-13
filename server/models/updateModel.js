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