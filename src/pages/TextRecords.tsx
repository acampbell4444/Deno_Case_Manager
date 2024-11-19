import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setEndDate,
    setLoading,
    setParsedTexts,
    setParsing,
    setStartDate,
} from "../slices/texts.ts";
import {
    Avatar,
    Box,
    Button,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
    ArrowUpward as ArrowUpwardIcon,
    DateRange as DateRangeIcon,
    MoreVert as MoreVertIcon,
    Sms as SmsIcon,
} from "@mui/icons-material";
import HeroSection from "../components/HeroHeader.tsx";
import { plainBlueGradient } from "../themes/colors.ts";
import moment from "moment";
import Papa from "papaparse";
import { heroIconStyle } from "../themes/icons.ts";
import { heroTextStyle } from "../themes/text.ts";

const TextRecords = () => {
    const dispatch = useDispatch();

    const { parsedTexts, loading, parsing, startDate, endDate } = useSelector((
        state: any,
    ) => state.text);

    // Fetch texts function
    const fetchTexts = async (): Promise<string> => {
        const response = await fetch("/AllTexts.csv");
        const text = await response.text();
        return text;
    };

    const memoizedRowData = useMemo(() => parsedTexts, [parsedTexts]);

    useEffect(() => {
        if (!memoizedRowData.length && !loading && !parsing) {
            const fetchAndParseTexts = async () => {
                try {
                    dispatch(setLoading(true));
                    dispatch(setParsing(true));

                    const text = await fetchTexts();

                    Papa.parse(text, {
                        header: true,
                        complete: (results: any) => {
                            const mappedTexts = results.data
                                .filter((item: any) =>
                                    Boolean(
                                        item["Message Date"] && item["Text"],
                                    )
                                )
                                .map((item: any, index: number) => ({
                                    id: index,
                                    messageDate: item["Message Date"] || "N/A",
                                    senderName: item["Type"] === "Outgoing"
                                        ? "A Campbell"
                                        : "M Rivet",
                                    text: item["Text"] || "",
                                }));
                            dispatch(setParsedTexts(mappedTexts));
                            dispatch(setLoading(false));
                            dispatch(setParsing(false));
                        },
                    });
                } catch (error) {
                    console.error(
                        "Error fetching or parsing text file:",
                        error,
                    );
                }
            };

            fetchAndParseTexts();
        }
    }, [dispatch, memoizedRowData.length, loading, parsing]);

    const filteredTexts = memoizedRowData
        .filter((text: any) => {
            const formattedStartDate = startDate
                ? moment(new Date(startDate)).unix()
                : null;
            const formattedEndDate = endDate
                ? moment(new Date(endDate)).unix()
                : null;
            const textDate = moment(text.messageDate).unix();
            if (
                startDate && formattedStartDate !== null &&
                formattedStartDate > textDate
            ) return false;
            if (
                endDate && formattedEndDate !== null &&
                formattedEndDate < textDate
            ) return false;
            return true;
        });

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 100 },
        {
            field: "messageDate",
            headerName: "Message Date",
            width: 200,
            sortable: true,
            renderCell: (params) => {
                return (
                    <Typography variant="body2">
                        {new Date(params.value).toLocaleString()}
                    </Typography>
                );
            },
        },
        {
            field: "senderName",
            headerName: "Sender Name",
            width: 150,
            sortable: true,
        },
        { field: "text", headerName: "Text", width: 900, sortable: true },
    ];

    console.log("loading", loading);
    console.log("parsing", parsing);

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
                            <SmsIcon sx={{ fontSize: 16 }} />
                        </Avatar>
                        TEXT RECORDS
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
                        <Tooltip title="Search by date range below">
                            <Avatar
                                sx={{
                                    ...heroIconStyle,
                                    color: "primary.main",
                                    mr: 2,
                                }}
                            >
                                <DateRangeIcon sx={{ fontSize: 16 }} />
                            </Avatar>
                        </Tooltip>
                        Search
                    </Typography>

                    <Typography variant="h6" sx={heroTextStyle}>
                        <Tooltip title="Sort by column header in the table">
                            <Avatar
                                sx={{
                                    ...heroIconStyle,
                                    color: "#696969",
                                    mr: 2,
                                }}
                            >
                                <MoreVertIcon sx={{ fontSize: 16 }} />
                            </Avatar>
                        </Tooltip>
                        Filter
                    </Typography>
                    <Typography variant="h6" sx={heroTextStyle}>
                        <Tooltip title="Sort by column header in the table">
                            <Avatar
                                sx={{
                                    ...heroIconStyle,
                                    color: "#696969",
                                    mr: 2,
                                }}
                            >
                                <ArrowUpwardIcon sx={{ fontSize: 16 }} />
                            </Avatar>
                        </Tooltip>
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

            <Box sx={{ height: "70vh", width: "100%" }}>
                <DataGrid
                    rows={filteredTexts}
                    columns={columns}
                    getRowHeight={() => "auto"}
                    sx={{ width: "100%" }}
                    loading={loading || parsing}
                />
            </Box>
        </Box>
    );
};

export default TextRecords;
