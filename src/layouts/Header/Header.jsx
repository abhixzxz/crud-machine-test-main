import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Header = () => {
  const { authUser, logout } = useAuth();

  return (
    <AppBar
      position="static"
      sx={{ flexGrow: 1, marginBottom: 2, borderRadius: 1 }}
    >
      <Toolbar style={{}}>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
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
        <div
          className=""
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <div
            className=""
            style={{
              display: "flex",
              gap: "10px",
              paddingRight: "30px",
            }}
          >
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
          </div>
          <div
            className=""
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            {authUser ? (
              <>
                <Typography
                  variant="body1"
                  sx={{
                    marginRight: 1,
                    color: "white",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  user: {authUser.firstName}
                </Typography>
                <Button variant="contained" color="error" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button color="inherit">
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Login
                </Link>
              </Button>
            )}
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
