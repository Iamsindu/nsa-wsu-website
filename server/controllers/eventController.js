import {
    getPublishedEvents,
    getPublishedEventBySlug,
    getAllAdminEvents,
    getAdminEventById,
    createEvent,
    archiveEvent,
    getEventBySlug,
    updateAdminEvent,
} from "../models/eventModel.js";
import { uploadImageService } from "../services/imageService.js";


export async function getAllPublishedEvents(req, res) {
    try {
        const events = await getPublishedEvents();

        return res.status(200).json({
            success: true,
            count: events.length,
            data: events,
        });

    } catch (error) {
        console.error("Get published events error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch events.",
        });
    }
}


export async function getPublishedEvent(req, res) {
    try {
        const { slug } = req.params;

        const event = await getPublishedEventBySlug(slug);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found.",
            });
        }

        return res.status(200).json({
            success: true,
            data: event,
        });

    } catch (error) {
        console.error("Get published event error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch event.",
        });
    }
}

export async function getAllAdminEventsController(req, res) {
    try {
        const events = await getAllAdminEvents();

        return res.status(200).json({
            success: true,
            count: events.length,
            data: events,
        });
    } catch (error) {
        console.error("Get admin events error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch events.",
        });
    }
}

export async function getAdminEventByIdController(req, res) {
    try {
        const { id } = req.params;

        const event = await getAdminEventById(id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found.",
            });
        }

        return res.status(200).json({
            success: true,
            data: event,
        });
    } catch (error) {
        console.error("Get admin event error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch event.",
        });
    }
}

export async function createEventController(req, res) {
    try {
        const {
            title,
            summary,
            description,
            imageCaption,

            eventDate,
            location,
            recurringEvent,

            externalLink,
            featured,
            published,
        } = req.body;


        // Required fields
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required.",
            });
        }


        // Convert FormData strings to booleans
        const isFeatured = featured === "true";
        const isPublished = published === "true";


        // Generate base slug
        const baseSlug = title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");

        // For now, include the year when available.
        // Example: dashain-2083-2026
        let slug =
            recurringEvent
                ? `${baseSlug}-${recurringEvent}`
                : baseSlug;

        const existingEvent = await getEventBySlug(slug);

        if (existingEvent) {
            slug = `${slug}-${Date.now()}`;
        }

        // Cover image
        let imageUrl = null;
        if (req.file) {
            const uploadedImage = await uploadImageService(
                req.file.buffer,
                "nsa-wsu/events"
            );

            imageUrl = uploadedImage.secure_url;
        }

        // Only set published_at when publishing
        const publishedAt = isPublished
            ? new Date()
            : null;


        const event = await createEvent({
            title,
            slug,

            summary: summary || null,
            description: description || null,

            imageUrl,
            imageCaption: imageCaption || null,

            eventDate: eventDate || null,
            location: location || null,
            recurringEvent: recurringEvent || null,
            externalLink:
                externalLink || null,

            featured: isFeatured,
            published: isPublished,
            publishedAt,

            createdBy: req.admin.id,
        });


        return res.status(201).json({
            success: true,

            message: isPublished
                ? "Event published successfully."
                : "Event saved as draft.",

            data: event,
        });

    } catch (error) {
        console.error("Create event error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to create event.",
        });
    }
}

export async function archiveEventController(req, res) {
    try {
        const { id } = req.params;

        const event = await getAdminEventById(id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found.",
            });
        }

        if (
            req.admin.role === "CONTENT_MANAGER" &&
            event.created_by !== req.admin.id
        ) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to delete this event.",
            });
        }

        const archivedEvent = await archiveEvent(
            id,
            req.admin.id
        );

        return res.status(200).json({
            success: true,
            message: "Event deleted successfully.",
            data: archivedEvent,
        });
    } catch (error) {
        console.error("Delete event error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export async function updateAdminEventController(req, res) {
    try {
        const { id } = req.params;

        const existingEvent = await getAdminEventById(id);

        if (!existingEvent) {
            return res.status(404).json({
                success: false,
                message: "Event not found.",
            });
        }

        if (
            req.admin.role === "CONTENT_MANAGER" &&
            existingEvent.created_by !== req.admin.id
        ) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to edit this event.",
            });
        }

        const {
            title,
            summary,
            description,
            imageCaption,

            eventDate,
            location,

            recurringEvent,
            externalLink,

            featured,
            published,
        } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required.",
            });
        }

        const isFeatured = featured === "true";
        const isPublished = published === "true";

        const slug = title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");

        let imageUrl = existingEvent.image_url;
        if (req.file) {
            const uploadedImage = await uploadImageService(
                req.file.buffer,
                "nsa-wsu/events"
            );

            imageUrl = uploadedImage.secure_url;
        }
        let publishedAt = existingEvent.published_at;

        if (isPublished && !existingEvent.published) {
            publishedAt = new Date();
        }

        if (!isPublished) {
            publishedAt = null;
        }

        const updatedEvent = await updateAdminEvent(id, {
            title,
            slug,

            summary: summary || null,
            description: description || null,

            imageUrl,
            imageCaption: imageCaption || null,

            eventDate: eventDate || null,
            location: location || null,

            recurringEvent: recurringEvent || null,
            externalLink: externalLink || null,

            featured: isFeatured,
            published: isPublished,
            publishedAt,

            updatedBy: req.admin.id,
        });

        return res.status(200).json({
            success: true,
            message: isPublished
                ? "Event updated successfully."
                : "Event saved as draft.",
            data: updatedEvent,
        });

    } catch (error) {
        console.error("Update event error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to update event.",
        });
    }
}