import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEndDate, setStartDate } from "../slices/emails.ts";
import {
    Box,
    Button,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
    ArrowUpward as ArrowUpwardIcon,
    DateRange as DateRangeIcon,
    Email as EmailIcon,
    MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import moment from "moment";
import HeroSection from "../components/HeroHeader.tsx";
import NameTooltipAvatarAndIcon from "../components/NameTooltipAvatarAndIcon.tsx";
import { fetchAndParseEmails } from "../thunks/emails.ts";
import { filterEmailsByDate } from "../helpers/emails.ts";
import { setCaseDataOverview } from "../slices/claude.ts";

const EmailRecords = () => {
    const dispatch = useDispatch();
    const { parsedEmails, loading, parsing, startDate, endDate } = useSelector((
        state: any,
    ) => state.email);

    useEffect(() => {
        if (!parsedEmails.length && !loading && !parsing) {
            (dispatch as any)(fetchAndParseEmails());
        }
    }, [dispatch, parsedEmails, loading, parsing]);

    const [selectedRows, setSelectedRows] = React.useState<any[]>([]);

    const emailsFilteredByDate = filterEmailsByDate(
        parsedEmails,
        startDate,
        endDate,
    );

    const columns = [
        { field: "id", headerName: "ID", width: 30 },
        { field: "subject", headerName: "Subject", width: 100 },
        { field: "from", headerName: "From", width: 100 },
        { field: "to", headerName: "To", width: 100 },
        {
            field: "date",
            headerName: "Date",
            width: 0,
            renderCell: (params: any) => {
                return (
                    <Typography variant="caption">
                        {moment(params.value).format("MM/DD/YYYY")}
                        <br />
                        {moment(params.value).format("hh:mm A")}
                    </Typography>
                );
            },
        },
        { field: "text", headerName: "Text", width: 800 },
    ];

    // Function to copy selected rows as stringified JSON to clipboard
    const handleCopyJson = () => {
        console.log('selectedRows', selectedRows);  
        // const selectedRows = emailsFilteredByDate.filter((email: any) => email.selected);

        const jsonString = JSON.stringify(selectedRows, null, 2);
        (navigator as any).clipboard.writeText(jsonString).then(() => {
            alert("Selected rows copied to clipboard as JSON!");
        }).catch((err:any) => {
            alert("Failed to copy text: ");
        });
    };

    // Function to copy selected rows as CSV to clipboard
    const handleCopyCsv = () => {
        const selectedRows = emailsFilteredByDate.filter((email: any) => email.selected);
        
        // Generate CSV from selected rows
        const header = ["ID", "Subject", "From", "To", "Date", "Text"];
        const csvRows = selectedRows.map((row: any) => [
            row.id,
            row.subject,
            row.from,
            row.to,
            moment(row.date).format("MM/DD/YYYY hh:mm A"),
            row.text,
        ]);

        // Join header and rows into CSV format
        const csvString = [header.join(","), ...csvRows.map(row => row.join(","))].join("\n");

        (navigator as any).clipboard.writeText(csvString).then(() => {
            alert("Selected rows copied to clipboard as CSV!");
        })

          
    };

    return (
        <>
            <HeroSection>
                <Stack direction="row" spacing={2} justifyContent="center">
                    <NameTooltipAvatarAndIcon
                        Icon={EmailIcon}
                        tooltipTitle="Email Records"
                        label="Email Records"
                        iconSize={34}
                    />
                </Stack>
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    sx={{ marginTop: 2 }}
                >
                    <NameTooltipAvatarAndIcon
                        Icon={DateRangeIcon}
                        tooltipTitle="Filter by date range"
                        label="Date Range"
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

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                    marginTop: "30px",
                }}
            >
                <TextField
                    label="Start Date"
                    type="date"
                    value={moment(startDate).format("YYYY-MM-DD")}
                    onChange={(e: any) =>
                        dispatch(setStartDate(e.target.value))}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mr: "10px" }}
                />

                <TextField
                    label="End Date"
                    type="date"
                    value={moment(endDate).format("YYYY-MM-DD")}
                    onChange={(e: any) => dispatch(setEndDate(e.target.value))}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <Button
                    sx={{
                        alignContent: "center",
                        size: "large",
                        variant: "contained",
                        marginLeft: "10px",
                        backgroundColor: "#333", // Dark background
                        color: "#34D399", // Green text color
                        "&:hover": {
                            backgroundColor: "#2C9E77", // Darker green background on hover
                            color: "#ffffff", // White text on hover
                        },
                        "&.Mui-disabled": {
                            color: "#34D399", // Green text on disabled state
                            backgroundColor: "#555", // Lighter dark background for disabled state
                            opacity: 0.6, // Reduced opacity on disabled
                        },
                    }}
                    disabled={loading || parsing || (!startDate && !endDate)}
                    onClick={() => {
                        dispatch(setStartDate(null));
                        dispatch(setEndDate(null));
                    }}
                >
                    Clear date range
                </Button>

                {/* Add Buttons for Exporting JSON and CSV */}
                <Button
                    sx={{
                        marginLeft: "20px",
                        backgroundColor: "#34D399", // Cool green
                        color: "#ffffff",
                        "&:hover": {
                            backgroundColor: "#2c6e2f",
                        },
                    }}
                    onClick={handleCopyJson}
                >
                    Copy JSON
                </Button>

                <Button
                    sx={{
                        marginLeft: "10px",
                        backgroundColor: "#34D399", // Cool green
                        color: "#ffffff",
                        "&:hover": {
                            backgroundColor: "#2c6e2f",
                        },
                    }}
                    onClick={handleCopyCsv}
                >
                    Copy CSV
                </Button>
            </div>

            <Box sx={{ height: "100vh", width: "100%" }}>
                <DataGrid
                    rows={emailsFilteredByDate}
                    columns={columns}
                    getRowHeight={() => "auto"}
                    loading={loading || parsing}
                    checkboxSelection
                    onRowSelectionModelChange={(newSelection: any) => {
                        // Update rows with selected flag when rows are selected
                        console.log('newSelection', newSelection);
                        console.log('emailsFilteredByDate', emailsFilteredByDate);
                        const updatedRows = emailsFilteredByDate.filter(
                            (email: any) => newSelection.includes(+email.id),
                        )
                        setSelectedRows(updatedRows);
                        // Assuming dispatch to update selection is needed
                        dispatch(setCaseDataOverview(JSON.stringify(updatedRows, null, 2)));
                    }}
                />
            </Box>
        </>
    );
};

export default EmailRecords;
