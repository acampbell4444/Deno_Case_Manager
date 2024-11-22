import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEndDate, setStartDate } from "../slices/emails.ts";
import { Box, Button, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Email as EmailIcon, DateRange as DateRangeIcon, MoreVert as MoreVertIcon } from "@mui/icons-material";
import moment from "moment";
import HeroSection from "../components/HeroHeader.tsx";
import NameTooltipAvatarAndIcon from "../components/NameTooltipAvatarAndIcon.tsx";
import { fetchAndParseEmails } from "../thunks/emails.ts";
import { filterEmailsByDate } from "../helpers/emails.ts";
import { setCaseDataOverview } from "../slices/claude.ts";

// Define the email type
interface Email {
    id: string;
    subject: string;
    from: string;
    to: string;
    date: string;
    text: string;
}

const EmailRecords = () => {
    const dispatch = (useDispatch as any)();
    const { cathyParsedEmails, michelleParsedEmails, loading, parsing, startDate, endDate } = useSelector((state: any) => state.email);
    const [hasFetchedEmails, setHasFetchedEmails] = useState<boolean>(false);
    const emailsState = useSelector((state: any) => state.email);

    const [selectedTab, setSelectedTab] = useState<number>(0);  // State to track selected tab
    const [selectedRows, setSelectedRows] = useState<Email[]>([]);



    // Filter emails based on date
    const emailsFilteredByDate: Email[] = filterEmailsByDate(
        selectedTab === 0 ? michelleParsedEmails || [] : cathyParsedEmails || [],
        startDate,
        endDate
    );

    const memoizedEmails = useMemo(() => emailsFilteredByDate, [emailsFilteredByDate]);

    const columns: GridColDef[] = [
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

    // Handle Tab Change
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    // Function to copy selected rows as stringified JSON to clipboard
    const handleCopyJson = () => {
        const jsonString = JSON.stringify(selectedRows, null, 2);
        (navigator as any).clipboard.writeText(jsonString).then(() => {
            alert("Selected rows copied to clipboard as JSON!");
        }).catch((err: any) => {
            alert("Failed to copy text.");
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
        });
    };

    useEffect(() => {
        // if (!michelleEmails.length && !cathyEmails.length && !hasFetchedEmails) {
        if (!memoizedEmails.length && !hasFetchedEmails) {
            dispatch(fetchAndParseEmails());
            setHasFetchedEmails(true);
        }
    }, [hasFetchedEmails, dispatch]);


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
            </HeroSection>

            {/* Tabs for toggling between Michelle's and Cathy's emails */}
            <Box sx={{ width: "100%" }}>
                <Tabs value={selectedTab} onChange={handleTabChange} aria-label="Email Records Tabs">
                    <Tab label="Emails from Michelle" />
                    <Tab label="Emails from Cathy" />
                </Tabs>
            </Box>

            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px", marginTop: "30px" }}>
                <TextField
                    label="Start Date"
                    type="date"
                    value={moment(startDate).format("YYYY-MM-DD")}
                    onChange={(e: any) => dispatch(setStartDate(e.target.value))}
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
                        backgroundColor: "#333",
                        color: "#34D399",
                        "&:hover": {
                            backgroundColor: "#2C9E77",
                            color: "#ffffff",
                        },
                        "&.Mui-disabled": {
                            color: "#34D399",
                            backgroundColor: "#555",
                            opacity: 0.6,
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

                <Button
                    sx={{
                        marginLeft: "20px",
                        backgroundColor: "#34D399",
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
                        backgroundColor: "#34D399",
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
                    rows={memoizedEmails}
                    columns={columns}
                    getRowHeight={() => "auto"}
                    loading={loading || parsing}
                    checkboxSelection
                    onRowSelectionModelChange={(newSelection: any) => {
                        const updatedRows = emailsFilteredByDate.filter(
                            (email: any) => newSelection.includes(+email.id),
                        );
                        setSelectedRows(updatedRows);
                        dispatch(setCaseDataOverview(JSON.stringify(updatedRows, null, 2)));
                    }}
                />
            </Box>
        </>
    );
};

export default EmailRecords;