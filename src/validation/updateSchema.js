import Joi from "joi";

export const updateSchema = Joi.object({
    title: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Title is required.",
            "any.required": "Title is required.",
        }),

    category: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Category is required.",
            "any.required": "Category is required.",
        }),

    summary: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Summary is required.",
            "any.required": "Summary is required.",
        }),

    content: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Description is required.",
            "any.required": "Description is required.",
        }),

    image: Joi.any().allow(null),

    imageCaption: Joi.string()
        .allow("")
        .optional(),

    authorName: Joi.string()
        .allow("")
        .optional(),

    authorTitle: Joi.string()
        .allow("")
        .optional(),

    featured: Joi.boolean(),

    published: Joi.boolean(),
});