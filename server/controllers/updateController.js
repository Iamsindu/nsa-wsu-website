import { createUpdate, getAdminUpdateById, getAllAdminUpdates, getPublishedUpdateBySlug, getPublishedUpdates, updateAdminUpdate } from "../models/updateModel.js"
import { uploadImageService } from "../services/imageService.js"

export async function getAllPublishedUpdates(req, res) {
    try {
        const updates = await getPublishedUpdates()

        res.status(200).json({
            success: true,
            count: updates.length,
            data: updates,
        })
    } catch (error) {
        console.error("Error fetching updates:", error)

        res.status(500).json({
            success: false,
            message: "Unable to fetch updates",
        })
    }
}

export async function getPublishedUpdate(req, res) {
    try {
        const { slug } = req.params

        const update = await getPublishedUpdateBySlug(slug)

        if (!update) {
            return res.status(404).json({
                success: false,
                message: "Update not found",
            })
        }

        res.status(200).json({
            success: true,
            data: update,
        })
    } catch (error) {
        console.error("Error fetching update:", error)

        res.status(500).json({
            success: false,
            message: "Unable to fetch update",
        })
    }
}

export async function createUpdateController(req, res) {
    try {
        const {
            title,
            category,
            summary,
            content,
            imageCaption,
            authorName,
            authorTitle,
            featured,
            published,
        } = req.body;

        // 1. Validate required fields
        if (!title || !category || !summary || !content) {
            return res.status(400).json({
                success: false,
                message:
                    "Title, category, summary, and content are required.",
            });
        }

        // 2. Convert FormData strings to booleans
        const isFeatured = featured === "true";
        const isPublished = published === "true";

        // 3. Create slug
        const slug = title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");

        // 4. Logged-in admin
        const createdBy = req.admin.id;

        // 5. Upload image to Cloudinary
        let imageUrl = null;

        if (req.file) {
            const uploadedImage = await uploadImageService(
                req.file.buffer,
                "nsa-wsu/updates"
            );

            imageUrl = uploadedImage.secure_url;
        }

        // 6. Set published date
        const publishedAt = isPublished
            ? new Date()
            : null;

        // 7. Save in database
        const newUpdate = await createUpdate({
            title,
            slug,
            category,
            summary,
            content,
            imageUrl,
            imageCaption: imageCaption || null,
            authorName: authorName || "NSA WSU",
            authorTitle: authorTitle || null,
            featured: isFeatured,
            published: isPublished,
            publishedAt,
            createdBy,
        });

        return res.status(201).json({
            success: true,
            message: "Update created successfully.",
            data: newUpdate,
        });

    } catch (error) {
        console.error("Create update error:", error);
        console.error("Message:", error.message);
        console.error("Code:", error.code);
        console.error("Detail:", error.detail);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export async function getAllAdminUpdatesController(req, res) {
    try {
        const updates = await getAllAdminUpdates();

        return res.status(200).json({
            success: true,
            data: updates,
        });
    } catch (error) {
        console.error("Get updates error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export async function getAdminUpdateByIdController(req, res) {
    try {
        const { id } = req.params;

        const update = await getAdminUpdateById(id);

        if (!update) {
            return res.status(404).json({
                success: false,
                message: "Update not found.",
            });
        }

        return res.status(200).json({
            success: true,
            data: update,
        });
    } catch (error) {
        console.error("Get update error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export async function updateUpdateController(req, res) {
    try {
        const { id } = req.params;

        const {
            title,
            category,
            summary,
            content,
            imageCaption,
            authorName,
            authorTitle,
            featured,
            published,
        } = req.body;

        // 1. Validate required fields
        if (!title || !category || !summary || !content) {
            return res.status(400).json({
                success: false,
                message:
                    "Title, category, summary, and content are required.",
            });
        }

        // 2. Find existing update
        const existingUpdate = await getAdminUpdateById(id);

        if (!existingUpdate) {
            return res.status(404).json({
                success: false,
                message: "Update not found.",
            });
        }

        // 3. Content Manager can edit only their own update
        if (
            req.admin.role === "CONTENT_MANAGER" &&
            existingUpdate.created_by !== req.admin.id
        ) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to edit this update.",
            });
        }

        // 4. Convert FormData values
        const isFeatured = featured === "true";
        const isPublished = published === "true";

        // 5. Generate slug again in case title changed
        const slug = title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");

        // 6. Keep existing image unless a new one is uploaded
        let imageUrl = existingUpdate.image_url;

        if (req.file) {
            const uploadedImage = await uploadImageService(
                req.file.buffer,
                "nsa-wsu/updates"
            );

            imageUrl = uploadedImage.secure_url;
        }

        // 7. Handle published date
        let publishedAt = existingUpdate.published_at;

        if (isPublished && !existingUpdate.published) {
            // Draft → Published
            publishedAt = new Date();
        }

        if (!isPublished) {
            // Published → Draft
            publishedAt = null;
        }

        // 8. Logged-in admin becomes updater
        const updatedBy = req.admin.id;

        // 9. Update database
        const updatedUpdate = await updateAdminUpdate(id, {
            title,
            slug,
            category,
            summary,
            content,
            imageUrl,
            imageCaption: imageCaption || null,
            authorName: authorName || "NSA WSU",
            authorTitle: authorTitle || null,
            featured: isFeatured,
            published: isPublished,
            publishedAt,
            updatedBy,
        });

        return res.status(200).json({
            success: true,
            message: "Update updated successfully.",
            data: updatedUpdate,
        });

    } catch (error) {
        console.error("Update update error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}