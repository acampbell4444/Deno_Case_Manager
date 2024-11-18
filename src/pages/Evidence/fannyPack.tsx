import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Delete as DeleteIcon, Visibility as VisibilityIcon, Edit as EditIcon } from '@mui/icons-material';
import moment from 'moment';

// Define the structure of a row (EvidenceEntry) based on the data
export interface EvidenceEntry {
    id: string;
    date_of_event: string;
    title: string;
    description: string;
    tags: string[];
    attachment_name: string;
}

// Define the types for the event handlers
interface EventHandlers {
    handleDisplayEvidenceDialogViewToggle: (open: boolean, row: EvidenceEntry | null) => void;
    handleDeleteEvidenceRecord: (row: EvidenceEntry) => void;
    handleEditEvidenceRecord: (row: EvidenceEntry) => void;
}

// Define the columns return type
type DataGridColumn = {
    field: string;
    headerName: string;
    width: number;
    renderCell?: (params: any) => React.ReactNode; // Custom render function for cells
};

// Define the function that returns the columns
export const getEvidenceDataGridColumns = ({
    handleDisplayEvidenceDialogViewToggle,
    handleDeleteEvidenceRecord,
    handleEditEvidenceRecord
}: EventHandlers): DataGridColumn[] => [
    {
        field: 'date_of_event',
        headerName: 'Date of Event',
        width: 180,
        renderCell: (params: { value: string }) => moment(params.value).format('MM/DD/YYYY'),
    },
    {
        field: 'title',
        headerName: 'Article Title',
        width: 200
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 300,
        renderCell: (params: { value: string }) => <Typography variant="caption">{params.value}</Typography>,
    },
    {
        field: 'tags',
        headerName: 'Tags',
        width: 250,
        renderCell: (params: { value: string[] }) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {params.value.map((tag, index) => (
                    <Typography
                        key={index}
                        variant="caption"
                        sx={{
                            margin: '0.2rem', 
                            fontSize: '0.75rem', 
                            color: '#1976d2', 
                            cursor: 'pointer', 
                            '&:hover': { textDecoration: 'underline' },
                        }}
                        onClick={() => alert(`Clicked on tag: ${tag}`)}
                    >
                        {tag}
                    </Typography>
                ))}
            </Box>
        ),
    },
    {
        field: 'attachment_name',
        headerName: 'Attachment Name',
        width: 200
    },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 220,
        renderCell: (params: { row: EvidenceEntry }) => (
            <Box display="flex" justifyContent="space-between" gap={.5} sx={{ p: .3 }}>
                <Button
                    size="small"
                    variant="outlined"
                    color="info"
                    onClick={() => handleDisplayEvidenceDialogViewToggle(true, params.row)}
                >
                    <VisibilityIcon />
                    {/* View attachments */}
                </Button>

                <Button
                    variant="outlined"
                    color="success"
                    size="small"
                    onClick={() => handleEditEvidenceRecord(params.row)}
                >
                    <EditIcon />
                </Button>

                <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteEvidenceRecord(params.row)}
                >
                    <DeleteIcon />
                </Button>
            </Box>
        )
    },
];
