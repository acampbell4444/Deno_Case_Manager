import React from 'react';
import { Box, Container, Typography, Button, Tooltip, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { Notifications as NotificationsIcon, Email as EmailIcon, Event as EventIcon } from '@mui/icons-material';

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: 'url("/FamilyJustice.png")',
  backgroundSize: 'cover',
  minHeight: 'calc(100vh)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', // Center the content vertically
  alignItems: 'center',
  textAlign: 'center',
  position: 'relative',
  paddingTop: theme.spacing(10),
  color: '#fff',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark overlay for readability
  },
  zIndex: 1,
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
  color: '#ffffff',
  maxWidth: 'md',
}));

const FooterStrip = styled(Box)(({ theme }) => ({
  backgroundColor: '#111111', // Dark footer background
  color: '#fff',
  width: '100%',
  position: 'fixed',
  bottom: 0,
  padding: theme.spacing(1),
  zIndex: 2,
  height: 60,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const IconWrapper = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  gap: theme.spacing(3),
}));

const LandingPage = () => {
  return (
    <Box>
      {/* Hero Section with Full Background */}
      <HeroSection>
        <ContentContainer>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 600, color: "#34D399" }}>
            Welcome to Your Family Law Assistant
          </Typography>
          <Typography variant="h6" paragraph sx={{ color: "#B0B0B0" }}>
            Empowering families with intelligent legal support. Get instant access to resources, insights, and more.
          </Typography>
          {/* Uncomment the button if you want to activate it */}
          {/* <Button variant="contained" color="primary" size="large" href="#get-started">
            Get Started
          </Button> */}
        </ContentContainer>
      </HeroSection>

      {/* Footer Alerts/Updates Section */}
      <FooterStrip>
        <IconWrapper container>
          <Tooltip title="Alerts" arrow>
            <NotificationsIcon sx={{ color: '#f44336', fontSize: 30 }} />
          </Tooltip>
          <Tooltip title="Messages" arrow>
            <EmailIcon sx={{ color: '#2196f3', fontSize: 30 }} />
          </Tooltip>
          <Tooltip title="Events" arrow>
            <EventIcon sx={{ color: '#4caf50', fontSize: 30 }} />
          </Tooltip>
        </IconWrapper>
      </FooterStrip>
    </Box>
  );
};

export default LandingPage;
