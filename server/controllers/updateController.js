import { getPublishedUpdateBySlug, getPublishedUpdates } from "../models/updateModel.js"

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