import React, { useState } from "react";
import { useFormik } from "formik";
import {
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Paper,
  Avatar,
  Snackbar,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import validationSchema from "./validationSchems";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      // console.log(values);
      try {
        const response = await axios.post("/api/auth/register", values);
        console.log("Response data:", response);
        if (response.status === 201) {
          setSnackbarSeverity("success");
          setSnackbarMessage("Login successful");
          setSnackbarOpen(true);
          navigate("/login");
        }
        actions.resetForm();
      } catch (error) {
        console.error("Error occurred:", error);
        if (error.response) {
          setSnackbarSeverity("error");
          setSnackbarMessage(error.response.data.message);
          setSnackbarOpen(true);
          // console.log("Response data:", error.response.data);
          // console.log("Status code:", error.response.status);
        }
      }
    },
  });

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
      component="main"
      maxWidth="xs"
      style={{}}
    >
      <form onSubmit={formik.handleSubmit}>
        <Paper
          elevation={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 6,
            width: "100%",
            flexDirection: "column",
            borderRadius: "10px",
            "@media (max-width:600px)": {
              padding: 2,
              marginTop: 4,
            },
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "green" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            style={{
              textTransform: "uppercase",
            }}
          >
            Register
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="given-name"
            autoFocus
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                style={{
                  fontFamily: "monospace",
                }}
                to="/login"
                variant="body2"
              >
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RegisterPage;
