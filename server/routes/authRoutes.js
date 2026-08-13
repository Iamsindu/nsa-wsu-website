import express from "express";
import { loginAdmin } from "../controllers/authController.js";
import { authenticateAdmin } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

router.post("/login", loginAdmin);
// router.get("/me", authenticateAdmin, (req, res) => {
//     return res.status(200).json({
//         success: true,
//         message: "You are authenticated!",
//         admin: req.admin,
//     });
// });

router.get(
    "/me",
    authenticateAdmin,
    authorizeRoles("ADMIN"),
    (req, res) => {
        return res.status(200).json({
            success: true,
            message: "You are authorized!",
            admin: req.admin,
        });
    }
);

export default router;