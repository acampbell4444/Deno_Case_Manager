import Anthropic from '@anthropic-ai/sdk';
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
const env_vars = await load({ envPath: "./.env" });

const client = new Anthropic({
  apiKey: env_vars.ANTHROPIC_API_KEY,
});

export const generateLegalAnalysis = async (prompt: string ) => {



    try {
        const response:any = await client.messages.create({
            model: "claude-3-opus-20240229",
            max_tokens: 1000,
            messages: [{
                role: "user",
                content: prompt,
            }],
        });
        console.log('response:', response, 'typof:', typeof response);
        return response
    } catch (error) {
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
