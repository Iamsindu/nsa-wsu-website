import { pool } from "../config/db.js";

export async function findAdminByEmail(email) {
    const result = await pool.query(
        `
    SELECT
        id,
        first_name,
        last_name,
        email,
        password_hash,
        role,
        is_active,
        last_login,
        created_at
    FROM admins
    WHERE email = $1
    `,
        [email]
    );

    return result.rows[0];
}
