import React from 'react';
import { Box, Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setCombinedInitialState } from '../../slices/evidence.ts';
import { customDialogActionsStyle } from '../../themes/dialogs.ts';

// Define the structure of the EvidenceRow
interface EvidenceRow {
    attachment_name: string;
    attachment_type: string;
    attachment_url: string;
    id: string;
    name: string;
    date: string;
    // Add other properties as needed
}

interface RootState {
    evidence: {
        currentRow: EvidenceRow | null;
        // Add other state properties as needed
    };
}

const DisplayEvidenceDialog: React.FC = () => {
    const dispatch = useDispatch();
    // Define `currentRow` and type it correctly
    const { currentRow } = useSelector((state: RootState) => state.evidence);

    // Type the event handler
    const handleDisplayEvidenceDialogViewToggle = (open: boolean, row: EvidenceRow | null) => {
        dispatch(setCombinedInitialState({ evidenceDialogOpen: open, currentRow: row }));
    };

    // Ensure proper typing for `isPdf` and `fileUrl`
    const isPdf = currentRow?.attachment_type.includes('pdf');
    const fileUrl = currentRow?.attachment_url;

    return (
        <>
            <DialogTitle>{currentRow?.attachment_name}</DialogTitle>

            <DialogContent sx={{ padding: 0 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    {!isPdf ? (
                        <img
                            src={fileUrl || ''}
                            alt="Uploaded File"
                            style={{ width: '80%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '8px' }}
                        />
                    ) : (
                        <iframe
                            src={fileUrl || ''}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            title="Uploaded PDF"
                        ></iframe>
                    )}
                </Box>
            </DialogContent>

            <DialogActions sx={customDialogActionsStyle}>
                <Button
                    onClick={() => handleDisplayEvidenceDialogViewToggle(false, null)}
                    color="primary"
                    startIcon={<CloseIcon />}
                >
                    Close
                </Button>
            </DialogActions>
        </>
    );
};

export default DisplayEvidenceDialog;
