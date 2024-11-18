import React, { useState } from "react";
import {
    Avatar,
    Card,
    CardContent,
    Chip,
    Container,
    Dialog,
    DialogContent,
    DialogTitle,
    Fab,
    Grid,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import { useGetEvidenceBooksByUserIdQuery } from '../../services/evidence.ts';
import { useNavigate } from 'react-router-dom';





const EvidenceBook = () => {

    const navigate = useNavigate();
    const { data = [], error, isLoading } = useGetEvidenceBooksByUserIdQuery("123344"); //TODO: Make dynamic



    const [search, setSearch] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
  

    const handleSearchChange = (event: React.ChangeEvent<any>) => {
        setSearch(event.target.value);
    };

    
    return (
        <Container
            maxWidth="md"
            style={{ backgroundColor: "#f4f6f8", padding: "20px" }}
        >
            <Typography
                variant="h4"
                gutterBottom
                align="center"
                color="primary"
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
                style={{ marginBottom: "20px" }}
            />

            <Grid container spacing={3}>
                {data
                    .filter((journal:any) =>
                        journal.title.toLowerCase().includes(
                            search.toLowerCase(),
                        )
                    )
                    .map((journal:any) => (
                        <Grid item xs={12} key={journal.id}>
                            <Card
                                variant="outlined"
                                sx={{
                                    "&:hover": {
                                        boxShadow: 6,
                                        transform: "scale(1.03)",
                                    },
                                    position: "relative",
                                    border: "2px solid #1976d2", // Adding a border color to the card
                                    borderRadius: "10px", // Rounded corners
                                    backgroundColor: "#fff",
                                    transition: "all 0.3s ease-in-out", // Smooth transitions
                                }}
                                onClick={() => navigate(`/evidence_books/${journal.id}`)}
                            >
                                <CardContent>
                                    <Typography
                                        variant="h5"
                                        component="div"
                                        color="primary"
                                    >
                                        {journal.title}
                                    </Typography>

                                    <Typography
                                        color="textSecondary"
                                        style={{ marginBottom: 10 }}
                                    >
                                        Created on:{" "}
                                        {new Date(journal.created_at)
                                            .toLocaleString()}
                                    </Typography>

                                    <div style={{ marginTop: 10 }}>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            Tags:
                                        </Typography>
                                        {journal.tags.map((tag: string, index:number) => (
                                            <Chip
                                                key={index}
                                                label={tag}
                                                style={{
                                                    margin: 5,
                                                    backgroundColor: "#1976d2",
                                                    color: "white",
                                                    fontWeight: "bold",
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
                                            color="textSecondary"
                                        >
                                            Collaborators:
                                        </Typography>
                                        {journal.collaborator_email_list.map((
                                            email: string,
                                            index: number,
                                        ) => (
                                            <Typography
                                                key={index}
                                                style={{ marginLeft: 5 }}
                                            >
                                                {index === journal.collaborator_email_list.length - 1 ? email : email + ", "}
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
                                                // handleDelete(journal.id);
                                            }}
                                        >
                                            <Visibility color="primary" />
                                        </IconButton>
                                        {/* <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(journal.id);
                                            }}
                                        >
                                            <Delete color="error" />
                                        </IconButton>
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                alert("Edit clicked");
                                            }}
                                        >
                                            <Edit color="primary" />
                                        </IconButton> */}
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
            </Grid>

            {/* FAB Button */}
            <Fab
                color="primary"
                aria-label="add"
                style={{ position: "fixed", bottom: 20, right: 20 }}
            >
                <Add />
            </Fab>

            {/* Modal for Journal Details */}
            
        </Container>
    );
};

export default EvidenceBook;