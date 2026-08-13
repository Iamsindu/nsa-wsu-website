import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findAdminByEmail } from "../models/adminModel.js";

export async function loginAdmin(req, res) {
    try {
        // Get email + password from req.body
        const { email, password } = req.body;

        // Are email/password provided?
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        // findAdminByEmail(email)
        const admin = await findAdminByEmail(email);

        // Does admin exist?
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        // Is admin active?
        if (!admin.is_active) {
            return res.status(403).json({
                success: false,
                message: "Your account is inactive.",
            });
        }

        // bcrypt.compare(password, admin.password_hash)
        const passwordMatches = await bcrypt.compare(
            password,
            admin.password_hash
        );

        // Is password correct?
        if (!passwordMatches) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                id: admin.id,
                role: admin.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "1d",
            }
        );

        // Return token + admin information
        return res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            admin: {
                id: admin.id,
                first_name: admin.first_name,
                last_name: admin.last_name,
                email: admin.email,
                role: admin.role,
            },
        });

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}