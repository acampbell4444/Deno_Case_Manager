import React, { useState } from "react";
import {  Box, Button, Dialog, Stack } from "@mui/material";
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
import {
    useDeleteEvidenceEntryByIdMutation,
    useGetEvidenceBooksByUserIdQuery,
    useGetEvidenceByBookIdQuery,
    useLazyGetEvidenceByBookIdQuery,
} from "../../services/evidence.ts";
import { useParams } from "react-router-dom";
import GreenAvatarIcon from "../../components/NameTooltipAvatarAndIcon.tsx";

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

    // Constants
    const EVIDENCE_BOOK_ID = params.id || "";
    const { data = [] as any, error, isLoading } = useGetEvidenceByBookIdQuery(
        EVIDENCE_BOOK_ID,
    );

    const { data: evidenceBookData = [] as any } =
        useGetEvidenceBooksByUserIdQuery("22");
    const currentEvidenceBook = evidenceBookData.find((book: any) =>
        book.id === EVIDENCE_BOOK_ID
    );

    const evidenceBookTitle = currentEvidenceBook?.title || "";

    const [deleteEvidenceEntryById] = useDeleteEvidenceEntryByIdMutation();

    const {
        evidenceDialogOpen,
        createOrEditDialogOpen,
    } = useSelector((state: { evidence: any }) => state.evidence);

    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

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
                    <GreenAvatarIcon
                        Icon={DateRangeIcon}
                        tooltipTitle="Filter by date range"
                        label="Evidence Records for "
                        highlightedLabel={evidenceBookTitle}
                        iconSize={34}
                    />
                </Stack>

                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    sx={{ marginTop: 2 }}
                >
                    <GreenAvatarIcon
                        Icon={AddIcon}
                        tooltipTitle="Create a new evidence record"
                        label="Create"
                    />

                    <GreenAvatarIcon
                        Icon={EditIcon}
                        tooltipTitle="Edit an existing evidence record"
                        label="Edit"
                    />

                    <GreenAvatarIcon
                        Icon={DeleteIcon}
                        tooltipTitle="Delete an existing evidence record"
                        label="Delete"
                    />

                    <GreenAvatarIcon
                        Icon={VisibilityIcon}
                        tooltipTitle="View an existing evidence record"
                        label="View"
                    />

                    <GreenAvatarIcon
                        Icon={MoreVertIcon}
                        tooltipTitle="Filter by column header in the table"
                        label="Filter"
                    />

                    <GreenAvatarIcon
                        Icon={ArrowUpwardIcon}
                        tooltipTitle="Sort by column header in the table"
                        label="Sort"
                    />
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
