import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCaseDataOverview,  setDetailedBackground, setDetailedAnalysisRequest, setResponseInstructions } from "../../slices/claude.ts";
import { useGenerateLegalAnalysisMutation } from "../../services/claude.ts";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import HeroSection from "../../components/HeroHeader.tsx";
import NameTooltipAvatarAndIcon from "../../components/NameTooltipAvatarAndIcon.tsx";
import {
    AutoAwesome as AutoAwesomeIcon,
} from "@mui/icons-material";
import CustomTextField from "./textFields.tsx";


const getPrompt = (caseDataOverview: string, detailedBackground: string, detailedAnalysisRequest: string, responseInstructions: string) => {
    return `Perform a comprehensive legal analysis of this family law case data.
    IMPORTANT: Your entire response MUST be a valid JSON object with these exact keys:
    {"summary": "Concise case summary (string)",
    "keyInsights": ["Insight 1", "Insight 2"],
    "recommendedActions": ["Action 1", "Action 2"]}
    Case Data Overview:
    ${caseDataOverview}
    Detailed Background:
    ${detailedBackground}
    Detailed Analysis Request:
    ${detailedAnalysisRequest}
    Response Instructions:
    ${responseInstructions}`;
}

interface AnalysisResult {
    summary: string;
    keyInsights: string[];
    recommendedActions: string[];
}

const Claude: React.FC = () => {
    const dispatch = useDispatch();
    const [generateAnalysis, { data, isLoading, isError, error }] =
        useGenerateLegalAnalysisMutation();

    const analysisResult = data?.content?.[0]?.text
        ? JSON.parse(data?.content?.[0]?.text)
        : null;

    const { caseDataOverview, detailedBackground, detailedAnalysisRequest, responseInstructions } = useSelector((state: any) => state.claude);

    // Handle field changes with Redux dispatch
    const handleCaseDataOverviewChange = (e: React.ChangeEvent<any>) => {
        dispatch(setCaseDataOverview(e.target.value));
    };

    const handleDetailedBackgroundChange = (e: React.ChangeEvent<any>) => {
        dispatch(setDetailedBackground(e.target.value));
    };

    const handleDetailedAnalysisRequestChange = (e: React.ChangeEvent<any>) => {
        dispatch(setDetailedAnalysisRequest(e.target.value));
    };

    const handleResponseInstructionsChange = (e: React.ChangeEvent<any>) => {
        dispatch(setResponseInstructions(e.target.value));
    };

    const handleGenerateAnalysis = () => {
        generateAnalysis(getPrompt(caseDataOverview, detailedBackground, detailedAnalysisRequest, responseInstructions));
    };

    // List of input fields
    const fields = [
        { label: "Case Data Overview", value: caseDataOverview, onChange: handleCaseDataOverviewChange },
        { label: "Detailed Background", value: detailedBackground, onChange: handleDetailedBackgroundChange },
        { label: "Detailed Analysis Request", value: detailedAnalysisRequest, onChange: handleDetailedAnalysisRequestChange },
        { label: "Response Instructions", value: responseInstructions, onChange: handleResponseInstructionsChange }
    ];

    return (
        <>
            <HeroSection>
                <Stack direction="row" spacing={2} justifyContent="center">
                    <NameTooltipAvatarAndIcon
                        Icon={AutoAwesomeIcon}
                        tooltipTitle="AI Analysis"
                        label="AI Legal Analysis"
                        iconSize={34}
                    />
                </Stack>
            </HeroSection>
            <div
                style={{
                    padding: "100px",
                    paddingTop: '20px',
                    // backgroundColor: "#121212", // Dark background
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
                }}
            >
                <Stack spacing={3}>
                    {/* Map over the fields and render CustomTextField */}
                    {fields.map((field, index) => (
                        <CustomTextField
                            key={index}
                            label={field.label}
                            value={field.value}
                            onChange={field.onChange}
                        />
                    ))}

                    {/* Generate Legal Analysis Button */}
                    <Button
                        variant="contained"
                        color="success" // Cool green button
                        disabled={isLoading}
                        fullWidth
                        onClick={handleGenerateAnalysis}
                        sx={{
                            padding: "12px 16px",
                            backgroundColor: isLoading ? "#4caf50" : "#34D399", // Cool green
                            color: isLoading ? "#9e9e9e" : "#ffffff",
                            "&:hover": {
                                backgroundColor: isLoading
                                    ? "#4caf50"
                                    : "#2c6e2f", // Darker green for hover
                            },
                            transition: "background-color 0.3s ease",
                        }}
                    >
                        {isLoading ? "Analyzing..." : "Generate Legal Analysis"}
                    </Button>

                    {isLoading && (
                        <CircularProgress
                            sx={{
                                color: "#34D399", // Cool green color
                                margin: "20px auto",
                                display: "block", // Center the spinner
                            }}
                        />  
                    )}

                    {isError && (
                        <div style={{ color: "#d32f2f" }}>
                            {error && "status" in error
                                ? `Error: ${error.status}`
                                : error && "message" in error
                                ? error.message
                                : "An unknown error occurred"}
                        </div>
                    )}
                </Stack>

                {analysisResult && (
                    <div
                        style={{
                            marginTop: "16px",
                            padding: "12px",
                            // backgroundColor: "#333333", // Dark background for results
                            //lightgray backgroundcol
                            backgroundColor: "#f5f5f5",
                            borderRadius: "4px",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "1.125rem",
                                fontWeight: 600,
                                marginBottom: "8px",
                                color: "black",
                            }}
                        >
                            AI Legal Analysis
                        </div>
                        <div 
                        // style={{ color: "#e0e0e0" }}
                        >
                            <p>{analysisResult.summary}</p>

                            {analysisResult.keyInsights && (
                                <div>
                                    <h4>Key Insights:</h4>
                                    <ul>
                                        {analysisResult.keyInsights.map((
                                            insight: string,
                                            index: number,
                                        ) => <li key={index}>{insight}</li>)}
                                    </ul>
                                </div>
                            )}

                            {analysisResult.recommendedActions && (
                                <div>
                                    <h4>Recommended Actions:</h4>
                                    <ul>
                                        {analysisResult.recommendedActions.map((
                                            action: string,
                                            index: number,
                                        ) => <li key={index}>{action}</li>)}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Claude;
