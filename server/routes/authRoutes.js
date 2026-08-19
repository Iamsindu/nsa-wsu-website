import express from "express";
import { getCurrentAdmin, loginAdmin, logoutAdmin } from "../controllers/authController.js";
import { authenticateAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get(
    "/me",
    authenticateAdmin,
    getCurrentAdmin
);

router.post(
    "/logout",
    authenticateAdmin,
    logoutAdmin
);

export default router;