import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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

import { toast } from "react-toastify";

import { eventSchema } from "../../validation/eventSchema.js";
import { ADMIN_EVENTS } from "../../constants/route.js";
import { createEvent, getAdminEventById, updateEvent } from "../../services/eventService.js";


function AdminEventForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const isEditMode = Boolean(id);

    const [event, setEvent] = useState(null);
    const [loadingUpdate, setLoadingUpdate] = useState(false);


    useEffect(() => {
        if (!id) return;
        async function loadUpdate() {
            try {
                setLoadingUpdate(true);
                const data = await getAdminEventById(id);
                setEvent(data);
            } catch (error) {
                console.error("Failed to load update:", error);
            } finally {
                setLoadingUpdate(false);
            }
        }

        loadUpdate();
    }, [id]);


    const getEventValues = (event) => ({
        title: event?.title || "",
        summary: event?.summary || "",
        description: event?.description || "",
        recurringEvent: event?.recurring_event || "",
        eventDate:
            event?.event_date
                ? event.event_date.split("T")[0]
                : "",
        location: event?.location || "",
        image: null,
        imageCaption: event?.image_caption || "",
        galleryImages: [],
        externalLink:
            event?.external_link || "",
        featured:
            event?.featured || false,
        published:
            event?.published || false,
    });


    const formik = useFormik({
        initialValues: getEventValues(event),
        enableReinitialize: true,
        validationSchema: eventSchema,
        onSubmit: async (values) => {
            if (isEditMode) {
                await updateEvent(id, values);
                toast.success("Event updated successfully");
            } else {
                await createEvent(values);
                toast.success(
                    values.published
                        ? "Event published successfully."
                        : "Event saved as draft."
                );
            }

            navigate(ADMIN_EVENTS);
        },
    });


    const handleSaveDraft = async () => {
        await formik.setFieldValue(
            "published",
            false
        );
        formik.handleSubmit();
    };


    const handlePublish = async () => {
        await formik.setFieldValue(
            "published",
            true
        );
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

            {/* HEADER */}

            <Stack spacing={1} mb={4}>

                <Typography variant="h4">
                    {isEditMode
                        ? "Edit Event"
                        : "Create Event"}
                </Typography>

                <Typography color="text.secondary">
                    {isEditMode
                        ? "Update the existing NSA WSU event."
                        : "Create a new event for the NSA WSU website."}
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
                    <Stack
                        direction={{
                            xs: "column",
                            md: "row",
                        }}
                        spacing={3}
                    >

                        <Box
                            sx={{
                                width: {
                                    xs: "100%",
                                    md: "30%",
                                },
                            }}
                        >
                            <Typography variant="subtitle2">
                                Title *
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Main title of the event.
                            </Typography>
                        </Box>


                        <Box
                            sx={{
                                width: {
                                    xs: "100%",
                                    md: "70%",
                                },
                            }}
                        >
                            <TextField
                                fullWidth
                                size="small"
                                name="title"
                                placeholder="Event title"
                                value={
                                    formik.values.title
                                }
                                onChange={
                                    formik.handleChange
                                }
                                onBlur={
                                    formik.handleBlur
                                }
                                error={
                                    formik.touched.title &&
                                    Boolean(
                                        formik.errors.title
                                    )
                                }
                                helperText={
                                    formik.touched.title &&
                                    formik.errors.title
                                }
                            />
                        </Box>

                    </Stack>


                    <Divider />

                    <Stack
                        direction={{
                            xs: "column",
                            md: "row",
                        }}
                        spacing={3}
                    >

                        <Box
                            sx={{
                                width: {
                                    xs: "100%",
                                    md: "30%",
                                },
                            }}
                        >
                            <Typography variant="subtitle2">
                                Summary *
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Short description shown
                                on event cards.
                            </Typography>
                        </Box>


                        <Box
                            sx={{
                                width: {
                                    xs: "100%",
                                    md: "70%",
                                },
                            }}
                        >
                            <TextField
                                fullWidth
                                multiline
                                minRows={3}
                                size="small"
                                name="summary"
                                placeholder="Short event summary"
                                value={
                                    formik.values.summary
                                }
                                onChange={
                                    formik.handleChange
                                }
                                onBlur={
                                    formik.handleBlur
                                }
                                error={
                                    formik.touched.summary &&
                                    Boolean(
                                        formik.errors.summary
                                    )
                                }
                                helperText={
                                    formik.touched.summary &&
                                    formik.errors.summary
                                }
                            />
                        </Box>

                    </Stack>


                    <Divider />

                    <Stack
                        direction={{
                            xs: "column",
                            md: "row",
                        }}
                        spacing={3}
                    >

                        <Box
                            sx={{
                                width: {
                                    xs: "100%",
                                    md: "30%",
                                },
                            }}
                        >
                            <Typography variant="subtitle2">
                                Description *
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Full event details,
                                announcement, or recap.
                            </Typography>
                        </Box>


                        <Box
                            sx={{
                                width: {
                                    xs: "100%",
                                    md: "70%",
                                },
                            }}
                        >
                            <TextField
                                fullWidth
                                multiline
                                minRows={8}
                                size="small"
                                name="description"
                                placeholder="Write about the event..."
                                value={
                                    formik.values.description
                                }
                                onChange={
                                    formik.handleChange
                                }
                                onBlur={
                                    formik.handleBlur
                                }
                                error={
                                    formik.touched.description &&
                                    Boolean(
                                        formik.errors.description
                                    )
                                }
                                helperText={
                                    formik.touched.description &&
                                    formik.errors.description
                                }
                            />
                        </Box>

                    </Stack>


                    <Divider />


                    <Stack
                        direction={{
                            xs: "column",
                            md: "row",
                        }}
                        spacing={3}
                    >

                        <Box
                            sx={{
                                width: {
                                    xs: "100%",
                                    md: "30%",
                                },
                            }}
                        >
                            <Typography variant="subtitle2">
                                Event Series
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Only select this for
                                recurring signature events.
                            </Typography>
                        </Box>


                        <Box
                            sx={{
                                width: {
                                    xs: "100%",
                                    md: "70%",
                                },
                            }}
                        >
                            <TextField
                                select
                                fullWidth
                                size="small"
                                name="recurringEvent"
                                label="Recurring Event"
                                value={formik.values.recurringEvent}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value="">
                                    None — One-time Event
                                </MenuItem>

                                <MenuItem value="dashain">
                                    Dashain
                                </MenuItem>

                                <MenuItem value="naya-barsha">
                                    Naya Barsha
                                </MenuItem>
                            </TextField>
                        </Box>
                    </Stack>


                    <Divider />


                    {/* EVENT DATE */}

                    <Stack
                        direction={{
                            xs: "column",
                            md: "row",
                        }}
                        spacing={3}
                    >

                        <Box
                            sx={{
                                width: {
                                    xs: "100%",
                                    md: "30%",
                                },
                            }}
                        >
                            <Typography variant="subtitle2">
                                Event Date
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Optional until the date is finalized.
                            </Typography>
                        </Box>


                        <Box
                            sx={{
                                width: {
                                    xs: "100%",
                                    md: "70%",
                                },
                            }}
                        >
                            <TextField
                                fullWidth
                                size="small"
                                type="date"
                                name="eventDate"
                                value={
                                    formik.values.eventDate
                                }
                                onChange={
                                    formik.handleChange
                                }
                            />
                        </Box>

                    </Stack>


                    <Divider />


                    {/* LOCATION */}

                    <Stack
                        direction={{
                            xs: "column",
                            md: "row",
                        }}
                        spacing={3}
                    >

                        <Box
                            sx={{
                                width: {
                                    xs: "100%",
                                    md: "30%",
                                },
                            }}
                        >
                            <Typography variant="subtitle2">
                                Location
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Optional until the venue is finalized.
                            </Typography>
                        </Box>


                        <Box
                            sx={{
                                width: {
                                    xs: "100%",
                                    md: "70%",
                                },
                            }}
                        >
                            <TextField
                                fullWidth
                                size="small"
                                name="location"
                                placeholder="Student Union Atrium"
                                value={
                                    formik.values.location
                                }
                                onChange={
                                    formik.handleChange
                                }
                            />
                        </Box>

                    </Stack>


                    <Divider />


                    {/* COVER IMAGE */}

                    <Stack
                        direction={{
                            xs: "column",
                            md: "row",
                        }}
                        spacing={3}
                    >

                        <Box
                            sx={{
                                width: {
                                    xs: "100%",
                                    md: "30%",
                                },
                            }}
                        >
                            <Typography variant="subtitle2">
                                Cover Image
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Main image shown on the event card and detail page.
                            </Typography>
                        </Box>


                        <Box
                            sx={{
                                width: {
                                    xs: "100%",
                                    md: "70%",
                                },
                            }}
                        >
                            <Stack spacing={1.5}>

                                <Button
                                    variant="outlined"
                                    component="label"
                                    sx={{
                                        alignSelf:
                                            "flex-start",
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
                                                event.currentTarget
                                                    .files?.[0] ||
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
                                        {
                                            formik.values
                                                .image.name
                                        }
                                    </Typography>
                                )}

                            </Stack>
                        </Box>

                    </Stack>


                    <Divider />


                    {/* IMAGE CAPTION */}

                    <Stack
                        direction={{
                            xs: "column",
                            md: "row",
                        }}
                        spacing={3}
                    >

                        <Box
                            sx={{
                                width: {
                                    xs: "100%",
                                    md: "30%",
                                },
                            }}
                        >
                            <Typography variant="subtitle2">
                                Image Caption
                            </Typography>
                        </Box>


                        <Box
                            sx={{
                                width: {
                                    xs: "100%",
                                    md: "70%",
                                },
                            }}
                        >
                            <TextField
                                fullWidth
                                size="small"
                                name="imageCaption"
                                placeholder="Optional image caption"
                                value={
                                    formik.values
                                        .imageCaption
                                }
                                onChange={
                                    formik.handleChange
                                }
                            />
                        </Box>

                    </Stack>


                    <Divider />


                    {/* GALLERY IMAGES */}

                    <Stack
                        direction={{
                            xs: "column",
                            md: "row",
                        }}
                        spacing={3}
                    >

                        <Box
                            sx={{
                                width: {
                                    xs: "100%",
                                    md: "30%",
                                },
                            }}
                        >
                            <Typography variant="subtitle2">
                                Gallery Images
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Select up to 10 images to show on the event detail page.
                            </Typography>
                        </Box>


                        <Box
                            sx={{
                                width: {
                                    xs: "100%",
                                    md: "70%",
                                },
                            }}
                        >
                            <Stack spacing={1.5}>

                                <Button
                                    variant="outlined"
                                    component="label"
                                    sx={{
                                        alignSelf:
                                            "flex-start",
                                    }}
                                >
                                    Choose Gallery Images

                                    <input
                                        hidden
                                        multiple
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={(event) => {
                                            const files =
                                                Array.from(
                                                    event
                                                        .currentTarget
                                                        .files ||
                                                    []
                                                );

                                            formik.setFieldValue(
                                                "galleryImages",
                                                files.slice(
                                                    0,
                                                    10
                                                )
                                            );
                                        }}
                                    />
                                </Button>


                                {formik.values
                                    .galleryImages.length >
                                    0 && (
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {
                                                formik.values
                                                    .galleryImages
                                                    .length
                                            }{" "}
                                            image(s) selected
                                        </Typography>
                                    )}


                                {formik.touched
                                    .galleryImages &&
                                    formik.errors
                                        .galleryImages && (
                                        <FormHelperText error>
                                            {
                                                formik
                                                    .errors
                                                    .galleryImages
                                            }
                                        </FormHelperText>
                                    )}

                            </Stack>
                        </Box>

                    </Stack>


                    <Divider />

                    {/* EXTERNAL LINK */}

                    <Stack
                        direction={{
                            xs: "column",
                            md: "row",
                        }}
                        spacing={3}
                    >

                        <Box
                            sx={{
                                width: {
                                    xs: "100%",
                                    md: "30%",
                                },
                            }}
                        >
                            <Typography variant="subtitle2">
                                External Link
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Optional related website or resource.
                            </Typography>
                        </Box>


                        <Box
                            sx={{
                                width: {
                                    xs: "100%",
                                    md: "70%",
                                },
                            }}
                        >
                            <TextField
                                fullWidth
                                size="small"
                                name="externalLink"
                                placeholder="https://..."
                                value={
                                    formik.values
                                        .externalLink
                                }
                                onChange={
                                    formik.handleChange
                                }
                                onBlur={
                                    formik.handleBlur
                                }
                                error={
                                    formik.touched
                                        .externalLink &&
                                    Boolean(
                                        formik.errors
                                            .externalLink
                                    )
                                }
                                helperText={
                                    formik.touched
                                        .externalLink &&
                                    formik.errors
                                        .externalLink
                                }
                            />
                        </Box>

                    </Stack>


                    <Divider />


                    {/* FEATURE */}

                    <Stack
                        direction={{
                            xs: "column",
                            md: "row",
                        }}
                        spacing={3}
                    >

                        <Box
                            sx={{
                                width: {
                                    xs: "100%",
                                    md: "30%",
                                },
                            }}
                        >
                            <Typography variant="subtitle2">
                                Featured
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Highlight this event on the website.
                            </Typography>
                        </Box>


                        <Box
                            sx={{
                                width: {
                                    xs: "100%",
                                    md: "70%",
                                },
                            }}
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="featured"
                                        checked={
                                            formik.values
                                                .featured
                                        }
                                        onChange={
                                            formik.handleChange
                                        }
                                    />
                                }
                                label="Feature this event"
                            />
                        </Box>

                    </Stack>


                    <Divider />


                    {/* ACTIONS */}

                    <Stack
                        direction="row"
                        spacing={2}
                        pt={1}
                    >

                        <Button
                            variant="outlined"
                            color="inherit"
                            onClick={() =>
                                navigate(
                                    ADMIN_EVENTS
                                )
                            }
                            disabled={
                                formik.isSubmitting
                            }
                        >
                            Cancel
                        </Button>


                        <Button
                            variant="outlined"
                            onClick={
                                handleSaveDraft
                            }
                            disabled={
                                formik.isSubmitting
                            }
                        >
                            Save Draft
                        </Button>


                        <Button
                            variant="contained"
                            onClick={
                                handlePublish
                            }
                            disabled={
                                formik.isSubmitting
                            }
                        >
                            Publish Event
                        </Button>

                    </Stack>

                </Stack>
            </Box>
        </Box>
    );
}


export default AdminEventForm;