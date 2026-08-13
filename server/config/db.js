import pg from "pg"

const { Pool } = pg

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing from server/.env")
}

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

pool.on("connect", () => {
    console.log("Connected to PostgreSQL")
})

pool.on("error", (error) => {
    console.error("Unexpected PostgreSQL error:", error)
})