import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { plainBlueGradient } from '../themes/colors.ts';

const HeroSection = styled(Box)(({ theme }) => ({
  marginTop: '10px', // Ensures placement below navbar
  background: plainBlueGradient,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: '#fff',
  textAlign: 'center',
  position: 'relative',
  paddingBottom: '30px', // Increase padding for better spacing
  paddingTop: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column', // Stack elements vertically
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Slightly darker overlay for better contrast
  },
  zIndex: 1,
}));

export default HeroSection;
