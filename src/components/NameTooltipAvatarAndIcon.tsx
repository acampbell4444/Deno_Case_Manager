import React from "react";
import { Avatar, Tooltip, Typography } from "@mui/material";
import styled from "@emotion/styled";

interface GreenAvatarIconProps {
    Icon: React.ElementType;
    iconSize?: number;
    tooltipTitle?: string;
    label: string;
    highlightedLabel?: string;
}

export const CoolGreenText = styled.div`
  color: #34D399;
`;

const GreenAvatarIcon = (
    {
        Icon,
        iconSize = 20,
        tooltipTitle = "",
        label = "",
        highlightedLabel = "",
    }: GreenAvatarIconProps,
) => (
    <Typography
        variant="h6"
        sx={{
            display: "flex",
            color: "#ffffff",
            zIndex: 1,
            marginRight: 2,
            alignItems: "center",
            fontSize: iconSize,
        }}
    >
        <Tooltip title={tooltipTitle}>
            <Avatar
                sx={{
                    height: iconSize + 20, // Height of the Avatar with some extra padding
                    width: iconSize + 20, // Width of the Avatar with some extra padding
                    backgroundColor: "#222222", // Dark background for Avatar to match the dark theme
                    color: "#34D399", // Green icon color for consistency with the theme
                    mr: 2, // Margin for spacing between icon and next element
                    "&:hover": {
                        backgroundColor: "#2C9E77", // Darker green background on hover
                        color: "#ffffff", // White icon color on hover for better contrast
                    },
                }}
            >
                <Icon sx={{ fontSize: iconSize }} />
            </Avatar>
        </Tooltip>
        <>
            <Typography
                sx={{
                    fontSize: iconSize,
                }}
            >
                {label}
            </Typography>
            <br />
            <Typography
                sx={{
                    color: "#34D399",
                    ml: 1,
                    fontWeight: "bold",
                    fontSize: iconSize,
                }}
            >
                {highlightedLabel}
            </Typography>
        </>
    </Typography>
);

export default GreenAvatarIcon;
