import express from "express";

import {
    getAllPublishedEvents,
    getPublishedEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.get("/", getAllPublishedEvents);
router.get("/:slug", getPublishedEvent);

export default router;