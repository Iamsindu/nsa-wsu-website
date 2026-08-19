import express from "express";

import {
    createUpdateController,
    getAllAdminUpdatesController,
} from "../controllers/updateController.js";

import { authenticateAdmin } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import uploadImage from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get(
    "/",
    authenticateAdmin,
    getAllAdminUpdatesController
);

router.post(
    "/",
    authenticateAdmin,
    authorizeRoles("SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER"),
    uploadImage.single("image"),
    createUpdateController
);

export default router;