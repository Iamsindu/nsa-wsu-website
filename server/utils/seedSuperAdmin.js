import "dotenv/config";
import bcrypt from "bcrypt";
import { pool } from "../config/db.js";

const {
    SUPER_ADMIN_FIRST_NAME,
    SUPER_ADMIN_LAST_NAME,
    SUPER_ADMIN_EMAIL,
    SUPER_ADMIN_PASSWORD,
} = process.env;

async function seedSuperAdmin() {
    try {

        // 1. validate env variables
        if (
            !SUPER_ADMIN_FIRST_NAME ||
            !SUPER_ADMIN_LAST_NAME ||
            !SUPER_ADMIN_EMAIL ||
            !SUPER_ADMIN_PASSWORD
        ) {
            throw new Error("Missing Super Admin environment variables.");
        }

        // 2. check existing admin
        const existingAdmin = await pool.query(
            "SELECT id FROM admins WHERE email = $1",
            [SUPER_ADMIN_EMAIL]
        );
        if (existingAdmin.rows.length > 0) {
            console.log("Super Admin already exists.");
            return;
        }

        // 3. bcrypt password
        const passwordHash = await bcrypt.hash(
            SUPER_ADMIN_PASSWORD,
            12
        );

        // 4. INSERT INTO admins
        const result = await pool.query(
            `
    INSERT INTO admins (
        first_name,
        last_name,
        email,
        password_hash,
        role
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, first_name, last_name, email, role
    `,
            [
                SUPER_ADMIN_FIRST_NAME,
                SUPER_ADMIN_LAST_NAME,
                SUPER_ADMIN_EMAIL,
                passwordHash,
                "SUPER_ADMIN",
            ]
        );
        // 5. console.log success
        console.log("Super Admin created successfully:");
        console.log(result.rows[0]);

    } catch (error) {

        console.error("Failed to seed Super Admin:", error);

    } finally {

        await pool.end();

    }
}

seedSuperAdmin();