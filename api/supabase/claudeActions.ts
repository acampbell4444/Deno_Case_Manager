import Anthropic from '@anthropic-ai/sdk';
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
const env_vars = await load({ envPath: "./.env" });

const client = new Anthropic({
  apiKey: env_vars.ANTHROPIC_API_KEY,
});

export const generateLegalAnalysis = async (caseData: any ) => {

    const prompt =
        `Perform a comprehensive legal analysis of this family law case data. 
  
  IMPORTANT: Your entire response MUST be a valid JSON object with these exact keys:
  {
    "summary": "Concise case summary (string)",
    "keyInsights": ["Insight 1", "Insight 2"],
    "recommendedActions": ["Action 1", "Action 2"]
  }
  
  Case Data Overview:
  - Emails: ${caseData.emails?.length || 0} entries
  - Text Messages: ${caseData.textMessages?.length || 0} entries
  - Evidence Entries: ${caseData.evidenceEntries?.length || 0}
  - Existing Arguments: ${caseData.arguments?.length || 0}
  
  Detailed Background:
  Emails indicate ongoing communication about child custody and visitation.
  Text messages suggest communication challenges between parties.
  Evidence includes communication records and financial documents.
  Current argument focuses on joint legal custody with primary physical custody.
  
  Detailed Analysis Request:
  1. Provide a concise summary of the case dynamics
  2. Identify key legal considerations in this custody scenario
  3. Suggest potential strategic actions for resolution
  4. Highlight communication and documentary evidence implications
  
  Response Instructions:
  - Use clear, professional legal language
  - Focus on objective case assessment
  - Ensure your ENTIRE response is a valid JSON object
  - Do NOT include any text outside of the JSON
  - Use proper JSON syntax with escaped quotes if needed`;

    let response;
    try {
        response = await client.messages.create({
            model: "claude-3-opus-20240229",
            max_tokens: 1000,
            messages: [{
                role: "user",
                content: prompt,
            }],
        });

        // Extract the response text content (ensure the response is in the expected format)
        // const analysisText = response?.choices?.[0]?.message?.content || '';
        const analysisText = '';
        console.log(response, 'res');

        // Check if response contains a valid JSON string
        const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            console.error("No JSON found in response:", analysisText);
            throw new Error("Failed to extract JSON from AI response");
        }

        // Parse the extracted JSON
        const analysis = JSON.parse(jsonMatch[0]);

        // // Validate the structure
        // if (
        //     !analysis.summary || !analysis.keyInsights ||
        //     !analysis.recommendedActions
        // ) {
        //     throw new Error("Invalid analysis structure");
        // }

        return analysis;
    } catch (error) {
        console.error("Parsing Error:", error);
        if (error instanceof Error) {
            throw new Error(`Analysis generation failed: ${error.message}`);
        } else {
            throw new Error("Analysis generation failed: Unknown error");
        }
    }
};

export const hardcodedCaseData = {
    emails: [
        {
            sender: "John Doe",
            recipient: "Jane Smith",
            date: "2024-02-15",
            subject: "Child Custody Discussion",
            body: "Proposing alternate weekend visitation schedule",
        },
        {
            sender: "Jane Smith",
            recipient: "John Doe",
            date: "2024-02-16",
            subject: "Re: Child Custody Discussion",
            body: "Discussing concerns about proposed schedule",
        },
    ],
    textMessages: [
        {
            sender: "John Doe",
            date: "2024-02-17",
            content: "Can we discuss the children's school arrangements?",
        },
        {
            sender: "Jane Smith",
            date: "2024-02-17",
            content:
                "I'm concerned about the current co-parenting communication",
        },
    ],
    evidenceEntries: [
        {
            type: "Communication Record",
            date: "2024-02-15",
            description: "Email exchange about child visitation",
            tags: ["co-parenting", "communication"],
        },
        {
            type: "Financial Document",
            date: "2024-01-30",
            description: "Income statement for child support calculation",
            tags: ["financial", "support"],
        },
    ],
    arguments: [
        {
            title: "Proposed Custody Arrangement",
            summary:
                "Seeking joint legal custody with primary physical custody to mother",
            keyPoints: [
                "Equal decision-making rights",
                "Alternate weekend visitation",
                "Shared holiday schedule",
            ],
        },
    ],
};
