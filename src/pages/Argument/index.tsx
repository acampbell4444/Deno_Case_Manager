import React from "react";
import { useGetArgumentsByUserIdQuery } from "../../services/arguments.ts";
import { useNavigate, useParams } from "react-router-dom";
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Dialog,
    Fab,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import {
    Add as AddIcon,
    ChatBubbleOutline,
    Edit as EditIcon,
    Visibility as VisibilityIcon,
} from "@mui/icons-material";

import HeroSection from "../../components/HeroHeader.tsx";
import NameTooltipAvatarAndIcon from "../../components/NameTooltipAvatarAndIcon.tsx";
import DisplayEvidenceDialog from "../Evidence/displayEvidenceDialog.tsx";
import CreateEvidenceFormDialog from "../Evidence/createOrEditEvidenceFormDialog.tsx";
import {
    setCombinedInitialState,
    setCreateOrEditFormState,
} from "../../slices/evidence.ts";
import { Transition } from "../../components/Transition.tsx";
import { useDispatch, useSelector } from "react-redux";

// Define the structure of the argument and evidence entry objects
interface EvidenceEntry {
    id: string;
    tags: string[];
    title: string;
    created_at: string;
    description: string;
    date_of_event: string;
    attachment_url: string;
    attachment_name: string;
    attachment_type: string;
    evidence_book_id: string;
}

interface Argument {
    id: string;
    title: string;
    description: string;
    collaborators_list: string[];
    tags: string[];
    evidence_entries: EvidenceEntry[];
    created_at: string;
    user_id: string;
}

const Argument = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        evidenceDialogOpen,
        createOrEditDialogOpen,
    } = useSelector((state: { evidence: any }) => state.evidence);

    const { data = [], error, isLoading } = useGetArgumentsByUserIdQuery("1"); // Replace "1" with dynamic user ID
    const currentArgument = data.find((argument: Argument) =>
        argument.id === id
    );

    // Loading state
    if (isLoading) {
        return <CircularProgress />;
    }

    // Error handling
    if (error) {
        const errorMessage = "status" in error
            ? `Error status: ${error.status}`
            : error.message;
        return <div>Error loading argument: {errorMessage}</div>;
    }

    // Handle case if no argument is found
    if (!currentArgument) {
        return <div>Argument not found.</div>;
    }

    // Event Handlers

    const handleDisplayEvidenceDialogViewToggle = (open: boolean, row: any) => {
        dispatch(
            setCombinedInitialState({
                evidenceDialogOpen: open,
                currentRow: open ? row : null,
            }),
        );
    };

    const handleDeleteEvidenceRecord = async (row: any) => {
        console.log("Deleting evidence record", row);
        // Handle the delete operation here
    };

    const handleCreateOrEditFormDialogViewToggle = (
        open: boolean,
        type = "create",
        row: any = null,
    ) => {
        dispatch(setCombinedInitialState({ createOrEditDialogOpen: open }));
        dispatch(
            setCreateOrEditFormState({
                uploadedFile: open ? null : null,
                type: open ? type : "",
                currentRow: open ? row : null,
            }),
        );
    };

    const handleEditEvidenceRecord = (row: any) => {
        handleCreateOrEditFormDialogViewToggle(true, "edit", row);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
            }}
        >
            <HeroSection>
                <Stack direction="row" spacing={2} justifyContent="center">
                    <NameTooltipAvatarAndIcon
                        Icon={ChatBubbleOutline}
                        tooltipTitle={`Collaborative Argument: ${currentArgument.title}`}
                        label="Argument Management"
                        iconSize={34}
                    />
                </Stack>

                <Stack direction="row" spacing={2} justifyContent="center">
                    <div
                        onClick={(e) => console.log("clicked")}
                    >
                        <NameTooltipAvatarAndIcon
                            Icon={EditIcon}
                            tooltipTitle={`Edit Argument: ${currentArgument.title}`}
                            label=""
                            highlightedLabel={currentArgument.title}
                            iconSize={34}
                        />
                    </div>
                </Stack>
            </HeroSection>

            {/* Argument Description */}
            <Typography
                variant="body1"
                sx={{
                    color: "#B0B0B0",
                    marginBottom: "15px",
                    fontSize: "1.2rem",
                }}
            >
                {currentArgument.description}
            </Typography>

            {/* Collaborators Section */}
            <Typography
                variant="h6"
                sx={{
                    color: "#34D399",
                    marginBottom: "10px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                }}
            >
                Collaborators:
            </Typography>
            <Stack
                direction="row"
                spacing={1}
                sx={{ marginBottom: "20px" }}
            >
                {currentArgument.collaborators_list.map((
                    collaborator: string,
                    index: number,
                ) => (
                    <Chip
                        key={index}
                        label={collaborator}
                        sx={{
                            backgroundColor: "#34D399",
                            color: "white",
                            fontWeight: "bold",
                            cursor: "pointer",
                            "&:hover": {
                                backgroundColor: "#2C9E77",
                            },
                        }}
                        onClick={() => alert(`Collaborator: ${collaborator}`)} // Example interaction
                    />
                ))}
            </Stack>

            {/* Tags Section */}
            <Typography
                variant="h6"
                sx={{
                    color: "#34D399",
                    marginBottom: "10px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                }}
            >
                Tags:
            </Typography>
            <Stack
                direction="row"
                spacing={1}
                sx={{ marginBottom: "20px" }}
            >
                {currentArgument.tags.map((tag: string, index: number) => (
                    <Chip
                        key={index}
                        label={tag}
                        sx={{
                            backgroundColor: "#34D399",
                            color: "white",
                            fontWeight: "bold",
                            cursor: "pointer",
                            "&:hover": {
                                backgroundColor: "#2C9E77",
                            },
                        }}
                        onClick={() => alert(`Tag clicked: ${tag}`)} // Example interaction
                    />
                ))}
            </Stack>

            {/* Evidence Entries */}
            <Typography
                variant="h6"
                sx={{
                    color: "#34D399",
                    marginBottom: "10px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                }}
            >
                Evidence Entries:
            </Typography>
            <Grid container spacing={3}>
                {currentArgument.evidence_entries.map((
                    entry: EvidenceEntry,
                    index: number,
                ) => (
                    <Grid item xs={12} sm={6} md={4} key={entry.id}>
                        <Card
                            variant="outlined"
                            sx={{
                                "&:hover": {
                                    boxShadow: 10,
                                    transform: "scale(1.05)",
                                },
                                border: "2px solid #34D399",
                                borderRadius: "10px",
                                backgroundColor: "#2A2A2A",
                                transition: "all 0.3s ease-in-out",
                            }}
                        >
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 600,
                                        marginBottom: "10px",
                                        color: "#34D399",
                                    }}
                                >
                                    {entry.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "#B0B0B0",
                                        marginBottom: "10px",
                                    }}
                                >
                                    {entry.description}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "#B0B0B0",
                                        marginBottom: "10px",
                                    }}
                                >
                                    Date of Event: {entry.date_of_event}
                                </Typography>
                                <Box
                                    display="flex"
                                    justifyContent="flex-end"
                                    gap={0.5}
                                    sx={{ p: 0.3 }}
                                >
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        color="info"
                                        onClick={() =>
                                            handleDisplayEvidenceDialogViewToggle(
                                                true,
                                                entry,
                                            )}
                                    >
                                        <VisibilityIcon />
                                        View
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        color="success"
                                        size="small"
                                        onClick={() =>
                                            handleEditEvidenceRecord(entry)}
                                    >
                                        <EditIcon />
                                        Edit
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Floating Action Button to navigate */}
            <Fab
                color="primary"
                aria-label="edit"
                sx={{
                    position: "fixed",
                    bottom: 20,
                    right: 20,
                    backgroundColor: "#34D399",
                }}
                onClick={() => navigate("/edit-argument")}
            >
                <EditIcon />
            </Fab>

            <Dialog
                TransitionComponent={Transition}
                open={evidenceDialogOpen}
                onClose={() =>
                    handleDisplayEvidenceDialogViewToggle(false, null)}
                fullWidth
                maxWidth="lg"
                sx={{ "& .MuiDialog-paper": { height: "100vh", margin: 0 } }}
            >
                <DisplayEvidenceDialog />
            </Dialog>

            <Dialog
                open={createOrEditDialogOpen}
                onClose={() =>
                    handleCreateOrEditFormDialogViewToggle(false, "", null)}
                fullWidth
                maxWidth="lg"
                sx={{ "& .MuiDialog-paper": { height: "100vh", margin: 0 } }}
                TransitionComponent={Transition}
            >
                <CreateEvidenceFormDialog />
            </Dialog>

            <Dialog
                TransitionComponent={Transition}
                open={evidenceDialogOpen}
                onClose={() =>
                    handleDisplayEvidenceDialogViewToggle(false, null)}
                fullWidth
                maxWidth="lg"
                sx={{ "& .MuiDialog-paper": { height: "100vh", margin: 0 } }}
            >
                <DisplayEvidenceDialog />
            </Dialog>
        </Box>
    );
};

export default Argument;
