import React from "react";
import { Box, Container, Link, Stack, Typography } from "@mui/material";
import { Email, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#2E2E2E",
        color: "#fff",
        py: 4,
        mt: 4,
        textAlign: "center",
      }}
    >
      <Container>
        <Typography variant="h5" sx={{ fontFamily: "Pacifico, cursive" }}>
          Yes, I built this in a few hours.
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Need a sleek, modern website? I’m your developer. 🚀 Let’s bring your
          ideas to life.
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ mt: 3 }}
        >
          <Link
            href="https://www.linkedin.com/in/alan-james-campbell/"
            color="inherit"
            target="_blank"
            aria-label="LinkedIn"
            sx={{
              bgcolor: "#FF7043",
              p: 1,
              borderRadius: "50%",
              transition: "background-color 0.3s",
              "&:hover": {
                bgcolor: "#444",
              },
            }}
          >
            <LinkedIn fontSize="large" sx={{ color: "#fff" }} />
          </Link>
          <Link
            href="mailto:alancampbell4444@gmail.com"
            color="inherit"
            aria-label="Email"
            sx={{
              bgcolor: "#FF7043",
              p: 1,
              borderRadius: "50%",
              transition: "background-color 0.3s",
              "&:hover": {
                bgcolor: "#444",
              },
            }}
          >
            <Email fontSize="large" sx={{ color: "#fff" }} />
          </Link>
        </Stack>

        <Typography variant="body2" sx={{ mt: 3, opacity: 0.7 }}>
          Let’s build something amazing together. 🌟
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
