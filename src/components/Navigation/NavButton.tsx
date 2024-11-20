import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface NavButtonProps {
    label: string;
    path: string;
    isActive: boolean; // New prop to determine if the button is active
}

const NavButton: React.FC<NavButtonProps> = ({ label, path, isActive }) => {
    const navigate = useNavigate();

    return (
        <div style={{ width: '100%' }}>
            <Button
                color="inherit"
                onClick={() => navigate(path)}
                sx={{
                    width: '100%',
                    textAlign: 'center',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    textTransform: 'none',
                    fontWeight: 600,
                    color: isActive ? '#ffffff' : '#34D399', // Active green for text
                    backgroundColor: isActive ? '#2C9E77' : 'transparent', // Darker green for active
                    '&:hover': {
                        backgroundColor: isActive ? '#2C9E77' : '#4BC7D2', // Turquoise for hover if not active
                        transform: 'scale(1.05)',
                        color: '#ffffff', // White text on hover
                    },
                    padding: '10px 20px', // Padding for better spacing
                }}
            >
                {label}
            </Button>
        </div>
    );
};

export default NavButton;
