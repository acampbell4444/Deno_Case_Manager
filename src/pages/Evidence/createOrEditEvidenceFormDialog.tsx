import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-final-form";
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Typography,
} from "@mui/material";
import { Upload as CloudUploadIcon } from "@mui/icons-material";
import {
    Autocomplete as AutocompleteRFF,
    TextField as TextFieldRFF,
} from "mui-rff";
import {
    setCombinedInitialState,
    setCreateOrEditFormState,
} from "../../slices/evidence.ts";
import {
    useCreateEvidenceEntryMutation,
    useLazyGetEvidenceByBookIdQuery,
    useUploadEvidenceFileMutation,
} from "../../services/evidence.ts";
import { useParams } from "react-router-dom";

const CreateEvidenceForm = () => {
    const EVIDENCE_BOOK_ID = useParams().id || "";
    const dispatch = useDispatch();

    const [fetchAllEvidence] = useLazyGetEvidenceByBookIdQuery();
    const [upldEvdFile] = useUploadEvidenceFileMutation();
    const [createEvidenceRecord] = useCreateEvidenceEntryMutation();

    const { createOrEditFormState } = useSelector((state: any) =>
        state.evidence
    );

    const { uploadedFile, type, currentRow } = createOrEditFormState;
    const filename = uploadedFile?.name || "";

    const handleFileUpload = (event: any, form: any) => {
        const file = event.target.files[0];
        if (
            file && (file.type.includes("image/") || file.type.includes("pdf"))
        ) {
            form.change("attachment_name", file.name);
            dispatch(setCreateOrEditFormState({ uploadedFile: file }));
        } else {
            alert("Please upload only images or PDFs.");
        }
    };

    const handleCreateFormDialogViewToggle = (open: any) => {
        dispatch(setCombinedInitialState({ createOrEditDialogOpen: open }));
        dispatch(
            setCreateOrEditFormState({
                uploadedFile: open ? uploadedFile : null,
                type: open ? "create" : "",
                currentRow: null,
            }),
        );
    };

    const initialValues = useMemo(() => ({
        attachment_name: filename,
    }), []);

    const validate = (values: any) => {
        return {
            title: !values.title ? "Required" : undefined,
            date_of_event: !values.date_of_event ? "Required" : undefined,
            description: !values.description ? "Required" : undefined,
            tags: !values.tags ? "Required" : undefined,
            attachment_name: !values.attachment_name ? "Required" : undefined,
        };
    };

    const onSubmitHandler = async (values: any) => {
        const newFileName = values.attachment_name;
        const file = uploadedFile;
        const isPdf = file.type.includes("pdf");
        const upldFl = await upldEvdFile({ file, newFileName }).unwrap();
        const newPdfUrl = upldFl?.s3Url || "";

        const saveBody = {
            ...values,
            tags: Array.isArray(values.tags) ? values.tags : [],
            evidence_book_id: EVIDENCE_BOOK_ID,
            attachment_url: newPdfUrl,
            attachment_type: isPdf ? "pdf" : "image",
        };

        await createEvidenceRecord(saveBody).unwrap();

        fetchAllEvidence(EVIDENCE_BOOK_ID);

        handleCreateFormDialogViewToggle(false);
    };

    return (
        <>
            <DialogTitle>
                {type !== "edit" && "Create New Evidence Record"}
                {type === "edit" && `Edit Evidence Record: ${currentRow?.name}`}
            </DialogTitle>

            <DialogContent>
                <Form
                    onSubmit={onSubmitHandler}
                    initialValues={initialValues}
                    validate={validate}
                    render={({
                        handleSubmit,
                        valid,
                        form,
                        values,
                    }) => {
                        return (
                            <form onSubmit={handleSubmit}>
                                <Stack spacing={2} sx={{ p: 2 }}>
                                    <TextFieldRFF
                                        label="Title of Evidence Record"
                                        name="title"
                                        required
                                    />

                                    <TextFieldRFF
                                        type="date"
                                        label="Date of Event"
                                        name="date_of_event"
                                        required
                                        InputLabelProps={{
                                            shrink: true, // Prevents label from overlapping by keeping it above the input
                                        }}
                                    />

                                    <TextFieldRFF
                                        label="Description"
                                        multiline
                                        rows={4}
                                        name="description"
                                        required
                                    />

                                    <AutocompleteRFF
                                        freeSolo
                                        multiple
                                        label="Tags"
                                        name="tags"
                                        options={["Tag1", "Tag2", "Tag3"]}
                                    />

                                    <TextFieldRFF
                                        label="Attachment Name"
                                        name="attachment_name"
                                        required
                                    />
                                </Stack>

                                <Box
                                    sx={{
                                        padding: 3,
                                        border: "1px dashed #1976d2",
                                        borderRadius: 2,
                                        marginBottom: 3,
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{ marginBottom: 2 }}
                                    >
                                        Upload a File:
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        startIcon={<CloudUploadIcon />}
                                        sx={{
                                            backgroundColor: "#34D399", // Green background
                                            color: "white", // White text
                                            borderRadius: "8px",
                                            padding: "12px 16px",
                                            textTransform: "none",
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                            boxShadow:
                                                "0 4px 6px rgba(0, 0, 0, 0.1)",
                                            "&:hover": {
                                                backgroundColor: "#2C9E77", // Darker green on hover
                                                color: "#ffffff", // White text on hover
                                            },
                                            "&.Mui-disabled": {
                                                backgroundColor: "#555", // Lighter background for disabled state
                                                color: "white", // White text for disabled state
                                                opacity: 0.6, // Reduced opacity for disabled state
                                            },
                                            transition: "all 0.3s ease",
                                            marginBottom: 2,
                                        }}
                                    >
                                        Choose File
                                        <input
                                            type="file"
                                            hidden
                                            onChange={(e) =>
                                                handleFileUpload(e, form)}
                                        />
                                    </Button>

                                    {uploadedFile && (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                padding: 1,
                                                borderRadius: 1,
                                                backgroundColor: "#f0f0f0",
                                            }}
                                        >
                                            <Typography variant="body1">
                                                {filename}
                                            </Typography>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                onClick={(e) =>
                                                    dispatch(
                                                        setCreateOrEditFormState(
                                                            {
                                                                uploadedFile:
                                                                    null,
                                                            },
                                                        ),
                                                    )}
                                            >
                                                Delete
                                            </Button>
                                        </Box>
                                    )}
                                </Box>

                                <DialogActions>
                                    <Button
                                        onClick={(e) =>
                                            handleCreateFormDialogViewToggle(
                                                false,
                                            )}
                                        color="secondary"
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        disabled={!valid}
                                        type="submit"
                                        color="primary"
                                    >
                                        Save
                                    </Button>
                                </DialogActions>
                            </form>
                        );
                    }}
                />
            </DialogContent>
        </>
    );
};

export default CreateEvidenceForm;
