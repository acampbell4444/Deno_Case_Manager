import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  Email as EmailIcon,
  Event as EventIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import NameTooltipAvatarAndIcon from "../components/NameTooltipAvatarAndIcon.tsx";

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: 'url("/FamilyJustice.png")',
  backgroundSize: "cover",
  minHeight: "calc(100vh)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center", // Center the content vertically
  alignItems: "center",
  textAlign: "center",
  position: "relative",
  paddingTop: theme.spacing(10),
  color: "#fff",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark overlay for readability
  },
  zIndex: 1,
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  textAlign: "center",
  color: "#ffffff",
  maxWidth: "md",
}));

const FooterStrip = styled(Box)(({ theme }) => ({
  backgroundColor: "#111111", // Dark footer background
  color: "#fff",
  width: "100%",
  position: "fixed",
  bottom: 0,
  padding: theme.spacing(1),
  zIndex: 2,
  height: 60,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const IconWrapper = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  gap: theme.spacing(3),
}));

const LandingPage = () => {
  return (
    <Box>
      {/* Hero Section with Full Background */}
      <HeroSection>
        <ContentContainer>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ fontWeight: 600, color: "#34D399" }}
          >
            Welcome to Your Family Law Assistant
          </Typography>
          <Typography variant="h6" paragraph sx={{ color: "#B0B0B0" }}>
            Empowering families with intelligent legal support. Get instant
            access to resources, insights, and more.
          </Typography>
        </ContentContainer>
      </HeroSection>

      <FooterStrip>
        <IconWrapper container>
          <NameTooltipAvatarAndIcon
            Icon={NotificationsIcon}
            iconSize={30}
            tooltipTitle="Alerts"
            label=""
            highlightedLabel=""
          />

          <NameTooltipAvatarAndIcon
            Icon={EmailIcon}
            iconSize={30}
            tooltipTitle="Messages"
            label=""
            highlightedLabel=""
          />

          <NameTooltipAvatarAndIcon
            Icon={EventIcon}
            iconSize={30}
            tooltipTitle="Events"
            label=""
            highlightedLabel=""
          />
        </IconWrapper>
      </FooterStrip>
    </Box>
  );
};

export default LandingPage;
