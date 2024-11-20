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
            </div>

            <Box sx={{ height: "100vh", width: "100%" }}>
                <DataGrid
                    rows={emailsFilteredByDate}
                    columns={columns}
                    getRowHeight={() => "auto"}
                    loading={loading || parsing}
                />
            </Box>
        </>
    );
};

export default EmailRecords;
