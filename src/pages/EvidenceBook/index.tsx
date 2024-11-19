import React, { useState } from "react";
import {
    Card,
    CardContent,
    Chip,
    Container,
    Fab,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { Add, Search, Visibility } from "@mui/icons-material";
import { useGetEvidenceBooksByUserIdQuery } from "../../services/evidence.ts";
import { useNavigate } from "react-router-dom";

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
        <div style={{ backgroundColor: "#111111", minHeight: "100vh" }}>
            {/* Full page background */}
            <Container
                maxWidth="lg" // Increase maxWidth to make the cards wider
                sx={{
                    padding: "20px",
                    pt: "50px", // Padding top to ensure content is below the navbar
                    borderRadius: "10px",
                    minHeight: "100vh", // Ensures the container spans full height of the page
                    backgroundColor: "#111111", // Ensuring background color is uniform
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    align="center"
                    sx={{ fontWeight: 600, color: "#34D399" }} // Green for heading
                >
                    Evidence Books
                </Typography>

                <TextField
                    label="Search"
                    variant="outlined"
                    fullWidth
                    value={search}
                    onChange={handleSearchChange}
                    sx={{
                        marginBottom: "20px",
                        backgroundColor: "#ffffff", // White background for input fields
                        color: "#333", // Dark text color for readability
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: "#34D399", // Green border for input
                            },
                            "&:hover fieldset": {
                                borderColor: "#34D399", // Green border on hover
                            },
                        },
                        "& .MuiInputLabel-root": {
                            color: "#333", // Dark color for label
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "#34D399", // Green color for label when focused
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search sx={{ color: "#34D399" }} />{" "}
                                {/* Green search icon */}
                            </InputAdornment>
                        ),
                    }}
                />

                <Grid container spacing={3}>
                    {data
                        .filter((journal: any) =>
                            journal.title.toLowerCase().includes(
                                search.toLowerCase(),
                            )
                        )
                        .map((journal: any) => (
                            <Grid item xs={12} md={4} key={journal.id}>
                                {/* Adjust grid item size */}
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
                                        backgroundColor: "#222222", // Dark background for the card
                                        transition: "all 0.3s ease-in-out", // Smooth transitions
                                        padding: 2,
                                    }}
                                    onClick={() =>
                                        navigate(
                                            `/evidence_books/${journal.id}`,
                                        )}
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
                                                            color: "#ffffff",
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
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                }}
                                            >
                                                <Visibility
                                                    sx={{ color: "#34D399" }}
                                                />{" "}
                                                {/* Green icon */}
                                            </IconButton>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                </Grid>

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
    );
};

export default EvidenceBook;
