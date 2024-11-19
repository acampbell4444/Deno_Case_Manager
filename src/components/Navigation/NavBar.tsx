import React, { useState } from "react";
import {
    AppBar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    Toolbar,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import NavButton from "./NavButton.tsx";

const NavBar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const isMobile = useMediaQuery((theme: any) =>
        theme.breakpoints.down("md")
    );

    const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

    return (
        <AppBar
            position="sticky"
            sx={{
                background: "#111111", // Dark background
                boxShadow: 4,
                padding: "0 20px",
                color: "#ffffff", // Light text color
            }}
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
                    sx={{
                        fontWeight: "bold",
                        color: "#34D399", // Green for the title
                    }}
                >
                    Campbell vs. Rivet
                </Typography>

                {isMobile
                    ? (
                        <IconButton
                            onClick={handleDrawerToggle}
                            sx={{ color: "#34D399" }} // Green icon
                        >
                            <MenuIcon />
                        </IconButton>
                    )
                    : (
                        <Box sx={{ display: "flex" }}>
                            <NavButton label="Home" path="/" />

                            <NavButton
                                label="Arguments"
                                path="/arguments"
                            />

                            <NavButton
                                label="Evidence"
                                path="/evidence_books"
                            />
                            
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

                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={handleDrawerToggle}
                    sx={{
                        "& .MuiDrawer-paper": {
                            width: 250,
                            paddingTop: 10,
                            backgroundColor: "#111111", // Dark background for the drawer
                            color: "#ffffff", // Light text color inside drawer
                        },
                    }}
                >
                    <List>
                        <ListItem component="div" onClick={handleDrawerToggle}>
                            <NavButton label="Home" path="/" />
                        </ListItem>

                        <ListItem component="div" onClick={handleDrawerToggle}>
                            <NavButton
                                label="Arguments"
                                path="/arguments"
                            />
                        </ListItem>

                        <ListItem component="div" onClick={handleDrawerToggle}>
                            <NavButton
                                label="Evidence"
                                path="/evidence_books"
                            />
                        </ListItem>

                        <ListItem component="div" onClick={handleDrawerToggle}>
                            <NavButton
                                label="Emails"
                                path="/email_records"
                            />
                        </ListItem>

                        <ListItem component="div" onClick={handleDrawerToggle}>
                            <NavButton
                                label="Texts"
                                path="/text_records"
                            />
                        </ListItem>

                        <ListItem component="div" onClick={handleDrawerToggle}>
                            <NavButton label="Open AI" path="/open_ai" />
                        </ListItem>
                    </List>
                </Drawer>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
