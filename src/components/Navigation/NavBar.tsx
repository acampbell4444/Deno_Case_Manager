import React, { useState } from "react";
import {
    AppBar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import NavButton from "./NavButton.tsx"; // Assuming NavButton is properly defined

const NavBar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Detect if the screen size is small (mobile)
    const isMobile = useMediaQuery((theme: any) =>
        theme.breakpoints.down("md")
    );

    // Handle opening and closing the Drawer
    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <AppBar
            position="sticky"
            sx={{ background: "#fafafa", boxShadow: 4, padding: "0 20px" }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box
                    component="img"
                    src="/CroppedLogo.png"
                    alt="App Logo"
                    sx={{ height: 70, width: "auto", marginRight: 2 }}
                />

                <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#333" }}
                >
                    Campbell vs. Rivet
                </Typography>

                {isMobile
                    ? (
                        // Hamburger menu for small screens
                        <IconButton
                            onClick={handleDrawerToggle}
                            sx={{ color: "#333" }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )
                    : (
                        // Navigation links for larger screens
                        <Box sx={{ display: "flex" }}>
                            <NavButton label="Home" path="/" />
                            <NavButton label="Evidence" path="/evidence_books" />
                            <NavButton
                                label="Emails"
                                path="/email_records"
                            />
                            <NavButton
                                label="Texts"
                                path="/text_records"
                            />
                            <NavButton label="AI" path="/open_ai" />
                        </Box>
                    )}

                {/* Drawer for mobile */}
                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={handleDrawerToggle}
                    sx={{
                        "& .MuiDrawer-paper": {
                            width: 250,
                            paddingTop: 10,
                            backgroundColor: "#fafafa",
                        },
                    }}
                >
                    <List>
                        <ListItem component='div' onClick={handleDrawerToggle}>
                            <NavButton label="Home" path="/"  />
                        </ListItem>
                        <ListItem component='div' onClick={handleDrawerToggle}>
                            <NavButton label="Evidence" path="/evidence_books" />
                        </ListItem>
                        <ListItem component='div' onClick={handleDrawerToggle}>
                            <NavButton
                                label="Emails"
                                path="/email_records"
                            />
                        </ListItem>
                        <ListItem component='div' onClick={handleDrawerToggle}>
                            <NavButton
                                label="Texts"
                                path="/text_records"
                            />
                        </ListItem>
                        <ListItem component='div' onClick={handleDrawerToggle}>
                            <NavButton label="Open AI" path="/open_ai" />
                        </ListItem>
                    </List>
                </Drawer>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
