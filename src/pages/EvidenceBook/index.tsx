import React, { useState } from "react";
import {
    Card,
    CardContent,
    Chip,
    Container,
    Fab,
    Grid,
    IconButton,
    TextField,
    Typography,
    InputAdornment,
} from "@mui/material";
import { Add, Visibility, Search } from "@mui/icons-material";
import { useGetEvidenceBooksByUserIdQuery } from '../../services/evidence.ts';
import { useNavigate } from 'react-router-dom';

const EvidenceBook = () => {
    const navigate = useNavigate();
    const { data = [], error, isLoading } = useGetEvidenceBooksByUserIdQuery("123344"); //TODO: Make dynamic
    const [search, setSearch] = useState<string>("");

    const handleSearchChange = (event: React.ChangeEvent<any>) => {
        setSearch(event.target.value);
    };

    return (
        <div style={{ backgroundColor: "#111111", minHeight: "100vh" }}> {/* Full page background */}
            <Container
                maxWidth="md"
                sx={{
                    backgroundColor: "#000000", // Dark container background
                    padding: "20px",
                    borderRadius: "10px",
                    minHeight: "100vh", // Ensures the container spans full height of the page
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

                {/* Search Bar */}
                <TextField
                    label="Search"
                    variant="outlined"
                    fullWidth
                    value={search}
                    onChange={handleSearchChange}
                    sx={{
                        marginBottom: "20px",
                        backgroundColor: "#333", // Dark background for input fields
                        color: "#ffffff", // White text
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: "#34D399", // Green border for input
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: "#ffffff", // White label
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search sx={{ color: "#34D399" }} /> {/* Green search icon */}
                            </InputAdornment>
                        ),
                    }}
                />

                <Grid container spacing={3}>
                    {data
                        .filter((journal: any) =>
                            journal.title.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((journal: any) => (
                            <Grid item xs={12} key={journal.id}>
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
                                    onClick={() => navigate(`/evidence_books/${journal.id}`)}
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
                                            sx={{ color: "#B0B0B0", marginBottom: "10px" }} // Lighter gray text for secondary information
                                        >
                                            Created on: {new Date(journal.created_at).toLocaleString()}
                                        </Typography>

                                        <div style={{ marginTop: 10 }}>
                                            <Typography
                                                variant="body2"
                                                sx={{ color: "#B0B0B0" }} // Lighter gray for tags label
                                            >
                                                Tags:
                                            </Typography>
                                            {journal.tags.map((tag: string, index: number) => (
                                                <Chip
                                                    key={index}
                                                    label={tag}
                                                    sx={{
                                                        margin: "5px 10px 5px 0",
                                                        backgroundColor: "#34D399", // Green background for tags
                                                        color: "white",
                                                        fontWeight: "bold",
                                                        transition: "all 0.3s ease-in-out",
                                                        '&:hover': {
                                                            backgroundColor: "#2C9E77", // Darker green on hover
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
                                            {journal.collaborator_email_list.map((email: string, index: number) => (
                                                <Typography
                                                    key={index}
                                                    sx={{ marginLeft: 5, color: "#ffffff" }} // White text for emails
                                                >
                                                    {index === journal.collaborator_email_list.length - 1
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
                                                <Visibility sx={{ color: "#34D399" }} /> {/* Green icon */}
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
                    sx={{ position: "fixed", bottom: 20, right: 20, backgroundColor: "#34D399" }} // Green button
                >
                    <Add sx={{ color: "#fff" }} />
                </Fab>
            </Container>
        </div>
    );
};

export default EvidenceBook;
