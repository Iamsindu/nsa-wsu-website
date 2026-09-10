import express from "express";

import {
    getAllPublishedUpdates,
    getPublishedUpdate,
} from "../controllers/updateController.js";

const router = express.Router();

router.get("/", getAllPublishedUpdates);
router.get("/:slug", getPublishedUpdate);

export default router;