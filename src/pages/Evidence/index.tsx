import React, { useState } from "react";
import { Box, Button, Dialog, Stack, Fab } from "@mui/material";
import { Transition } from "../../components/Transition.tsx";
import { DataGrid } from "@mui/x-data-grid";
import {
    Add as AddIcon,
    ArrowBack as ArrowBackIcon,
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
import { useNavigate, useParams } from "react-router-dom";
import NameTooltipAvatarAndIcon from "../../components/NameTooltipAvatarAndIcon.tsx";

const EvidenceDataGrid = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

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
        row: any = null,
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

    console.log("data", data);

    // const evidence_book_id = EVIDENCE_BOOK_ID;

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <HeroSection>
                <Stack direction="row" spacing={2} justifyContent="center">
                    <NameTooltipAvatarAndIcon
                        Icon={DateRangeIcon}
                        tooltipTitle="Filter by date range"
                        label="Evidence Records for "
                        highlightedLabel={evidenceBookTitle}
                        iconSize={34}
                    />
                </Stack>

                <div
                    style={{ position: "absolute", top: 20, left: 20 }}
                    onClick={() => navigate("/evidence_books")}
                >
                    <NameTooltipAvatarAndIcon
                        Icon={ArrowBackIcon}
                        tooltipTitle="Go back to all evidence books"
                        label="Back"
                    />
                </div>

                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    sx={{ marginTop: 2 }}
                >
                    <NameTooltipAvatarAndIcon
                        Icon={AddIcon}
                        tooltipTitle="Create a new evidence record"
                        label="Create"
                    />

                    <NameTooltipAvatarAndIcon
                        Icon={EditIcon}
                        tooltipTitle="Edit an existing evidence record"
                        label="Edit"
                    />

                    <NameTooltipAvatarAndIcon
                        Icon={DeleteIcon}
                        tooltipTitle="Delete an existing evidence record"
                        label="Delete"
                    />

                    <NameTooltipAvatarAndIcon
                        Icon={VisibilityIcon}
                        tooltipTitle="View an existing evidence record"
                        label="View"
                    />

                    <NameTooltipAvatarAndIcon
                        Icon={MoreVertIcon}
                        tooltipTitle="Filter by column header in the table"
                        label="Filter"
                    />

                    <NameTooltipAvatarAndIcon
                        Icon={ArrowUpwardIcon}
                        tooltipTitle="Sort by column header in the table"
                        label="Sort"
                    />
                </Stack>
            </HeroSection>

            <Box sx={{ width: "100%", textAlign: "center", mb: 2, mt: 2 }}>
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

            <Fab
                color="primary"
                aria-label="add evidence"
                sx={{
                    position: "fixed",
                    bottom: 20,
                    right: 20,
                    backgroundColor: "#34D399",
                }}
                onClick={() => handleCreateOrEditFormDialogViewToggle(true, "create")}
            >
                <AddIcon />
            </Fab>
        </Box>
    );
};

export default EvidenceDataGrid;
