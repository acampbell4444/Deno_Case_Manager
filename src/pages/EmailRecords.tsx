import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEndDate, setStartDate } from "../slices/emails.ts";
import { Avatar, Box, Button, Stack, Typography, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
    ArrowUpward as ArrowUpwardIcon,
    DateRange as DateRangeIcon,
    Email as EmailIcon,
    MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import moment from "moment";
import HeroSection from "../components/HeroHeader.tsx";
import { plainBlueGradient } from "../themes/colors.ts";
import { fetchAndParseEmails } from "../thunks/emails.ts";
import { filterEmailsByDate } from "../helpers/emails.ts";
import { heroIconStyle } from "../themes/icons.ts";
import { heroTextStyle } from "../themes/text.ts";

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
                            <EmailIcon sx={{ fontSize: 20 }} />
                        </Avatar>
                        Email Records
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
                            <DateRangeIcon sx={{ fontSize: 16 }} />
                        </Avatar>
                        Search
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
                    InputLabelProps={{
                        shrink: true,
                    }}
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
                        backgroundImage: plainBlueGradient,
                        color: "white",
                        "&:hover": { backgroundImage: plainBlueGradient },
                        "&.Mui-disabled": {
                            color: "white",
                            backgroundImage: plainBlueGradient,
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
