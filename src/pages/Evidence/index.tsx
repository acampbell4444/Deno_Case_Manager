import React, { useState } from "react";
import { Avatar, Box, Button, Dialog, Stack, Typography } from "@mui/material";
import { Transition } from "../../components/Transition.tsx";
import { DataGrid } from "@mui/x-data-grid";
import {
    Add as AddIcon,
    ArrowUpward as ArrowUpwardIcon,
    DateRange as DateRangeIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    MoreVert as MoreVertIcon,
    Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "../../components/HeroHeader.tsx";
import { getEvidenceDataGridColumns } from "./fannyPack.tsx";
import CreateEvidenceFormDialog from "./createOrEditEvidenceFormDialog.tsx";
import DisplayEvidenceDialog from "./displayEvidenceDialog.tsx";
import {
    setCombinedInitialState,
    setCreateOrEditFormState,
} from "../../slices/evidence.ts";
import { heroIconStyle } from "../../themes/icons.ts";
import { heroTextStyle } from "../../themes/text.ts";
import {
    useDeleteEvidenceEntryByIdMutation,
    useGetEvidenceByBookIdQuery,
    useLazyGetEvidenceByBookIdQuery,
} from "../../services/evidence.ts";
import { useParams } from "react-router-dom";

interface EvidenceRecord {
    id: string;
    name: string;
    subject: string;
    fileName: string;
    date: string;
}

const EvidenceDataGrid = () => {
    const dispatch = useDispatch();
    const params = useParams();
    console.log("params", params);

    // Constants
    const EVIDENCE_BOOK_ID = params.id || "";
    const { data = [] as any, error, isLoading } = useGetEvidenceByBookIdQuery(
        EVIDENCE_BOOK_ID,
    );

    const [deleteEvidenceEntryById] = useDeleteEvidenceEntryByIdMutation();

    const {
        evidenceDialogOpen,
        createOrEditDialogOpen,
    } = useSelector((state: { evidence: any }) => state.evidence);

    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    // Type the handlers for toggle and delete actions
    const handleDisplayEvidenceDialogViewToggle = (open: boolean, row: any) => {
        dispatch(
            setCombinedInitialState({
                evidenceDialogOpen: open,
                currentRow: open ? row : null,
            }),
        );
    };

    const handleDeleteEvidenceRecord = async (row: any) =>
        deleteEvidenceEntryById({
            id: row.id,
            fileName: row.attachment_name,
            evidenceBookId: EVIDENCE_BOOK_ID,
        });

    const handleCreateOrEditFormDialogViewToggle = (
        open: boolean,
        type = "create",
        row: EvidenceRecord | null = null,
    ) => {
        dispatch(setCombinedInitialState({ createOrEditDialogOpen: open }));
        dispatch(
            setCreateOrEditFormState({
                uploadedFile: open ? uploadedFile : null,
                type: open ? type : "",
                currentRow: open ? row : null,
            }),
        );
    };

    const handleEditEvidenceRecord = (row: any) => {
        handleCreateOrEditFormDialogViewToggle(true, "edit", row);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <HeroSection>
                <Stack direction="row" spacing={2} justifyContent="center">
                    <Typography
                        variant="h4"
                        sx={{
                            ...heroTextStyle,
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                        }}
                    >
                        <Avatar
                            sx={{ ...heroIconStyle, mr: 1, color: "#FF6F61" }}
                        >
                            <DateRangeIcon sx={{ fontSize: 16 }} />
                        </Avatar>
                        EVIDENCE RECORDS
                    </Typography>
                </Stack>

                {/* Bottom Row: Other icons */}
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    sx={{ marginTop: 2 }}
                >
                    <Typography variant="h6" sx={heroTextStyle}>
                        <Avatar
                            sx={{
                                ...heroIconStyle,
                                color: "primary.main",
                                mr: 2,
                            }}
                        >
                            <AddIcon sx={{ fontSize: 16 }} />
                        </Avatar>
                        Create
                    </Typography>
                    <Typography variant="h6" sx={heroTextStyle}>
                        <Avatar
                            sx={{
                                ...heroIconStyle,
                                color: "success.main",
                                mr: 2,
                            }}
                        >
                            <EditIcon sx={{ fontSize: 16 }} />
                        </Avatar>
                        Edit
                    </Typography>
                    <Typography variant="h6" sx={heroTextStyle}>
                        <Avatar
                            sx={{
                                ...heroIconStyle,
                                color: "error.main",
                                mr: 2,
                            }}
                        >
                            <DeleteIcon sx={{ fontSize: 16 }} />
                        </Avatar>
                        Delete
                    </Typography>
                    <Typography variant="h6" sx={heroTextStyle}>
                        <Avatar
                            sx={{ ...heroIconStyle, color: "info.main", mr: 2 }}
                        >
                            <VisibilityIcon sx={{ fontSize: 16 }} />
                        </Avatar>
                        View
                    </Typography>
                    <Typography variant="h6" sx={heroTextStyle}>
                        <Avatar
                            sx={{ ...heroIconStyle, color: "#696969", mr: 2 }}
                        >
                            <MoreVertIcon sx={{ fontSize: 16 }} />
                        </Avatar>
                        Filter
                    </Typography>
                    <Typography variant="h6" sx={heroTextStyle}>
                        <Avatar
                            sx={{ ...heroIconStyle, color: "#696969", mr: 2 }}
                        >
                            <ArrowUpwardIcon sx={{ fontSize: 16 }} />
                        </Avatar>
                        Sort
                    </Typography>
                </Stack>
            </HeroSection>

            <Box sx={{ width: "100%", textAlign: "center", mb: 2, mt: 2 }}>
                <Button
                    variant="outlined"
                    onClick={() =>
                        handleCreateOrEditFormDialogViewToggle(true, "create")}
                    sx={{
                        borderColor: "#34D399", // Green border color
                        color: "#34D399", // Green text color
                        borderRadius: "8px",
                        padding: "12px 16px",
                        textTransform: "none",
                        fontSize: "16px",
                        fontWeight: "bold",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        "&:hover": {
                            backgroundColor: "#34D399", // Green background on hover
                            color: "#ffffff", // White text on hover
                            borderColor: "#34D399", // Keep green border on hover
                        },
                        "&.Mui-disabled": {
                            color: "#34D399", // Green text on disabled state
                            borderColor: "#555", // Lighter dark border for disabled state
                            backgroundColor: "#222", // Dark background for disabled state
                            opacity: 0.6, // Reduced opacity on disabled
                        },
                        transition: "all 0.3s ease",
                    }}
                >
                    <AddIcon sx={{ marginRight: 1 }} />
                    Create New Evidence Record
                </Button>
            </Box>

            <Box
                sx={{
                    flexGrow: 1,
                    height: "70vh",
                    width: "90%",
                    margin: "0 auto",
                }}
            >
                <DataGrid
                    rows={data || []}
                    columns={getEvidenceDataGridColumns({
                        handleDisplayEvidenceDialogViewToggle,
                        handleDeleteEvidenceRecord,
                        handleEditEvidenceRecord,
                    })}
                    getRowHeight={() =>
                        "auto"}
                    sx={{ width: "100%" }}
                    loading={isLoading}
                />
            </Box>

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

export default EvidenceDataGrid;
