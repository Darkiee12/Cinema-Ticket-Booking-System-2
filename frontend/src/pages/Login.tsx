// import React, { useEffect, useState } from "react";
// import { useRef } from "react";
// import UserService from "../services/UserService";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";

const Login = () => {
  // const emailRef = useRef();
  // const passwordRef = useRef();
  // const [errors, setErrors] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  // const loading = false;

  // const [action, setAction] = useState("Sign Up");
  // UserService.addUser(user);

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
        }}
      >
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(data:image/jpeg;base64,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)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
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
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit=""
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
export default Login;
