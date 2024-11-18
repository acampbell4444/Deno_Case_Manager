export const customDialogActionsStyle = {
    m: 2,
    border: `1px solid #1976d2'`,
    borderRadius: '8px', // Rounded corners
    padding: '8px',
    boxShadow: `0 2px 5px rgba(0, 0, 0, 0.1)`, // Subtle shadow for depth
    transition: 'all 0.3s ease', // Smooth transition for hover effect
    '&:hover': {
        boxShadow: `0 4px 10px rgba(0, 0, 0, 0.2)`, // Darker shadow on hover
        transform: 'scale(1.02)', // Slight scaling effect on hover
    },
}
