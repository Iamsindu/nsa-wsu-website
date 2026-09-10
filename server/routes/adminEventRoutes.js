import express from "express";

import {
    getAllAdminEventsController,
    getAdminEventByIdController,
    createEventController,
    archiveEventController,
    updateAdminEventController,
} from "../controllers/eventController.js";

import { authenticateAdmin } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import uploadImage from "../middleware/uploadMiddleware.js";


const router = express.Router();

router.get(
    "/",
    authenticateAdmin,
    getAllAdminEventsController
);

router.get(
    "/:id",
    authenticateAdmin,
    getAdminEventByIdController
);

router.post(
    "/",
    authenticateAdmin,
    authorizeRoles(
        "SUPER_ADMIN",
        "ADMIN",
        "CONTENT_MANAGER"
    ),
    uploadImage.single("image"),
    createEventController
);

router.delete(
    "/:id",
    authenticateAdmin,
    authorizeRoles(
        "SUPER_ADMIN",
        "ADMIN",
        "CONTENT_MANAGER"
    ),
    archiveEventController
);

router.put(
    "/:id",
    authenticateAdmin,
    authorizeRoles(
        "SUPER_ADMIN",
        "ADMIN",
        "CONTENT_MANAGER"
    ),
    uploadImage.single("image"),
    updateAdminEventController
);

export default router;