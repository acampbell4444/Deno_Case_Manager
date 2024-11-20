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
  TextField,
  Typography,
} from "@mui/material";
import {
  Add,
  ChatBubbleOutline,
  Search as SearchIcon,
  Visibility,
} from "@mui/icons-material";
import { useGetArgumentsByUserIdQuery } from "../../services/arguments.ts";
import { useNavigate } from "react-router-dom";
import HeroSection from "../../components/HeroHeader.tsx";
import NameTooltipAvatarAndIcon from "../../components/NameTooltipAvatarAndIcon.tsx";

const ArgumentsList: React.FC = () => {
  const navigate = useNavigate();
  const { data = [], error, isLoading } = useGetArgumentsByUserIdQuery(
    "123344",
  ); // Replace with dynamic user ID
  const [search, setSearch] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<any>) => {
    setSearch(event.target.value);
  };

  const filteredData = data.filter((argument: any) => {
    return argument.title.toLowerCase().includes(search.toLowerCase());
  });

  console.log(data);

  return (
    <>
      <HeroSection>
        <Stack>
          {/* Main header with icon and label */}
          <Stack direction="row" spacing={2} justifyContent="center">
            <NameTooltipAvatarAndIcon
              Icon={ChatBubbleOutline}
              tooltipTitle="Arguments"
              label="Arguments"
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
              tooltipTitle="Each argument is a collection of evidence entries with details, tags, etc."
              label="View Arguments"
            />

            <NameTooltipAvatarAndIcon
              Icon={SearchIcon}
              tooltipTitle="Search"
              label="Search"
            />
          </Stack>
        </Stack>
      </HeroSection>

      <div style={{ minHeight: "100vh" }}>
        {/* Search Bar */}
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
          sx={{
            marginBottom: "20px",
            backgroundColor: "#2A2A2A",
            borderRadius: "4px",
            "& .MuiInputBase-root": {
              color: "#34D399", // Turquoise text color
            },
            "& .MuiInputLabel-root": {
              color: "#34D399", // Turquoise label
              opacity: 0.7,
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#34D399", // Turquoise border color
              },
              "&:hover fieldset": {
                borderColor: "#34D399", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#34D399", // Focused border color
              },
            },
            "& .Mui-focused .MuiInputLabel-root": {
              opacity: 1, // Full visibility when focused
            },
          }}
        />

        <Container
          maxWidth="lg"
          sx={{
            padding: "20px",
            pt: "50px",
            borderRadius: "10px",
            backgroundColor: "white",
          }}
        >
          {/* Arguments Grid */}
          <Grid container spacing={3}>
            {filteredData.length === 0 && (
              <Typography
                variant="h5"
                sx={{
                  color: "#B0B0B0",
                  mt: 5,
                  textAlign: "center",
                  fontWeight: 600,
                }}
              >
                {`No arguments found ${
                  search ? "for the search term: " + `"${search}"` : ""
                }`}
              </Typography>
            )}

            {filteredData.length > 0 && filteredData
              .map((argument: any) => (
                <Grid item xs={12} key={argument.id}>
                  {/* Argument Card */}
                  <Card
                    variant="outlined"
                    sx={{
                      "&:hover": {
                        boxShadow: 10,
                        transform: "scale(1.05)",
                      },
                      border: "2px solid #34D399",
                      borderRadius: "10px",
                      backgroundColor: "#2A2A2A", // Dark background for cards
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    <CardContent>
                      {/* Title */}
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 600,
                          marginBottom: "10px",
                          color: "#34D399", // Green text for the title
                        }}
                      >
                        {argument.title}
                      </Typography>

                      {/* Description */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#B0B0B0",
                          marginBottom: "10px",
                        }}
                      >
                        {argument.description}
                      </Typography>

                      {/* Tags */}
                      <div style={{ marginTop: 10 }}>
                        <Typography
                          variant="body2"
                          sx={{ color: "#B0B0B0" }}
                        >
                          Tags:
                        </Typography>
                        {argument.tags.map(
                          (tag: string, index: number) => (
                            <Chip
                              key={index}
                              label={tag}
                              sx={{
                                margin: "5px 10px 5px 0",
                                backgroundColor: "#34D399",
                                color: "white",
                                fontWeight: "bold",
                                transition: "all 0.3s ease-in-out",
                                "&:hover": {
                                  backgroundColor: "#2C9E77",
                                },
                              }}
                            />
                          ),
                        )}
                      </div>

                      {/* Collaborators */}
                      <div
                        style={{
                          marginTop: 10,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ color: "#B0B0B0" }}
                        >
                          Collaborators:
                        </Typography>
                        {argument.collaborators_list.map(
                          (collaborator: string, index: number) => (
                            <Typography
                              key={index}
                              sx={{
                                marginLeft: 5,
                                color: "#ffffff",
                              }}
                            >
                              {collaborator}
                            </Typography>
                          ),
                        )}
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
                                `/argument/${argument.id}`,
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
            }}
            onClick={() => navigate("/add-argument")} // Navigate to Add Argument page
          >
            <Add sx={{ color: "#fff" }} />
          </Fab>
        </Container>
      </div>
    </>
  );
};

export default ArgumentsList;
