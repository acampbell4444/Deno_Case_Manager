import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface NavButtonProps {
    label: string;
    path: string;
}

const NavButton: React.FC<NavButtonProps> = ({ label, path }) => {
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
                color: '#1976d2',
                '&:hover': {
                    backgroundColor: '#e0e0e0',
                    transform: 'scale(1.05)',
                    color: '#1565c0',
                },
            }}
        >
            {label}
        </Button>
        </div>
    );
};

export default NavButton;