import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Cinema from "../models/Cinema.ts";
import CinemaService from "../services/CinemaService.ts";
import cinemaBg from "../assets/cinema/cinema_bg.jpg";

export default function AddCinema() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const cinema: Cinema = {
      name: data.get("name") as string,
      address: data.get("address") as string,
      email: data.get("email") as string,
      phoneNumber: parseInt(data.get("phoneNumber") as string),
      auditoriums: parseInt(data.get("auditorium") as string),
    };
    if (validate(cinema)) {
      CinemaService.addCinema(cinema);
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Grid container component="main" sx={{ height: "90vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${cinemaBg})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Cinema
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Cinema Name"
                name="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="auditorium"
                label="Number of auditoriums"
                type="number"
                id="auditorium"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="Phone"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                <div className="text-xl">Submit</div>
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

function validate(cinema: Cinema): boolean {
  if (cinema.name.length === 0 || cinema.name.length > 255) {
    alert("Name must be between 1 and 255 characters");
    return false;
  } else if (cinema.auditoriums < 0) {
    alert("Auditoriums must be a positive number");
    return false;
  } else if (cinema.address.length === 0) {
    alert("Address must be at least 1 character");
    return false;
  } else if (cinema.email.length === 0 || cinema.email.length > 255) {
    alert("Email must be between 1 and 255 characters");
    return false;
  }
  return true;
}
