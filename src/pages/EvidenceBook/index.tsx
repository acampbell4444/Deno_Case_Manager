import React, { useState } from "react";
import {
    Card,
    CardContent,
    Chip,
    Container,
    Fab,
    Grid,
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import {
    Add,
    ArrowBack as ArrowBackIcon,
    LibraryBooks as LibraryBooksIcon,
    Visibility,
} from "@mui/icons-material";
import { useGetEvidenceBooksByUserIdQuery } from "../../services/evidence.ts";
import { useNavigate } from "react-router-dom";
import HeroSection from "../../components/HeroHeader.tsx";
import NameTooltipAvatarAndIcon from "../../components/NameTooltipAvatarAndIcon.tsx";

const EvidenceBook = () => {
    const navigate = useNavigate();
    const { data = [], error, isLoading } = useGetEvidenceBooksByUserIdQuery(
        "123344",
    ); //TODO: Make dynamic
    const [search, setSearch] = useState<string>("");

    const handleSearchChange = (event: React.ChangeEvent<any>) => {
        setSearch(event.target.value);
    };

    return (
        <>
            <HeroSection>
                <Stack>
        
                    {/* Main header with icon and label */}
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <NameTooltipAvatarAndIcon
                            Icon={LibraryBooksIcon}
                            tooltipTitle="Each book is a collection of individual pieces of evidence"
                            label="Evidence Books"
                            iconSize={34}
                        />
                    </Stack>

                    {/* Additional controls */}
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <NameTooltipAvatarAndIcon
                            Icon={Visibility}
                            tooltipTitle="View"
                            label="View"
                            // iconSize={34}
                        />
                    </Stack>
                </Stack>
            </HeroSection>{" "}
            <div style={{ backgroundColor: "", minHeight: "100vh" }}>
                {/* Lighten background a bit, keeping the dark theme */}

                <Container
                    maxWidth="lg" // Increase maxWidth to make the cards wider
                    sx={{
                        padding: "20px",
                        pt: "50px", // Padding top to ensure content is below the navbar
                        borderRadius: "10px",
                        minHeight: "100vh", // Ensures the container spans full height of the page
                        backgroundColor: "white", // White background
                    }}
                >
                    {/* Evidence cards grid */}
                    <Grid container spacing={3}>
                        {data
                            .filter((journal: any) =>
                                journal.title.toLowerCase().includes(
                                    search.toLowerCase(),
                                )
                            )
                            .map((journal: any) => (
                                <Grid item xs={12} key={journal.id}>
                                    {/* This ensures that each card is always full-width */}
                                    <Card
                                        variant="outlined"
                                        sx={{
                                            "&:hover": {
                                                boxShadow: 10, // Increase the box shadow for more pop
                                                transform: "scale(1.05)",
                                            },
                                            position: "relative",
                                            border: "2px solid #34D399", // Green border
                                            borderRadius: "10px", // Rounded corners
                                            backgroundColor: "#2A2A2A", // Darker gray background for the card
                                            transition: "all 0.3s ease-in-out", // Smooth transitions
                                            padding: 2,
                                        }}
                                    >
                                        <CardContent>
                                            <Typography
                                                variant="h5"
                                                component="div"
                                                sx={{
                                                    fontWeight: 600,
                                                    marginBottom: "10px",
                                                    color: "#34D399", // Green text for title
                                                }}
                                            >
                                                {journal.title}
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    color: "#B0B0B0",
                                                    marginBottom: "10px",
                                                }} // Lighter gray text for secondary information
                                            >
                                                Created on:{" "}
                                                {new Date(journal.created_at)
                                                    .toLocaleString()}
                                            </Typography>

                                            <div style={{ marginTop: 10 }}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: "#B0B0B0" }} // Lighter gray for tags label
                                                >
                                                    Tags:
                                                </Typography>
                                                {journal.tags.map((
                                                    tag: string,
                                                    index: number,
                                                ) => (
                                                    <Chip
                                                        key={index}
                                                        label={tag}
                                                        sx={{
                                                            margin:
                                                                "5px 10px 5px 0",
                                                            backgroundColor:
                                                                "#34D399", // Green background for tags
                                                            color: "white",
                                                            fontWeight: "bold",
                                                            transition:
                                                                "all 0.3s ease-in-out",
                                                            "&:hover": {
                                                                backgroundColor:
                                                                    "#2C9E77", // Darker green on hover
                                                            },
                                                        }}
                                                    />
                                                ))}
                                            </div>

                                            <div
                                                style={{
                                                    marginTop: 10,
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: "#B0B0B0" }} // Lighter gray for collaborators label
                                                >
                                                    Collaborators:
                                                </Typography>
                                                {journal.collaborator_email_list
                                                    .map((
                                                        email: string,
                                                        index: number,
                                                    ) => (
                                                        <Typography
                                                            key={index}
                                                            sx={{
                                                                marginLeft: 5,
                                                                color:
                                                                    "#ffffff",
                                                            }} // White text for emails
                                                        >
                                                            {index ===
                                                                    journal
                                                                            .collaborator_email_list
                                                                            .length -
                                                                        1
                                                                ? email
                                                                : email + ", "}
                                                        </Typography>
                                                    ))}
                                            </div>

                                            {/* Action Buttons */}
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    top: 10,
                                                    right: 10,
                                                }}
                                            >
                                                <IconButton
                                                    onClick={() =>
                                                        navigate(
                                                            `/evidence_books/${journal.id}`,
                                                        )}
                                                >
                                                    <Visibility
                                                        sx={{
                                                            color: "#34D399",
                                                        }}
                                                    />{" "}
                                                    {/* Green icon */}
                                                </IconButton>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                    </Grid>

                    {/* Floating action button */}
                    <Fab
                        color="primary"
                        aria-label="add"
                        sx={{
                            position: "fixed",
                            bottom: 20,
                            right: 20,
                            backgroundColor: "#34D399",
                        }} // Green button
                    >
                        <Add sx={{ color: "#fff" }} />
                    </Fab>
                </Container>
            </div>
        </>
    );
};

export default EvidenceBook;
