import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Case Data Overview:
// ${stringifiedConversation}

// Detailed Background:
// Emails indicate ongoing communication about child custody and visitation.
// Text messages suggest communication challenges between parties.
// Evidence includes communication records and financial documents.
// Current argument focuses on joint legal custody with primary physical custody.

// Detailed Analysis Request:
// 1. Provide a concise summary of the case dynamics
// 2. Identify key legal considerations in this custody scenario
// 3. Suggest potential strategic actions for resolution
// 4. Highlight communication and documentary evidence implications

// Response Instructions:

const initialState = {
    caseDataOverview: "",
    detailedBackground:
        `You are the best lawyer in the world. You are a beast. No mercy.
        Alan is going to win. Emails indicate ongoing communication about child custody and visitation.
Michelle has a pattern of aggression and verbal abuse.
These documents suggest that Michelle is not acting in the best interest of the child.
Current argument focuses on 50/50 timeshare for the custody arrangement.`,
    detailedAnalysisRequest: `1. Provide a sharp argument for Alan
2. Identify key legal considerations in this custody scenario (cite California family law case history and statutes)
3. Suggest potential strategic legal actions/motions for alan
4. Highlight how Michelles behavior is not in the best interest of the child`,
    responseInstructions: `- Use clear, professional legal language
- Focus on a slam dunk win for Alan
- Ensure your ENTIRE response is a valid JSON object
- Do NOT include any text outside of the JSON
- Use proper JSON syntax with escaped quotes if needed
_ Let's Go!
`,
};

//create claudSlice

const claudeSlice = createSlice({
    name: "claude",
    initialState,
    reducers: {
        setCaseDataOverview: (state, action: PayloadAction<string>) => {
            state.caseDataOverview = action.payload;
        },
        setDetailedBackground: (state, action: PayloadAction<string>) => {
            state.detailedBackground = action.payload;
        },
        setDetailedAnalysisRequest: (state, action: PayloadAction<string>) => {
            state.detailedAnalysisRequest = action.payload;
        },
        setResponseInstructions: (state, action: PayloadAction<string>) => {
            state.responseInstructions = action.payload;
        },
    },
});

export const {
    setCaseDataOverview,
    setDetailedBackground,
    setDetailedAnalysisRequest,
    setResponseInstructions,
} = claudeSlice.actions;

export default claudeSlice.reducer;

// // Define the type for the email state in the slice
// interface EmailState {
//   parsedEmails: any[]; // Replace `any` with the actual type for your emails if you have one
//   loading: boolean;
//   parsing: boolean;
//   startDate: string | null;
//   endDate: string | null;
// }

// const initialState: EmailState = {
//   parsedEmails: [],
//   loading: false,
//   parsing: false,
//   startDate: null,
//   endDate: null,
// };

// const emailSlice = createSlice({
//   name: 'email',
//   initialState,
//   reducers: {
//     setStartDate: (state, action: PayloadAction<string | null>) => {
//       state.startDate = action.payload;
//     },
//     setEndDate: (state, action: PayloadAction<string | null>) => {
//       state.endDate = action.payload;
//     },
//     resetFilters: (state) => {
//       state.startDate = null;
//       state.endDate = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAndParseEmails.pending, (state) => {
//         state.loading = true;
//         state.parsing = true;
//       })
//       .addCase(fetchAndParseEmails.fulfilled, (state, action: PayloadAction<any[]>) => { // Replace `any[]` with the actual type
//         state.loading = false;
//         state.parsing = false;
//         state.parsedEmails = action.payload;
//       })
//       .addCase(fetchAndParseEmails.rejected, (state) => {
//         state.loading = false;
//         state.parsing = false;
//       });
//   }
// });

// export const {
//   setStartDate,
//   setEndDate,
//   resetFilters,
// } = emailSlice.actions;

// export default emailSlice.reducer;
