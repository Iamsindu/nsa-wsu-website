import * as yup from "yup";

export const eventSchema = yup.object({
    title: yup
        .string()
        .trim()
        .required("Title is required."),
    summary: yup
        .string()
        .trim()
        .required("Summary is required."),
    description: yup
        .string()
        .trim()
        .required("Description is required."),
    recurringEvent: yup
        .string()
        .nullable()
        .transform((value, originalValue) =>
            originalValue === "" ? null : value
        ),
    eventDate: yup
        .string()
        .nullable(),
    location: yup
        .string(),

    image: yup
        .mixed()
        .nullable(),
    imageCaption: yup
        .string(),
    galleryImages: yup
        .array()
        .max(10, "Maximum 10 gallery images allowed."),
    externalLink: yup
        .string()
        .url("Enter a valid URL.")
        .nullable()
        .transform((value) => value || null),
    featured: yup.boolean(),
    published: yup.boolean(),
});