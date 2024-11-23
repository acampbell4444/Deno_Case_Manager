import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setEndDate,
    setLoading,
    setParsedTexts,
    setParsing,
    setStartDate,
} from "../slices/texts.ts";
import {
    Box,
    Button,
    Stack,
    TextField,
    Tab,
    Tabs,
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
import moment from "moment";
import Papa from "papaparse";
import NameTooltipAvatarAndIcon from "../components/NameTooltipAvatarAndIcon.tsx";

const TextRecords = () => {
    const dispatch = useDispatch();
    const { parsedTexts, loading, parsing, startDate, endDate } = useSelector(
        (state: any) => state.text
    );

    const [selectedTab, setSelectedTab] = useState<number>(0); // Track the selected tab

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
                                    Boolean(item["Message Date"] && item["Text"])
                                )
                                .map((item: any, index: number) => ({
                                    id: index,
                                    messageDate: item["Message Date"] || "N/A",
                                    senderName:
                                        item["Type"] === "Outgoing"
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
                    console.error("Error fetching or parsing text file:", error);
                }
            };

            fetchAndParseTexts();
        }
    }, [dispatch, memoizedRowData.length, loading, parsing]);

    const filteredTexts = memoizedRowData.filter((text: any) => {
        const formattedStartDate = startDate ? moment(new Date(startDate)).unix() : null;
        const formattedEndDate = endDate ? moment(new Date(endDate)).unix() : null;
        const textDate = moment(text.messageDate).unix();
        if (startDate && formattedStartDate !== null && formattedStartDate > textDate)
            return false;
        if (endDate && formattedEndDate !== null && formattedEndDate < textDate)
            return false;
        return true;
    });

    // Filter texts by tab selection (e.g., Michelle or Cathy)
    
    const textsByTab = selectedTab === 0 ? filteredTexts.filter((text:any) => text.senderName === 'M Rivet') : filteredTexts.filter((text:any) => text.senderName === 'A Campbell');

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

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            {/* Header Section */}
            <HeroSection>
                <Stack direction="row" spacing={2} justifyContent="center">
                    <NameTooltipAvatarAndIcon
                        Icon={SmsIcon}
                        tooltipTitle="Text Records"
                        label="Text Records"
                        iconSize={34}
                    />
                </Stack>
            </HeroSection>

            {/* Tabs for Michelle's and Cathy's texts - Now outside HeroSection */}
            <Box sx={{ width: "100%", marginTop: 0 }}>
                <Tabs value={selectedTab} onChange={handleTabChange} aria-label="Text Records Tabs">
                    <Tab label="Michelle's Texts" />
                    <Tab label="Cathy's Texts" />
                </Tabs>
            </Box>

            {/* Date Filter and Button */}
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
            </div>

            <Box sx={{ height: "70vh", width: "100%" }}>
                <DataGrid
                    rows={textsByTab}
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
