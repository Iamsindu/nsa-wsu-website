import { useNavigate } from "react-router-dom";
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

import { createUpdate } from "../../services/updateService.js";
import { updateSchema } from "../../validation/updateSchema.js";

// const validate = (values) => {
//     const { error } = updateSchema.validate(values, {
//         abortEarly: false,
//     });

//     if (!error) {
//         return {};
//     }

//     const errors = {};

//     error.details.forEach((detail) => {
//         errors[detail.path[0]] = detail.message;
//     });

//     return errors;
// };


function CreateUpdate() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            title: "",
            category: "",
            summary: "",
            content: "",
            image: null,
            imageCaption: "",
            authorName: "",
            authorTitle: "",
            featured: false,
            published: false,
        },

        validationSchema: updateSchema,
        // validate,
        onSubmit: async (values, { setSubmitting, setStatus }) => {
            try {
                await createUpdate(values);

                navigate("/admin/updates");
            } catch (error) {
                setStatus(error.message);
            } finally {
                setSubmitting(false);
            }
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
                <Typography
                    variant="h4"
                    fontWeight={700}
                >
                    Create Update
                </Typography>

                <Typography
                    variant="body1"
                    color="text.secondary"
                >
                    Create a new update for the NSA WSU website.
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
                                    <MenuItem value="Campus Update">
                                        Campus Update
                                    </MenuItem>

                                    <MenuItem value="NSA Announcement">
                                        NSA Announcement
                                    </MenuItem>

                                    <MenuItem value="Immigration / Visa Update">
                                        Immigration / Visa Update
                                    </MenuItem>

                                    <MenuItem value="Student Opportunity">
                                        Student Opportunity
                                    </MenuItem>

                                    <MenuItem value="Event Recap">
                                        Event Recap
                                    </MenuItem>

                                    <MenuItem value="Community News">
                                        Community News
                                    </MenuItem>

                                    <MenuItem value="General">
                                        General
                                    </MenuItem>
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

export default CreateUpdate;