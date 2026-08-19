import "dotenv/config"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

import { pool } from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import updateRoutes from "./routes/updateRoutes.js"
import adminUpdateRoutes from "./routes/adminUpdateRoutes.js"

const app = express()
const PORT = process.env.PORT || 5050

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use(express.json())
app.use(cookieParser());

app.get("/api/health", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                NOW() AS database_time,
                current_database() AS database_name
        `)

        res.status(200).json({
            success: true,
            message: "NSA WSU API and PostgreSQL are running",
            database: result.rows[0],
        })
    } catch (error) {
        console.error("Database connection failed:", error.message)

        res.status(500).json({
            success: false,
            message: "API is running, but PostgreSQL connection failed",
        })
    }
})

app.use("/api/auth", authRoutes);
app.use("/api/updates", updateRoutes);
app.use("/api/admin/updates", adminUpdateRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    })
})

app.listen(PORT, () => {
    console.log(`NSA WSU server running at http://localhost:${PORT}`)
})