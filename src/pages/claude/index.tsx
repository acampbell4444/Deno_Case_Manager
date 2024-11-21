import React from "react";
import { useGenerateLegalAnalysisMutation } from "../../services/claude.ts";

interface CaseData {
    emails?: any[];
    textMessages?: any[];
    evidenceEntries?: any[];
    // Add other relevant fields
}

const Claude: React.FC<{ caseData: CaseData }> = ({ caseData }) => {
    const [generateAnalysis, {
        data: analysisResult,
        isLoading,
        isError,
        error,
    }] = useGenerateLegalAnalysisMutation();

    const styles = {
        container: {
            padding: "16px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        },
        button: {
            width: "100%",
            padding: "12px 16px",
            backgroundColor: isLoading ? "#e0e0e0" : "#1976d2",
            color: isLoading ? "#9e9e9e" : "#ffffff",
            border: "none",
            borderRadius: "4px",
            cursor: isLoading ? "not-allowed" : "pointer",
            transition: "background-color 0.3s ease",
        },
        loadingSpinner: {
            display: "flex",
            justifyContent: "center",
            margin: "16px 0",
            color: "#1976d2",
        },
        errorText: {
            color: "#d32f2f",
            marginTop: "8px",
            fontSize: "0.875rem",
        },
        resultContainer: {
            marginTop: "16px",
            padding: "12px",
            backgroundColor: "#f5f5f5",
            borderRadius: "4px",
            border: "1px solid #e0e0e0",
        },
        resultTitle: {
            fontSize: "1.125rem",
            fontWeight: 600,
            marginBottom: "8px",
            color: "#333",
        },
        resultText: {
            color: "#666",
        },
    };

    const handleGenerateAnalysis = () => {
        generateAnalysis(caseData);
    };

    return (
        <div style={styles.container}>
            <button
                onClick={handleGenerateAnalysis}
                disabled={isLoading}
                style={styles.button}
            >
                {isLoading ? "Analyzing..." : "Generate Legal Analysis"}
            </button>

            {isLoading && (
                <div style={styles.loadingSpinner}>
                    Loading...
                </div>
            )}

            {isError && (
                <div style={styles.errorText}>
                    {/* Type-safe error handling */}
                    {error && "message" in error
                        ? (error as { message: string }).message
                        : "An error occurred"}
                </div>
            )}

            {analysisResult && (
                <div style={styles.resultContainer}>
                    <div style={styles.resultTitle}>AI Legal Analysis</div>
                    <div style={styles.resultText}>
                        {analysisResult.summary}

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
    );
};

export default Claude;
