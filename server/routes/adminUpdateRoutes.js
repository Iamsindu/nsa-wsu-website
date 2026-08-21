import express from "express";

import {
    archiveUpdateController,
    createUpdateController,
    getAdminUpdateByIdController,
    getAllAdminUpdatesController,
    updateUpdateController,
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

router.get(
    "/:id",
    authenticateAdmin,
    getAdminUpdateByIdController
);

router.put(
    "/:id",
    authenticateAdmin,
    authorizeRoles("SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER"),
    uploadImage.single("image"),
    updateUpdateController
);

router.delete(
    "/:id",
    authenticateAdmin,
    authorizeRoles(
        "SUPER_ADMIN",
        "ADMIN",
        "CONTENT_MANAGER"
    ),
    archiveUpdateController
);

export default router;