import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";

import {
    Alert,
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import { createUpdate, getAdminUpdateById, updateUpdate } from "../../services/updateService.js";
import { updateSchema } from "../../validation/updateSchema.js";
import { ADMIN_UPDATES } from "../../constants/route.js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CATEGORIES } from "../../constants/categories.js";

function AdminUpdateForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const isEditMode = Boolean(id);

    const [update, setUpdate] = useState(null);
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    useEffect(() => {
        if (!id) return;
        async function loadUpdate() {
            try {
                setLoadingUpdate(true);
                const data = await getAdminUpdateById(id);
                setUpdate(data);
            } catch (error) {
                console.error("Failed to load update:", error);
            } finally {
                setLoadingUpdate(false);
            }
        }

        loadUpdate();
    }, [id]);

    const getUpdateValues = (update) => ({
        title: update?.title || "",
        category: update?.category || "",
        summary: update?.summary || "",
        content: update?.content || "",
        image: update?.image || null,
        imageCaption: update?.image_caption || "",
        authorName: update?.author_name || "",
        authorTitle: update?.author_title || "",
        featured: update?.featured || false,
        published: update?.published || false,
    });

    const formik = useFormik({
        initialValues: getUpdateValues(update),
        enableReinitialize: true,
        validationSchema: updateSchema,
        onSubmit: async (values) => {
            if (isEditMode) {
                await updateUpdate(id, values);
                toast.success("News updated successfully");
            } else {
                await createUpdate(values);
                toast.success("News created successfully");
            }

            navigate(ADMIN_UPDATES);
        },
    });

    const handleSaveDraft = async () => {
        await formik.setFieldValue("published", false);
        formik.handleSubmit();
    };


    const handlePublish = async () => {
        await formik.setFieldValue("published", true);
        formik.handleSubmit();
    };

    if (isEditMode && loadingUpdate) {
        return <p>Loading update...</p>;
    }


    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: 950,
                mx: "auto",
                py: 4,
            }}
        >
            <Stack spacing={1} mb={4}>
                <Typography variant="h4">
                    {isEditMode ? "Edit Update" : "Create Update"}
                </Typography>

                <Typography color="text.secondary">
                    {isEditMode
                        ? "Update the existing NSA WSU update."
                        : "Create a new update for the NSA WSU website."}
                </Typography>
            </Stack>


            {formik.status && (
                <Alert
                    severity="error"
                    sx={{ mb: 3 }}
                >
                    {formik.status}
                </Alert>
            )}


            <Box component="form">
                <Stack spacing={3}>

                    {/* TITLE */}
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={3}
                    >
                        <Box sx={{ width: { xs: "100%", md: "30%" } }}>
                            <Typography variant="subtitle2">
                                Title *
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Main headline for the update.
                            </Typography>
                        </Box>

                        <Box sx={{ width: { xs: "100%", md: "70%" } }}>
                            <TextField
                                fullWidth
                                size="small"
                                name="title"
                                placeholder="Update title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.title &&
                                    Boolean(formik.errors.title)
                                }
                                helperText={
                                    formik.touched.title &&
                                    formik.errors.title
                                }
                            />
                        </Box>
                    </Stack>


                    <Divider />


                    {/* CATEGORY */}
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={3}
                    >
                        <Box sx={{ width: { xs: "100%", md: "30%" } }}>
                            <Typography variant="subtitle2">
                                Category *
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Select where this update belongs.
                            </Typography>
                        </Box>

                        <Box sx={{ width: { xs: "100%", md: "70%" } }}>
                            <FormControl
                                fullWidth
                                size="small"
                                error={
                                    formik.touched.category &&
                                    Boolean(formik.errors.category)
                                }
                            >
                                <InputLabel>
                                    Select category
                                </InputLabel>

                                <Select
                                    name="category"
                                    label="Select category"
                                    value={formik.values.category}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    {CATEGORIES.map((category) => (
                                        <MenuItem key={category} value={category}>
                                            {category}
                                        </MenuItem>
                                    ))}
                                </Select>

                                {formik.touched.category &&
                                    formik.errors.category && (
                                        <FormHelperText>
                                            {formik.errors.category}
                                        </FormHelperText>
                                    )}
                            </FormControl>
                        </Box>
                    </Stack>


                    <Divider />


                    {/* SUMMARY */}
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={3}
                    >
                        <Box sx={{ width: { xs: "100%", md: "30%" } }}>
                            <Typography variant="subtitle2">
                                Summary *
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Short description shown in update cards.
                            </Typography>
                        </Box>

                        <Box sx={{ width: { xs: "100%", md: "70%" } }}>
                            <TextField
                                fullWidth
                                multiline
                                minRows={3}
                                size="small"
                                name="summary"
                                placeholder="Short summary"
                                value={formik.values.summary}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.summary &&
                                    Boolean(formik.errors.summary)
                                }
                                helperText={
                                    formik.touched.summary &&
                                    formik.errors.summary
                                }
                            />
                        </Box>
                    </Stack>


                    <Divider />


                    {/* DESCRIPTION */}
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={3}
                    >
                        <Box sx={{ width: { xs: "100%", md: "30%" } }}>
                            <Typography variant="subtitle2">
                                Description *
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Full content of the update.
                            </Typography>
                        </Box>

                        <Box sx={{ width: { xs: "100%", md: "70%" } }}>
                            <TextField
                                fullWidth
                                multiline
                                minRows={8}
                                size="small"
                                name="content"
                                placeholder="Write the update..."
                                value={formik.values.content}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.content &&
                                    Boolean(formik.errors.content)
                                }
                                helperText={
                                    formik.touched.content &&
                                    formik.errors.content
                                }
                            />
                        </Box>
                    </Stack>


                    <Divider />


                    {/* IMAGE */}
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={3}
                    >
                        <Box sx={{ width: { xs: "100%", md: "30%" } }}>
                            <Typography variant="subtitle2">
                                Featured Image
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                JPG, PNG, or WebP.
                            </Typography>
                        </Box>

                        <Box sx={{ width: { xs: "100%", md: "70%" } }}>
                            <Stack spacing={1.5}>

                                <Button
                                    variant="outlined"
                                    component="label"
                                    sx={{
                                        alignSelf: "flex-start",
                                    }}
                                >
                                    Choose Image

                                    <input
                                        hidden
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={(event) =>
                                            formik.setFieldValue(
                                                "image",
                                                event.currentTarget.files?.[0] ||
                                                null
                                            )
                                        }
                                    />
                                </Button>

                                {formik.values.image && (
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Selected:{" "}
                                        {formik.values.image.name}
                                    </Typography>
                                )}
                            </Stack>
                        </Box>
                    </Stack>


                    <Divider />


                    {/* IMAGE CAPTION */}
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={3}
                    >
                        <Box sx={{ width: { xs: "100%", md: "30%" } }}>
                            <Typography variant="subtitle2">
                                Image Caption
                            </Typography>
                        </Box>

                        <Box sx={{ width: { xs: "100%", md: "70%" } }}>
                            <TextField
                                fullWidth
                                size="small"
                                name="imageCaption"
                                placeholder="Optional image caption"
                                value={formik.values.imageCaption}
                                onChange={formik.handleChange}
                            />
                        </Box>
                    </Stack>


                    <Divider />


                    {/* AUTHOR */}
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={3}
                    >
                        <Box sx={{ width: { xs: "100%", md: "30%" } }}>
                            <Typography variant="subtitle2">
                                Author
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Optional. Defaults to NSA WSU.
                            </Typography>
                        </Box>

                        <Box sx={{ width: { xs: "100%", md: "70%" } }}>
                            <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={2}
                            >
                                <TextField
                                    fullWidth
                                    size="small"
                                    name="authorName"
                                    placeholder="Author name"
                                    value={formik.values.authorName}
                                    onChange={formik.handleChange}
                                />

                                <TextField
                                    fullWidth
                                    size="small"
                                    name="authorTitle"
                                    placeholder="Author title"
                                    value={formik.values.authorTitle}
                                    onChange={formik.handleChange}
                                />
                            </Stack>
                        </Box>
                    </Stack>


                    <Divider />


                    {/* FEATURE */}
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={3}
                    >
                        <Box sx={{ width: { xs: "100%", md: "30%" } }}>
                            <Typography variant="subtitle2">
                                Featured
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Highlight this update on the website.
                            </Typography>
                        </Box>

                        <Box sx={{ width: { xs: "100%", md: "70%" } }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="featured"
                                        checked={formik.values.featured}
                                        onChange={formik.handleChange}
                                    />
                                }
                                label="Feature this update"
                            />
                        </Box>
                    </Stack>


                    <Divider />


                    <Stack
                        direction="row"
                        spacing={2}
                        pt={1}
                    >
                        <Button
                            variant="outlined"
                            color="inherit"
                            onClick={() =>
                                navigate("/admin/updates")
                            }
                            disabled={formik.isSubmitting}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={handleSaveDraft}
                            disabled={formik.isSubmitting}
                        >
                            Save Draft
                        </Button>

                        <Button
                            variant="contained"
                            onClick={handlePublish}
                            disabled={formik.isSubmitting}
                        >
                            Publish Update
                        </Button>
                    </Stack>

                </Stack>
            </Box>
        </Box>
    );
}

export default AdminUpdateForm;