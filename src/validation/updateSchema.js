import * as yup from "yup";

export const updateSchema = yup.object({
    title: yup
        .string()
        .trim()
        .required("Title is required."),

    category: yup
        .string()
        .required("Category is required."),

    summary: yup
        .string()
        .trim()
        .required("Summary is required."),

    content: yup
        .string()
        .trim()
        .required("Description is required."),

    image: yup
        .mixed()
        .nullable(),

    imageCaption: yup
        .string(),

    authorName: yup
        .string(),

    authorTitle: yup
        .string(),

    featured: yup
        .boolean(),

    published: yup
        .boolean(),
});