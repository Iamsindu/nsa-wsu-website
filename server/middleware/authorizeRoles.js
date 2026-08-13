export function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {

        const role = req.admin.role;

        if (!allowedRoles.includes(role)) {
            return res.status(403).json({
                success: false,
                message: "Not allowed to perform this action.",
            });
        }

        next();
    };
}