// src/components/Header.js
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Header = () => {
  const employees = [
    {
      name: "John Doe",
      address: "123 Main St, City, Country",
      email: "john@example.com",
      age: 30,
    },
    {
      name: "Jane Smith",
      address: "456 Elm St, Town, Country",
      email: "jane@example.com",
      age: 25,
    },
  ];

  return (
    <AppBar
      position="static"
      style={{ flexGrow: 1, marginBottom: "10px", borderRadius: "10px" }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          style={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              textTransform: "uppercase",
            }}
          >
            Admin
          </Link>
        </Typography>
        <Button color="inherit">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Home
          </Link>
        </Button>
        <Button color="inherit">
          <Link
            to="/company-details"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Companies
          </Link>
        </Button>
        <Button color="inherit">
          <Link
            to="/employee-details"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Employees
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
