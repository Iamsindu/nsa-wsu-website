import jwt from "jsonwebtoken";

export function authenticateAdmin(req, res, next) {
    try {

        // 1. Get token from request
        const authHeader = req.headers.authorization;

        // 2. Make sure token exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const token = authHeader.split(" ")[1];

        // 3. Verify token using JWT_SECRET
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.admin = decoded;
        next();
    } catch (error) {
        console.error("Authentication error:", error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
}