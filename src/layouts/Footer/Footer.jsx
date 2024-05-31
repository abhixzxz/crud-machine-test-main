import { Typography, Container } from "@mui/material";

const Footer = () => {
  return (
    <footer
      style={{
        marginTop: "auto",
        backgroundColor: "#f5f5f5",
        padding: "20px 0",
      }}
    >
      <Container>
        <Typography variant="body1" align="center">
          © 2024 My Website. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
