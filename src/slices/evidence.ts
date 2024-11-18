import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for the evidence record (assuming the structure of your evidence data)
interface EvidenceRecord {
    id: string;
    name: string;
    date: string;
    // Add other fields as per your evidence data
}

// Define the type for the form state
interface CreateOrEditFormState {
    uploadedFile: File | null;
    type: string;
    currentRow: EvidenceRecord | null;
}

// Define the combined state
interface EvidenceState {
    currentRow: EvidenceRecord | null;
    evidenceDialogOpen: boolean;
    createOrEditDialogOpen: boolean;
    error: string | null;
    createOrEditFormState: CreateOrEditFormState;
}

// Initial state for the create or edit form
const initialCreateOrEditFormState: CreateOrEditFormState = {
    uploadedFile: null,
    type: '',
    currentRow: null,
};

// Combined initial state for the slice
const combinedInitialState: EvidenceState = {
    currentRow: null,
    evidenceDialogOpen: false,
    createOrEditDialogOpen: false,
    error: null,
    createOrEditFormState: initialCreateOrEditFormState,
};

// Define the evidence slice
const evidenceSlice = createSlice({
    name: 'evidence',
    initialState: combinedInitialState,
    reducers: {

        // Action to set the form state (create/edit)
        setCreateOrEditFormState: (
            state,
            action: PayloadAction<Partial<CreateOrEditFormState>>
        ) => {
            state.createOrEditFormState = {
                ...state.createOrEditFormState,
                ...action.payload,
            };
        },

        // Action to set combined initial state
        setCombinedInitialState: (state, action: PayloadAction<Partial<EvidenceState>>) => {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
    // extraReducers: (builder) => {

    // },
});

// Export the actions
export const {
    setCreateOrEditFormState,
    setCombinedInitialState,
} = evidenceSlice.actions;

// Export the reducer
export default evidenceSlice.reducer;
