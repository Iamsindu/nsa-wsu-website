import jwt from "jsonwebtoken";

export function authenticateAdmin(req, res, next) {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

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